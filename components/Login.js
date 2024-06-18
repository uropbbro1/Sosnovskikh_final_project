import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

export default function Login({navigation}) {
  const db = SQLite.openDatabaseSync("calculator.db");
  const [login, onChangeLogin] = useState('');
  const [password, onChangePassword] = useState('');
  const [username, onChangeUsername] = useState('');
  const goToRegister = () => {
    navigation.navigate('Register');
  }

  useEffect(() => {
    db.runSync(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, pass TEXT)`);
  });
  db.withTransactionAsync(async () => {
  const result = await db.getAllAsync('SELECT * FROM users');
  for (const row of result) {
    console.log('Items:', JSON.stringify(row));
  }
  
});
 const authorize = () => {
    db.withTransactionAsync(async () => {
      const result = await db.getFirstAsync('SELECT * from users WHERE username = ? AND pass = ?', login, password);
      console.log(result);
      if(result === null){
        alert('неправильный пароль или имя пользователя')
      }else{
        console.log(result["id"], result["username"]);
        navigation.navigate('HypothecCalculator', {
          userId: `${result["id"]}`,
          userName: result["username"],
        });
      }
    });
 }

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Логин</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeLogin}
        value={login}
        placeholder="Логин"
      />
      <Text style={styles.label}>Пароль</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangePassword}
        value={password}
        placeholder="Пароль"
      />
      <Text style={styles.toRegister} onPress={goToRegister}>У вас ещё нет аккаунта? Зарегистрироваться.</Text>
      <Button title="Войти" onPress={authorize}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 24,
    height: '100%',
    backgroundColor: 'white',
  },
  input: {
    width: '80%',
    borderBottomWidth: 3,
    borderTopWidth: 3,
    borderLeftWidth: 3,
    borderRightWidth: 3,
    paddingLeft: 10
  },
  label: {
    margin: 24,
    marginTop: 20,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  toRegister: {
    marginTop: 30,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#000080'
  },
});