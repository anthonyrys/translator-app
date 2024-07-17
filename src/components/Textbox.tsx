import { useState } from 'react';

import { TextboxStyled } from '../styles/TextboxStyles';

interface TextboxProps {
    onUpdate: {(newValue: string): void} | null;
}

export default function Textbox(props: TextboxProps): React.ReactElement {
    const [input, setInput] = useState<string>();

    function onChange(event: any): void {
        setInput(event.target.value);

        if (props.onUpdate != null) {
            props.onUpdate(event.target.value);
        }
    }

    return (
        <TextboxStyled 
            disabled = { props.onUpdate != null ? false : true }
            value = { input }

            inputProps={{ maxLength: 100 }}
            onChange={ onChange }

            fullWidth
            multiline={ true }
            rows={ 10 }
        />
    );
}
