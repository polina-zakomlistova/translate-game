import axios from 'axios';

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
        console.log('!!!!');
        if (response?.data?.data?.sentenceAll) {
            return response.data.data.sentenceAll;
        }
    } catch (error) {
        console.log('Error fetching sentences:', error);
    }
};
