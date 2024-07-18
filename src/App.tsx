import { useState, useEffect } from 'react';

import { translateText, Languages } from './api/TranslatorAPI';

import Dropdown from './components/Dropdown';
import Textbox from './components/Textbox';

import { AppStyled, ContainerStyled } from './styles/AppStyles';

export default function App(): React.ReactElement {
    const [languages, setLanguages] = useState<{[language: string]: string}>({}); 

    const [source, setSource] = useState<string | null>('English');
    const [target, setTarget] = useState<string | null>('Spanish');

    const [input, setInput] = useState<string>('');
    const [translation, setTranslation] = useState<string>('');

    function translate(): void {
        if (source === null || target === null || input === '') {
            setTranslation('');
            return;
        }

        translateText({ input: input, source: languages[source], target: languages[target] })

        .then(function (result: string) {
            setTranslation(result);
        });
    }

    function effect(): () => void {
        Languages.then(function (result: {[language: string]: string}) {
            setLanguages(result);
        });

        const timeout: NodeJS.Timeout = setTimeout(translate, 500);
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

    useEffect(effect, [input, source, target]);

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
