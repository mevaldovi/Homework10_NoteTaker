const notesid = () => {
    return Math.floor(1 + Math.random() * 0x10000)
        .toString(16)
        .substring(1);
};

notesid();
const ids = res.json(data);


module.exports = ids;