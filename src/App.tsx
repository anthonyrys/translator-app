import { useState, useEffect } from 'react';

import { translateText, Languages } from './api/TranslatorAPI';

import Dropdown from './components/Dropdown';
import Textbox from './components/Textbox';

import { AppStyled, ContainerStyled } from './styles/AppStyles';

export default function App(): React.ReactElement {
    var languagesLocal: {[language: string]: string} = {};
    const [languagesGlobal, setLanguagesGlobal] = useState< {[language: string]: string}>({}); 

    const [source, setSource] = useState<string | null>('English');
    const [target, setTarget] = useState<string | null>('Spanish');

    const [input, setInput] = useState<string>('The quick brown fox jumps over the lazy dog.');
    const [translation, setTranslation] = useState<string>('');

    function translate(): void {
        if (source === null || target === null || input === '') {
            setTranslation('');
            return;
        }

        translateText({ input: input, source: languagesLocal[source], target: languagesLocal[target] })

        .then(function (result: string) {
            setTranslation(result);
        });
    }

    function effect(): () => void {
        Languages.then(function (result: {[language: string]: string}) {
            languagesLocal = result;
            setLanguagesGlobal(result);
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
                <Dropdown label='Source' text={ source } languages={ languagesGlobal }  onUpdate={ updateSource } />
                <Textbox text={ input } onUpdate={ updateText } />
            </ContainerStyled>

            <ContainerStyled>
                <Dropdown label='Target' text={ target } languages={ languagesGlobal }  onUpdate={ updateTarget } />
                <Textbox text={ translation } onUpdate={ null } />
            </ContainerStyled>
        </AppStyled>
    );
}
