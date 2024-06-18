import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { useState, useEffect } from 'react';
import * as SQLite from 'expo-sqlite';

export default function Register({navigation}) {
  const db = SQLite.openDatabaseSync("calculator.db");
  const [login, onChangeLogin] = useState('');
  const [password, onChangePassword] = useState('');

  const goToLogin = () => {
    navigation.navigate('Login');
  }
  

  useEffect(() => {
    db.runSync(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT NOT NULL, pass TEXT)`);
  });

  db.withTransactionAsync(async () => {
  const result = await db.getFirstAsync('SELECT COUNT(*) FROM users');
  console.log('Count:', result["COUNT(*)"]);
});

 const registerUser = () => {
  if(login === '' || password === ''){
    alert("Заполните все поля");
  }else{
    let index = db.getFirstSync('SELECT COUNT(*) FROM users WHERE username = ?', login)
    if(index["COUNT(*)"] === 0){
    db.withTransactionAsync(async () => {
      const result = await db.runAsync('INSERT INTO users (username, pass) VALUES (?, ?)', login, password);
    });
    navigation.navigate('Login');
    }else{
      alert("Этот логин уже занят.")
    }
  } 
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
      <Text style={styles.toLogin} onPress={goToLogin}>У вас уже есть аккаунт? Войти.</Text>
      <Button title="Зарегистрироваться" onPress={registerUser}/>
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
  toLogin: {
    marginTop: 30,
    marginBottom: 30,
    fontWeight: 'bold',
    color: '#000080'
  },
});
