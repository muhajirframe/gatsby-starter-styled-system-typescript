import * as React from 'react';
import { useEffect, useState } from 'react';

import {
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

import { firestore } from 'firebase';
import { docData } from 'rxfire/firestore';
import { map } from 'rxjs/operators';
import { getFirebaseApp } from '../lib/firebase';

const app = getFirebaseApp();

interface BuildKeywords {
  action: () => void;
  data: string[];
}
function BuildKeywords(props: BuildKeywords) {
  return <List>{props.data.map(buildKeyword)}</List>;
}

const ref = app
  .firestore()
  .collection('configs')
  .doc('discord');
function buildKeyword(keyword: string) {
  const handleDelete = () =>
    ref.update({ keywords: firestore.FieldValue.arrayRemove(keyword) });
  return (
    <ListItem>
      <ListItemText>{keyword}</ListItemText>
      <ListItemSecondaryAction>
        <IconButton onClick={handleDelete}>
          <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </ListItem>
  );
}

type Props = {
  reference?: firestore.DocumentReference;
} & typeof defaultProps;

const defaultProps = {
  reference: app
    .firestore()
    .collection('configs')
    .doc('discord'),
};

function Keywords(props: Props) {
  const [keywords, setState] = useState<string[]>([]);

  function updateKeywords(data: string[]) {
    setState(data);
  }

  useEffect(() => {
    const subscribtion = docData<{ id: string; keywords: string[] }>(
      props.reference,
    )
      .pipe(map((x) => x.keywords))
      .subscribe(updateKeywords);

    return () => subscribtion.unsubscribe();
  }, []);

  return BuildKeywords({
    action: () => null,
    data: keywords,
  });
}

Keywords.defaultProps = defaultProps;

export default Keywords;
