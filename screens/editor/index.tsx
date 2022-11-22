import {ScrollView} from 'react-native';
import React, {useState} from 'react';
import Editor from '../../components/editor';
import SpritList from '../../components/spritlist';
import {ISpritItem, SPRITS_LIST} from '../../constants';

const EditorScreen = (): JSX.Element => {
  const [spritListState, setSpritListState] =
    useState<ISpritItem[]>(SPRITS_LIST);

  return (
    <ScrollView>
      <Editor list={spritListState} />
      <SpritList list={spritListState} setList={setSpritListState} />
    </ScrollView>
  );
};

export default EditorScreen;
