import { Alert, StyleSheet, Text, View } from "react-native";
import Input from "./Input";
import { useState } from "react";
import Button from "../UI/Button";
import { getFormattedDate } from "../../util/date";

const ExpenseForm = ({ onCancel, onSubmit, label, defaultValue }) => {
  const [inputValue, setInputValue] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : "",
      isValid: true,
    },
    date: {
      value: defaultValue ? getFormattedDate(defaultValue.date) : "",
      isValid: true,
    },
    desc: { value: defaultValue ? defaultValue.desc : "", isValid: true },
  });

  const inputHandler = (identifier, enteredText) => {
    setInputValue((currState) => {
      return {
        ...currState,
        [identifier]: { value: enteredText, isValid: true },
      };
    });
  };

  const onSubmitHandler = () => {
    const expenseData = {
      desc: inputValue.desc.value,
      amount: +inputValue.amount.value,
      date: new Date(inputValue.date.value),
    };

    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const descIsValid = expenseData.desc.trim().length > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";

    if (!amountIsValid || !dateIsValid || !descIsValid) {
      Alert.alert("Invalid Input", "Please enter the valid inputs!");
      setInputValue({
        amount: { value: inputValue.amount.value, isValid: amountIsValid },
        date: { value: inputValue.date.value, isValid: dateIsValid },
        desc: { value: inputValue.desc.value, isValid: descIsValid },
      });
      return;
    }

    onSubmit(expenseData);
  };
  return (
    <View style={styles.root}>
      <Text style={styles.text}>Your Expenses</Text>

      <Input
        label="Description"
        invalid={!inputValue.desc.isValid}
        textInputConfig={{
          multiline: true,
          onChangeText: inputHandler.bind(this, "desc"),
          autoCapitalize: "words",
          value: inputValue.desc.value,
        }}
      />
      <View style={styles.input}>
        <Input
          label="Amount"
          invalid={!inputValue.amount.isValid}
          textInputConfig={{
            keyboardType: "number-pad",
            onChangeText: inputHandler.bind(this, "amount"),
            value: inputValue.amount.value,
          }}
          style={styles.spread}
        />

        <Input
          label="Date"
          invalid={!inputValue.date.isValid}
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputHandler.bind(this, "date"),
            value: inputValue.date.value,
          }}
          style={styles.spread}
        />
      </View>
      <View style={styles.buttons}>
        <Button mode={"flat"} style={styles.buttonStyle} onPress={onCancel}>
          Cancel
        </Button>
        <Button style={styles.buttonStyle} onPress={onSubmitHandler}>
          {label}
        </Button>
      </View>
    </View>
  );
};

export default ExpenseForm;

const styles = StyleSheet.create({
  root: {
    marginTop: 40,
    // margin: 10,
  },
  text: {
    fontSize: 24,
    fontWeight: 700,
    color: "white",
    textAlign: "center",
    marginBottom: 16,
  },
  input: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  spread: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    // marginHorizontal: 10,
    justifyContent: "space-between",
    marginVertical: 20,
  },
  buttonStyle: {
    minWidth: 150,
  },
});
