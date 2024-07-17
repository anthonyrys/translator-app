import { useState, useEffect } from 'react';

import { GetLanguages } from './api/TranslatorAPI';

import Dropdown from './components/Dropdown';
import Textbox from './components/Textbox';

import { AppStyled, ContainerStyled } from './styles/AppStyles';

export default function App(): React.ReactElement {
    const [languages, setLanguages] = useState<{[language: string]: string}>({});

    const [source, setSource] = useState<string | null>('English');
    const [target, setTarget] = useState<string | null>('Spanish');

    const [input, setInput] = useState<string>('The quick brown fox jumps over the lazy dog');
    const [translation, setTranslation] = useState<string>('');

    function translate(): void {
        console.log(`Translate "${input}" in ${source} to ${target}`);
    }

    function load(): () => void {
        GetLanguages()

        .then(function (result: {[language: string]: string}) {
            setLanguages(result)
        });

        const timeout: NodeJS.Timeout = setTimeout(translate, 500);
        return () => clearTimeout(timeout);
    }

    function updateSource(newSource: string | null): void {
        setSource(newSource);
        translate();
    }

    function updateTarget(newTarget: string | null): void {
        setTarget(newTarget);
        translate();
    }

    function updateText(newInput: string): void {
        setInput(newInput);
    }

    useEffect(load, [input]);

    return (
        <AppStyled>
            <ContainerStyled>
                <Dropdown label='Source' text={ source } languages={ languages }  onUpdate={ updateSource } />
                <Textbox text={ input } onUpdate={ updateText } />
            </ContainerStyled>

            <ContainerStyled>
                <Dropdown label='Target' text={ target } languages={ languages }  onUpdate={ updateTarget } />
                <Textbox text={ translation } onUpdate={ null } />
            </ContainerStyled>
        </AppStyled>
    );
}
