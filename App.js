import React, {useState, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  Button,
  View,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    marginTop: 30,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '75%',
    height: 40,
    marginBottom: 20,
  },
  textInput: {
    borderColor: 'black',
    borderWidth: 1,
    width: '70%',
    fontSize: 15,
  },
  title: {
    marginTop: 20,
    fontSize: 20,
    textAlign: 'center',
    color: 'black',
    fontWeight: 'bold',
  },
});

export default function App() {
  const [inputText, setInputText] = useState('');
  const [todoList, setTodoList] = useState([]);
  const [toggleCheckBox, setToggleCheckBox] = useState(false);
  const [editingItem, setEditingItem] = useState('0');

  const addTodo = () => {
    console.log(inputText);
    setTodoList(todoList => [
      ...todoList,
      {key: Math.random().toString(), data: inputText},
    ]);
    setInputText('');
    Keyboard.dismiss();
  };

  const removeItem = itemKey => {
    var list = todoList.filter(item => item.key != itemKey);
    setTodoList(list);
  };

  const editItem = itemObject => {
    setInputText(itemObject.data);
    setEditingItem(itemObject.key);
  };

  const updateItem = () => {
    setTodoList(
      todoList.map(item =>
        item.key === editingItem ? {key: item.key, data: inputText} : item,
      ),
    );
    setInputText('');
    Keyboard.dismiss();
  };

  return (
    <>
      <Text style={styles.title}>TodoList App</Text>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Enter Item"
            value={inputText}
            onChangeText={text => setInputText(text)}></TextInput>
          <Button
            title="Add Todo"
            onPress={editingItem == 0 ? addTodo : updateItem}></Button>
        </View>
        <ScrollView
          style={{
            width: '90%',
            backgroundColor: 'white',
            marginLeft: 0,
            height: '30%',
          }}>
          {todoList.map(i => {
            return (
              <TouchableOpacity key={i.key}>
                <View
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',

                    justifyContent: 'space-between',
                    alignContent: 'center',
                    borderWidth: 1,
                    marginBottom: 3,
                    padding: 5,
                  }}>
                  <View style={{backgroundColor: 'white', width: '60%'}}>
                    <Text
                      style={{
                        marginLeft: 5,
                      }}>
                      {i.data}
                    </Text>
                  </View>
                  <View
                    style={{
                      display: 'flex',
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-around',
                      width: '40%',
                    }}>
                    <CheckBox
                      disabled={false}
                      value={toggleCheckBox}
                      onValueChange={newValue => setToggleCheckBox(newValue)}
                    />
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => editItem(i)}>
                      <Text style={{color: 'blue'}}>Edit</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={() => removeItem(i.key)}>
                      <Text style={{color: 'red'}}>Delete</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              </TouchableOpacity>
            );
          })}
        </ScrollView>
      </View>
    </>
  );
}
