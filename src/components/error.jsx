import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Error = ({
  message = 'An unexpected error occurred.',
  style = {},
  textStyle = {},
}) => {
  return (
    <View style={[styles.container, style]}>
      <Text style={[styles.errorText, textStyle]}>
        {message}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFEEEE',
    padding: 15,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FF4136',
    marginVertical: 10,
  },
  errorText: {
    marginLeft: 10,
    color: '#333',
    fontSize: 16,
    flex: 1,
    flexWrap: 'wrap',
  },
});

export default Error;
