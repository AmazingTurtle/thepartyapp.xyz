import React from 'react';
export function GigaloRule({rule, availablePlayers}) {

    const availablePlayersCopy = [...availablePlayers];
    const maxNumberOfShots = Math.max(1, Math.min(Math.floor(availablePlayers.length / 0.7), 8));

    const formatted = rule.text.split(/\s/g).map((part, partIndex) => {
        const playerNameIndex = part.indexOf('%s');
        const numberIndex = part.indexOf('$');
        if (playerNameIndex !== -1) {
            const player = availablePlayersCopy.pop();
            const prev = part.substr(0, playerNameIndex);
            const suffix = part.substr(playerNameIndex + 2);
            return (
                <React.Fragment key={`player-${player}`}>
                    {prev}
                    <span className='gigalo__tag'>
                        {player}
                    </span>
                    {suffix}{' '}
                </React.Fragment>
            );
        } else if (numberIndex !== -1) {
            const randomNumber = Math.floor(Math.random() * maxNumberOfShots) + 1;
            const prev = part.substr(0, numberIndex);
            const suffix = part.substr(numberIndex + 1);
            return (
                <React.Fragment key={`numberPart-${partIndex}`}>
                    {prev}
                    <span className='gigalo__tag'>{String(randomNumber)}</span>
                    {suffix}{' '}
                </React.Fragment>
            );
        }
        return part + ' ';
    });

    return (
        <div>{formatted}</div>
    )
}
