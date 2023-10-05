import axios from 'axios';
import { ISentence } from 'types/translateGame';

export const getSentensesForTranslate = async () => {
    const url = `https://academtest.ilink.dev/graphql`;

    const headers = {
        'Content-Type': 'application/json',
    };

    const query = `
    query {
        sentenceAll {
            en
            ru
        }
    }`;

    try {
        const response = await axios.post(url, { query }, { headers });

        if (response?.data?.data?.sentenceAll) {
            const sentenses = response?.data?.data?.sentenceAll;
            return sentenses.map((sentens: ISentence) => ({
                ...sentens,
                isCorrect: false,
            }));
        }
    } catch (error) {
        console.log('Error fetching sentences:', error);
    }
};
