import axios from 'axios';
import iso6391 from 'iso-639-1';

interface GetLanguagesResponse {
    data: {[languages: string]: {[language: string]: string}[]};
}

export async function TranslateText() {}

export async function GetLanguages(): Promise<{[language: string]: string}> {
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
