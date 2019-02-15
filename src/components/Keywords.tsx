import * as React from 'react';
import { useEffect, useState } from 'react';

import { firestore } from 'firebase';
import { docData } from 'rxfire/firestore';
import { map } from 'rxjs/operators';
import { getFirebaseApp } from '../lib/firebase';

const app = getFirebaseApp();

interface IBuildKeywords {
  list: string[];
}

const BuildKeywords: React.FC<IBuildKeywords> = (props: IBuildKeywords) => {
  const items = props.list.map((item) => <li key={item}>{item}</li>);

  return <ul>{items}</ul>;
};

interface IKeywords {
  ref?: firestore.DocumentReference;
}

const Keywords: React.FunctionComponent<IKeywords> = (props) => {
  const [state, setState] = useState<string[]>([]);

  function updateKeywords(keywords: string[]) {
    setState(keywords);
  }

  useEffect(() => {
    const subscribtion = docData<{ id: string; keywords: string[] }>(props.ref)
      .pipe(map((x) => x.keywords))
      .subscribe(updateKeywords);

    return () => subscribtion.unsubscribe();
  }, []);

  return <BuildKeywords list={state} />;
};

Keywords.defaultProps = {
  ref: app
    .firestore()
    .collection('configs')
    .doc('discord'),
};

export default Keywords;
