import { useState, useEffect } from 'react';

import { GetLanguages } from './api/TranslatorAPI';

import Dropdown from './components/Dropdown';
import Textbox from './components/Textbox';

import { AppStyled, ContainerStyled } from './styles/AppStyles';

export default function App(): React.ReactElement {
    const [languages, setLanguages] = useState<{[language: string]: string}>({});

    const [source, setSource] = useState<string | null>('en');
    const [target, setTarget] = useState<string | null>('es');

    const [input, setInput] = useState<string>();
    const [translation, setTranslation] = useState<string>();

    function translate(): void {}

    function load(): () => void {
        GetLanguages()

        .then(function (result: {[language: string]: string}) {
            setLanguages(result)
        });

        const timeout: NodeJS.Timeout = setTimeout(() => console.log(input), 500);
        return () => clearTimeout(timeout);
    }

    function updateSource(newSource: string | null): void {
        setSource(newSource);
    }

    function updateTarget(newTarget: string | null): void {
        setTarget(newTarget);
    }

    function updateText(newInput: string): void {
        setInput(newInput);
    }

    useEffect(load, [input]);

    return (
        <AppStyled>
            <ContainerStyled>
                <Dropdown label='Source' default='English' languages={ languages }  onUpdate={ updateSource } />
                <Textbox onUpdate={ updateText } />
            </ContainerStyled>

            <ContainerStyled>
                <Dropdown label='Target' default='Spanish' languages={ languages }  onUpdate={ updateTarget } />
                <Textbox onUpdate={ null } />
            </ContainerStyled>
        </AppStyled>
    );
}
