import { arrayUnion, doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../services/firebase';
import { Session } from '../types/session';
import { FIFTY_MINUTES_IN_MILISECONDS } from './time';

function subtractMinutes(initialDate: Date, minutes: number) {
  const date = new Date(initialDate);
  date.setMinutes(date.getMinutes() - minutes);

  return date;
}

export async function addSession(userId: string) {
  const environment: string = process.env.NEXT_PUBLIC_ENVIRONMENT!;

  const date = new Date();
  const session: Session = {
    duration: FIFTY_MINUTES_IN_MILISECONDS,
    finishedAt: date.toISOString(),
    startedAt: subtractMinutes(date, 50).toISOString(),
    label: 'none',
  };

  try {
    const docRef = doc(db, `database/${environment}/pomodoro_sessions`, userId);
    const docSnap = await getDoc(docRef);

    console.log('the evironment is : ', environment);
    console.log('the session is: ', session);

    if (docSnap.exists()) {
      await updateDoc(docRef, { sessions: arrayUnion(session) });
    } else {
      await setDoc(docRef, { sessions: [session] });
    }
  } catch (err) {
    console.error(err);
  }
}
