import firebase from 'firebase/app';

const CHUNK_SIZE = 10;

const loadChunkByIds = async (collection, ids) => {

  try {
    const snapshot = await firebase.firestore()
      .collection(collection)
      .where(firebase.firestore.FieldPath.documentId(), 'in', ids)
      .get()

    const result = {};
    snapshot.docs.forEach(doc => {
      const record = {
        ...doc.data(),
        _id: doc.id
      };

      result[doc.id] = record;
    });

    return result;
  } catch (error) {
    console.log(error);
    return [];
  }
};

export const loadByIds = collection => async ids => {
  let remaining = ids;
  let result = {};

  while (remaining && remaining.length > 0) {
    const chunkResult = await loadChunkByIds(collection, remaining.slice(0, CHUNK_SIZE));
    result = { ...result, ...chunkResult };
    remaining = remaining.slice(CHUNK_SIZE);
  }

  return result;
};

export const nextAlphabetically = text => text
  .toLowerCase()
  .split('')
  .map((char, index) => {
    const nextLexigraph = c => {
      const next = String.fromCharCode(c.charCodeAt(0) + 1);
      return next === '{' ? 'aa' : next;
    };

    return index < text.length - 1 ? char : nextLexigraph(char);
  })
  .join('');
