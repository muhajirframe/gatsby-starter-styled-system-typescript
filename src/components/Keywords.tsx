import * as React from 'react';
import { useEffect, useState } from 'react';

import { docData } from 'rxfire/firestore';
import { map } from 'rxjs/operators';
import { getFirebaseApp } from '../lib/firebase';

interface IBuildKeywords {
  list: string[];
}

const BuildKeywords: React.FC<IBuildKeywords> = (props: IBuildKeywords) => {
  const items = props.list.map((item) => <li key={item}>{item}</li>);

  return <ul>{items}</ul>;
};

const Keywords: React.FunctionComponent = (props) => {
  const [state, setState] = useState<string[]>([]);

  const app = getFirebaseApp();

  function updateKeywords(keywords: string[]) {
    setState(keywords);
  }

  useEffect(() => {
    const subscribtion = docData<{ id: string; keywords: string[] }>(
      app
        .firestore()
        .collection('configs')
        .doc('discord'),
    )
      .pipe(map((x) => x.keywords))
      .subscribe(updateKeywords);

    return () => subscribtion.unsubscribe();
  }, []);

  return <BuildKeywords list={state} />;
};

export default Keywords;
