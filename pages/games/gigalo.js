import React, {useCallback, useEffect, useMemo, useState} from 'react';
import Layout from '../../components/layout';
import {TitleText} from '../../components/titleText';
import {GigaloRule} from '../../components/gigaloRule';
import Button from '../../components/button';
import {GigaloPlayer} from '../../components/gigaloPlayer';
import {shuffle} from '../../utils/shuffle';

const gigaloJson = require('./gigalo.json');
const GIGALO_FILTER_PACK_NAME = [
    'default',
    'silly',
    'hot'
];

const gigaloRules = gigaloJson.Gigalo.filter(gigalo => GIGALO_FILTER_PACK_NAME.indexOf(gigalo.pack_name) !== -1);

export default function GigaloPage() {
    const [availablePlayers, setAvailablePlayers] = useState([]);
    const [currentPlayers, setCurrentPlayers] = useState([]);
    const [keyStack, setKeyStack] = useState([]);
    const filteredGigaloRules = useMemo(() => {
        return gigaloRules.filter(gigalo => availablePlayers.length >= gigalo.nb_players);
    }, [availablePlayers, availablePlayers.length]);

    const updateLocalPlayersInStorage = useCallback(players => {
        window.localStorage.setItem('gigalo_players', JSON.stringify(players));
    }, []);

    useEffect(() => {
        const localStoragePlayers = window.localStorage.getItem('gigalo_players');
        if (localStoragePlayers !== null) {
            setAvailablePlayers(JSON.parse(localStoragePlayers));
        } else {
            setAvailablePlayers([]);
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
        const doUnstack = keyStack.length > 0 && Math.random() < keyStack.length / 5;

        const actuallyPickable = doUnstack
            ? [rulesToPick.find(rule => rule.parent_key === keyStack[0].key)]
            : rulesToPick.filter(rule => {
                if (keyStack.find(stackEntry => stackEntry.key === rule.key)) return false; // don't repeat stack questions
                if (keyStack.parent_key.length > 0) return false; // only do that on unstack
                return true;
            });
        if (actuallyPickable.length === 0) return;

        const pickIndex = Math.floor(Math.random() * actuallyPickable.length);
        const picked = actuallyPickable[pickIndex];

        const newCurrentPlayers = shuffle(availablePlayers);

        if (picked.key.length > 0) {
            setKeyStack(oldKeyStack => {
                return [{
                    key: picked.key,
                    players: newCurrentPlayers
                }, ...oldKeyStack];
            })
        }

        if (doUnstack) {
            setCurrentPlayers(keyStack[0].players);
            setKeyStack(oldKeyStack => {
                oldKeyStack.shift();
                return [...oldKeyStack];
            })
        } else {
            setCurrentPlayers(newCurrentPlayers);

            // de-duplicate
            setRulesToPick(oldRulesToPick => {
                const foundIndex = oldRulesToPick.findIndex(_ => _ === picked);
                oldRulesToPick.splice(foundIndex, 1);
                if (oldRulesToPick.length === 0) {
                    console.log('congratulations, you just played through all available gigalo questions, lol');
                    return [...filteredGigaloRules];
                }
                return oldRulesToPick;
            });
        }

        setRule(picked);
    }, [rulesToPick, setRulesToPick, setRule, keyStack]);

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
                            <GigaloRule rule={rule} currentPlayers={currentPlayers}/>
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
