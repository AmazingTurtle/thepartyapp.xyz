import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Layout from '../../components/layout';
import {TitleText} from '../../components/titleText';
import {GigaloRule} from '../../components/gigaloRule';
import Button from '../../components/button';
import {GigaloPlayer} from '../../components/gigaloPlayer';

const gigaloJson = require('./gigalo.json');
const GIGALO_FILTER_PACK_NAME = [
    'default',
    'silly',
    'hot'
];

const gigaloRules = gigaloJson.Gigalo.filter(gigalo => GIGALO_FILTER_PACK_NAME.indexOf(gigalo.pack_name) !== -1);

export default function GigaloPage() {
    const [availablePlayers, setAvailablePlayers] = useState([]);
    const filteredGigaloRules = useMemo(() => {
        console.log('new available players!', availablePlayers);
        return gigaloRules.filter(gigalo => availablePlayers.length >= gigalo.nb_players);
    }, [availablePlayers, availablePlayers.length]);

    const updateLocalPlayersInStorage = useCallback(players => {
        window.localStorage.setItem('gigalo_players', JSON.stringify(players));
    }, []);

    useEffect(() => {
        const localStoragePlayers = window.localStorage.getItem('gigalo_players');
        if (localStoragePlayers !== null) {
            setAvailablePlayers(JSON.parse(localStoragePlayers));
        }
    }, [setAvailablePlayers]);

    const [addingPlayerName, setAddingPlayerName] = useState('');

    const onChangeAddingPlayerName = useCallback(e => {
        setAddingPlayerName(e.target.value);
    }, [setAddingPlayerName]);

    const onRemovePlayerCallback = useCallback((index) => {
        setAvailablePlayers(oldPlayers => {
            const newPlayers = [...oldPlayers];
            newPlayers.splice(index, 1);
            updateLocalPlayersInStorage(newPlayers);
            return newPlayers;
        });
    }, [setAvailablePlayers]);

    const onAddPlayerCallback = useCallback(() => {
        setAvailablePlayers(oldAvailablePlayers => {
            const newPlayers = [...oldAvailablePlayers];
            newPlayers.push(addingPlayerName);
            updateLocalPlayersInStorage(newPlayers);
            return newPlayers;
        })
        setAddingPlayerName('');
    }, [setAddingPlayerName, addingPlayerName]);

    // const availablePlayers = shuffle(Array.from(Array(5).keys()).map(i => `Spieler ${i}`));

    const [isConfiguring, setConfiguring] = useState(false);

    const [rulesToPick, setRulesToPick] = useState([]);
    const [rule, setRule] = useState(undefined);

    const toggleConfigureCallback = useCallback(() => {
        setConfiguring(oldConfiguring => !oldConfiguring)
    }, [setConfiguring]);

    const newQuestionCallback = useCallback(() => {
        const pickIndex = Math.floor(Math.random() * rulesToPick.length);
        const picked = rulesToPick[pickIndex];

        // de-duplicate
        setRulesToPick(oldRulesToPick => {
            oldRulesToPick.splice(oldRulesToPick.indexOf(pickIndex), 1);
            if (oldRulesToPick.length === 0) {
                console.log('congratulations, you just played through all available gigalo questions, lol');
                return [...filteredGigaloRules];
            }
            return oldRulesToPick;
        });

        setRule(picked);
    }, [rulesToPick, setRulesToPick, setRule]);

    useEffect(() => {
        if (!isConfiguring) {
            console.info(`got ${filteredGigaloRules.length} usable rules (${gigaloJson.Gigalo.length} total)`);
            setRulesToPick([...filteredGigaloRules]);
            newQuestionCallback();
        }
    }, [isConfiguring, setRulesToPick, filteredGigaloRules]);

    const gameName = `gigalo-${rule?.pack_name || 'default'}`

    return (
        <Layout game={gameName}>
            <div className="gigalo">
                <TitleText>
                    {isConfiguring ? 'Gigalo einstellen' : 'Gigalo'}
                </TitleText>
                {isConfiguring ? (
                    <>
                        <div className='gigalo__add-player'>
                            <input
                                type="text"
                                placeholder="Spieler hinzufügen..."
                                value={addingPlayerName}
                                onChange={onChangeAddingPlayerName}
                            />
                            <Button onClick={onAddPlayerCallback}>&#10003;</Button>
                        </div>
                        <div className='gigalo__players'>
                            {availablePlayers.map((player, index) => (
                                <GigaloPlayer
                                    key={`${index}-${player}`}
                                    index={index}
                                    name={player}
                                    onRemove={onRemovePlayerCallback}
                                />
                            ))}
                        </div>
                    </>
                ) : (
                    <div className='gigalo__rule'>
                        {rule && (
                            <GigaloRule rule={rule} availablePlayers={availablePlayers}/>
                        )}
                    </div>
                )}
                <div className="gigalo__bottom">
                    {!isConfiguring && (
                        <Button onClick={newQuestionCallback}>Nochmal</Button>
                    )}
                    <Button onClick={toggleConfigureCallback}>{isConfiguring ? 'Zurück zum Spiel' : 'Einstellen'}</Button>
                </div>
            </div>
        </Layout>
    );
}
