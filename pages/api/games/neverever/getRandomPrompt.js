import never from '../../../games/never.json';

export default function handler(req, res) {
    if (req.method === 'GET') {


        const allowedFilters = [undefined, '0', '1'];
        if (allowedFilters.indexOf(req.query.filter) === -1) {
            res.status(405).json({ error: 'You may specify only undefined (all), 0 (kids) or 1 (18+) as filter' });
            return;
        }
        const questionFilter = /^\d+$/.exec(req.query.filter) ? parseInt(req.query.filter, 10) : undefined;

        const filteredQuestions = questionFilter !== undefined
            ? never.questions.filter(question => {
                if (questionFilter === 0) return question.level === questionFilter;
                if (questionFilter === 1) return question.level >= questionFilter;
            })
            : never.questions;
        const picked = filteredQuestions[Math.floor(Math.random() * filteredQuestions.length)];

        res.status(200).json({ prompt: picked.question, level: picked.level })
    } else {
        res.status(405).json({ error: 'Try a GET instead' });
    }
}
