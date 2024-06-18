import { Text, View, StyleSheet, TextInput, Button, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useState, useEffect } from 'react';

export default function HypothecCalculator({ route }) {
  const hypothecTypeSelection = [
    { label: "Новостройка", value: '1' },
    { label: "Вторичное жилье", value: '2' },
    { label: "Готовое жилье", value: '3' },
    { label: "Семейная ипотека", value: '4' },
    { label: "Ипотека для IT-специалистов", value: '5' },
  ];
  const [hypothecType, onChangeHypothecType] = useState('');
  const [firstDeposite, onChangeFirstDeposite] = useState(0);
  const [propertyPrice, onChangePropertyPrice] = useState(0);
  const [mortgageTerm, onChangeMortgageTerm] = useState(0);

  const [calculatedHypothecs, onChangeCalculatedHypothecs] = useState([]);
  const [flag, setFlag] = useState(false);
  
  useEffect(() => {
    console.log(hypothecType);
  }, [hypothecType]);
  
  useEffect(() => {
    if(calculatedHypothecs.length > 0){
      console.log(calculatedHypothecs);
      setFlag(true);
    }
  }, [calculatedHypothecs]);

  function CalculateHypothec(){
    //Для рассчетов используется следующая формула:
    //A = S * r * s / (s - 1)
    switch(hypothecType["label"]){
      case "Новостройка": {
        onChangeCalculatedHypothecs([]);
        let monthlyPayment = 0;
        const creditAmmount = propertyPrice - firstDeposite;
        const term = mortgageTerm * 12;
        const banksAndPrecents = [{bankName: "ВТБ", precent: 17.9}, {bankName: "Совкомбанк", precent: 10.99}, {bankName: "Банк ДОМ.РФ", precent: 17.7}, {bankName: "РНКБ", precent: 14.4}, {bankName: "ПСБ", precent: 16.9}, {bankName: "Росбанк", precent: 20.3}, {bankName: "Уралсиб", precent: 18.99}, {bankName: "Ак Барс Банк", precent: 17.5}, {bankName: "МТС Банк", precent: 17.7}];
        let bankList = [];
        for(let i = 0; i < banksAndPrecents.length; i++){
          const precentInMonth = banksAndPrecents[i]["precent"] / 12 / 100;
          let s = (1 + precentInMonth)**(term);
          monthlyPayment =  Math.ceil(creditAmmount * precentInMonth * s / (s - 1));
          bankList.push({bankName: banksAndPrecents[i]["bankName"], precent: banksAndPrecents[i]["precent"], monthlyPayment: monthlyPayment});
          console.log("платеж: ", monthlyPayment ,banksAndPrecents[i]["bankName"]);
        }
        onChangeCalculatedHypothecs(bankList);
        return null;
      }
      case "Семейная ипотека": {
        onChangeCalculatedHypothecs([]);
        let monthlyPayment = 0;
        const creditAmmount = propertyPrice - firstDeposite;
        const term = mortgageTerm * 12;
        const banksAndPrecents = [{bankName: "ВТБ", precent: 6}, {bankName: "Альфа-Банк", precent: 6}, {bankName: "Банк ДОМ.РФ", precent: 6}, {bankName: "РНКБ", precent: 6}, {bankName: "ПСБ", precent: 5}, {bankName: "Росбанк", precent: 6}, {bankName: "Ак Барс Банк", precent: 6}, {bankName: "Россельхозбанк", precent: 5}, {bankName: "МТС Банк", precent: 5.8}];
        let bankList = [];
        for(let i = 0; i < banksAndPrecents.length; i++){
          const precentInMonth = banksAndPrecents[i]["precent"] / 12 / 100;
          let s = (1 + precentInMonth)**(term);
          monthlyPayment =  Math.ceil(creditAmmount * precentInMonth * s / (s - 1));
          bankList.push({bankName: banksAndPrecents[i]["bankName"], precent: banksAndPrecents[i]["precent"], monthlyPayment: monthlyPayment});
          console.log("платеж: ", monthlyPayment ,banksAndPrecents[i]["bankName"]);
        }
        onChangeCalculatedHypothecs(bankList);
        return null;
      }
      case "Готовое жилье": {
        onChangeCalculatedHypothecs([]);
        let monthlyPayment = 0;
        const creditAmmount = propertyPrice - firstDeposite;
        const term = mortgageTerm * 12;
        const banksAndPrecents = [{bankName: "Альфа-Банк", precent: 19.09}, {bankName: "Банк ДОМ.РФ", precent: 18.1}, {bankName: "Уралсиб", precent: 18.99}];
        let bankList = [];
        for(let i = 0; i < banksAndPrecents.length; i++){
          const precentInMonth = banksAndPrecents[i]["precent"] / 12 / 100;
          let s = (1 + precentInMonth)**(term);
          monthlyPayment =  Math.ceil(creditAmmount * precentInMonth * s / (s - 1));
          bankList.push({bankName: banksAndPrecents[i]["bankName"], precent: banksAndPrecents[i]["precent"], monthlyPayment: monthlyPayment});
          console.log("платеж: ", monthlyPayment ,banksAndPrecents[i]["bankName"]);
        }
        onChangeCalculatedHypothecs(bankList);
        return null;
      }
      case "Вторичное жилье": {
        onChangeCalculatedHypothecs([]);
        let monthlyPayment = 0;
        const creditAmmount = propertyPrice - firstDeposite;
        const term = mortgageTerm * 12;
        const banksAndPrecents = [{bankName: "ВТБ", precent: 17.9}, {bankName: "Банк ДОМ.РФ", precent: 18.1}, {bankName: "РНКБ", precent: 15.1}, {bankName: "Ак Барс Банк", precent: 17.5}, {bankName: "МТС Банк", precent: 17.7}];
        let bankList = [];
        for(let i = 0; i < banksAndPrecents.length; i++){
          const precentInMonth = banksAndPrecents[i]["precent"] / 12 / 100;
          let s = (1 + precentInMonth)**(term);
          monthlyPayment =  Math.ceil(creditAmmount * precentInMonth * s / (s - 1));
          bankList.push({bankName: banksAndPrecents[i]["bankName"], precent: banksAndPrecents[i]["precent"], monthlyPayment: monthlyPayment});
          console.log("платеж: ", monthlyPayment ,banksAndPrecents[i]["bankName"]);
        }
        onChangeCalculatedHypothecs(bankList);
        return null;
      }
      case "Ипотека для IT-специалистов": {
        onChangeCalculatedHypothecs([]);
        let monthlyPayment = 0;
        const creditAmmount = propertyPrice - firstDeposite;
        const term = mortgageTerm * 12;
        const banksAndPrecents = [{bankName: "Все банки", precent: 5}];
        let bankList = [];
        for(let i = 0; i < banksAndPrecents.length; i++){
          const precentInMonth = banksAndPrecents[i]["precent"] / 12 / 100;
          let s = (1 + precentInMonth)**(term);
          monthlyPayment =  Math.ceil(creditAmmount * precentInMonth * s / (s - 1));
          bankList.push({bankName: banksAndPrecents[i]["bankName"], precent: banksAndPrecents[i]["precent"], monthlyPayment: monthlyPayment});
          console.log("платеж: ", monthlyPayment ,banksAndPrecents[i]["bankName"]);
        }
        onChangeCalculatedHypothecs(bankList);
        return null;
      }
    }
  }
  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.paragraph}>
        {route.params.userName}, Добро пожаловать!{"\n"}
        </Text>
        <Text style={{textAlign: 'center'}}>
          Наше приложение покажет лучшие предложения по ипотеке среди популярных банков.{"\n"}
          Рассчитайте ипотеку для любых целей всего за 4 шага!
        </Text>
        <Text style={styles.paragraph}>
          Шаг 1. Выберите цель ипотеки.
        </Text>
        <Dropdown
            style={styles.dropdown}
            placeholderStyle={styles.placeholderStyle}
            data={hypothecTypeSelection}
            labelField="label"
            valueField="value"
            maxHeight={300}
            value={hypothecType}
            placeholder="Выберите тип ипотеки"
            onChange={item => {
              onChangeHypothecType(item);
            }}
        />
        <Text style={styles.paragraph}>
          Шаг 2. Введите цену недвижимости в рублях.
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangePropertyPrice}
          value={propertyPrice}
          placeholder="Цена недвижимости"
        />
        <Text style={styles.paragraph}>
          Шаг 3. Введите ваш первоначальный взнос.
        </Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeFirstDeposite}
          value={firstDeposite}
          placeholder="Первоначальный взнос"
        />
        <Text style={styles.paragraph}>
          Шаг 4. Введите срок ипотеки (лет).
        </Text>
        <TextInput
          style={styles.inputLast}
          onChangeText={onChangeMortgageTerm}
          value={mortgageTerm}
          placeholder="Срок ипотеки"
        />
        <Button title="Рассчитать ипотеку!" onPress={CalculateHypothec} />
        {calculatedHypothecs.length > 0 ? (
          <View>
            <View style={styles.tableLabel}>
              <Text style={styles.paragraph}>Предложение по ипотеке в банках</Text>
            </View>
            <View style={styles.tableHeader}>
              <Text>Банк</Text>
              <Text>Ставка</Text>
              <Text>Платеж/мес.</Text>
            </View>
          </View>
        ):null}
          {calculatedHypothecs.map((bankRow, index) => {
            return(
              <View style={styles.bankList} key={index}>
                <Text style={styles.paragraph} key={index}>{bankRow["bankName"]}</Text>
                <Text style={styles.paragraph} key={index}>{bankRow["precent"]}</Text>
                <Text style={styles.paragraph} key={index}>{bankRow["monthlyPayment"]}</Text>
            </View>
          )})
          }
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 10,
    marginTop: 20,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  dropdown: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    color: 'black',
    marginTop: 20,
    marginStart: 'auto',
    marginEnd: 'auto',
    paddingLeft: 10
  },
  placeholderStyle: {
    color: 'black',
  },
  input: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingLeft: 10,
    marginTop: 20,
    marginStart: 'auto',
    marginEnd: 'auto'
  },
  inputLast: {
    width: '80%',
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    paddingLeft: 10,
    marginTop: 20,
    marginStart: 'auto',
    marginEnd: 'auto',
    marginBottom: 30,
  },
  bankList: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flexGrow: 2,
    gap: 10,
    textAlign: 'center',
    borderColor: 'gray',
    borderBottomWidth: 2
  },
  tableLabel: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableHeader: {
    color: 'gray',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    textAlign: 'center',
    flexBasis: '30%',
    gap: 10,
    borderColor: 'gray',
    borderBottomWidth: 2,
    paddingBottom: 10,
    marginTop: 20
  }
});
