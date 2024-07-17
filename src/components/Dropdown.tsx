import { TextField, AutocompleteRenderInputParams } from '@mui/material';

import { DropdownStyled } from '../styles/DropdownStyles';

interface DropdownProps {
    label: string;
    text: string | null;

    languages: {[language: string]: string};
    onUpdate: {(newValue: string | null): void};
}

export default function Dropdown(props: DropdownProps): React.ReactElement {
    const names: string[] = Object.keys(props.languages);
    
    function onChange(_event: React.SyntheticEvent, value: string | null): void {
        if (value != null) {
            props.onUpdate(value); 
        } else {
            props.onUpdate(null); 
        }
    }

    function renderInput(params: AutocompleteRenderInputParams): React.ReactNode {
        return <TextField {...params} label={ props.label } />
    }

    return (
        <DropdownStyled
            value={ props.text }
            onChange={ onChange }
            options={ names }
            renderInput={ renderInput } 

            size='small'
        />
    );
}
