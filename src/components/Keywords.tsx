import * as React from 'react';
import { useEffect, useState } from 'react';

import { firestore } from 'firebase';
import { docData } from 'rxfire/firestore';
import { map } from 'rxjs/operators';
import { getFirebaseApp } from '../lib/firebase';

const app = getFirebaseApp();

type Props = {
  reference?: firestore.DocumentReference;
} & typeof defaultProps;

const defaultProps = {
  reference: app
    .firestore()
    .collection('configs')
    .doc('discord'),
};

function Keyword(props: Props) {
  const [state, setState] = useState<string[]>([]);

  function updateKeywords(keywords: string[]) {
    setState(keywords);
  }

  useEffect(() => {
    const subscribtion = docData<{ id: string; keywords: string[] }>(
      props.reference,
    )
      .pipe(map((x) => x.keywords))
      .subscribe(updateKeywords);

    return () => subscribtion.unsubscribe();
  }, []);

  const items = state.map((item) => <li key={item}>{item}</li>);

  return <ul>{items}</ul>;
}

Keywords.defaultProps = defaultProps;

export default Keywords;
