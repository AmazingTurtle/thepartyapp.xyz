import {useCallback} from 'react';
import Button from './button';

export function GigaloPlayer({index, name, onRemove}) {
    const onRemoveCallback = useCallback(() => {
        onRemove(index, name);
    }, [index, name, onRemove]);
    return (
        <div className='gigalo__player'>
            <div className='gigalo__player__name'>{name}</div>
            <Button onClick={onRemoveCallback}>&#10005;</Button>
        </div>
    )
}
