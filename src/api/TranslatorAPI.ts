import axios from 'axios';
import iso6391 from 'iso-639-1';

interface TranslateTextParameters {
    input: string;
    source: string;
    target: string;
}

interface TranslateTextResponse {
    data: {[translations: string]: {[translatedText: string]: string}[]};
}

interface GetLanguagesResponse {
    data: {[languages: string]: {[language: string]: string}[]};
}

export async function translateText(p: TranslateTextParameters): Promise<string> {
    let translation: string = '';

    await axios.post(
        `${process.env.REACT_APP_TRANSLATE_URL}?key=${process.env.REACT_APP_API_KEY}`,
        {
            q: p.input,
            source: p.source,
            target: p.target
        }
    )

    .then(function ({ data }: { data: TranslateTextResponse }) {
        translation = data.data.translations[0].translatedText;
    })

    .catch(function (error: any) {
        console.error(error);
    });
    
    return translation;
}

async function getLanguages(): Promise<{[language: string]: string}> {
    let languages: {[language: string]: string} = {};

    await axios.post(
        `${process.env.REACT_APP_LANGUAGES_URL}?key=${process.env.REACT_APP_API_KEY}`
    )

    .then(function ({ data }: { data: GetLanguagesResponse }) {
        data.data.languages.forEach(function (l: {[language: string]: string}) {
            const name: string | null = iso6391.getName(l.language) || null;
            if (name != null) languages[name] = l.language;
        });
    })

    .catch(function (error: any) {
        console.error(error);
    });

    return languages;
}

export const Languages: Promise<{[language: string]: string}> = getLanguages();
