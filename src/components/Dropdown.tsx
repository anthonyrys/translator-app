import { useState } from 'react';
import { TextField, AutocompleteRenderInputParams } from '@mui/material';

import { DropdownStyled } from '../styles/DropdownStyles';

interface DropdownProps {
    label: string;
    default: string;

    languages: {[language: string]: string};
    onUpdate: {(newValue: string | null): void};
}

export default function Dropdown(props: DropdownProps): React.ReactElement {
    const [name, setName] = useState<string | null>(props.default);
    const names: string[] = Object.keys(props.languages);
    
    function onChange(_event: React.SyntheticEvent, value: string | null): void {
        setName(value);

        if (value != null) {
            props.onUpdate(props.languages[value]); 
        } else {
            props.onUpdate(null); 
        }
    }

    function renderInput(params: AutocompleteRenderInputParams): React.ReactNode {
        return <TextField {...params} label={ props.label } />
    }

    return (
        <DropdownStyled
            value={ name }
            onChange={ onChange }
            options={ names }
            renderInput={ renderInput } 

            size='small'
        />
    );
}
