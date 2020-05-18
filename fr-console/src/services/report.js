import firebase from 'firebase/app';

export const loadLatestReport = async () => {
    try {
        const snapshot = await firebase.firestore()
            .collection('dailyreports')
            .orderBy('_meta.created', 'desc')
            .limit(1)
            .get();

        return snapshot.docs[0] && snapshot.docs[0].data();
    } catch (error) {
        console.error(error);
        return error;
    }
};

export const loadReport = async (from, to) => {
    try {
        const snapshot = await firebase.firestore()
            .collection('dailyreports')
            .orderBy('_meta.createdDate', 'desc')
            .limit(30)
            .get();

        return snapshot.docs.map(doc => doc.data());
    } catch (error) {
        console.error(error);
        return error;
    }
};