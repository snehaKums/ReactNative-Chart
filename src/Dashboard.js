import React from 'react';
import {
    StyleSheet,
    Text,
    View,
    ScrollView
} from 'react-native';

import Chart from './Chart';

const Dashboard = () => {
  return (
    <ScrollView>
      <View style={styles.item}>
        <Text style={styles.text}>Error Rate by Day</Text>
        <Chart type="line" />
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>Error Status by Day</Text>
        <Chart type="bar" />
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>Errors by Status</Text>
        <Chart type="pie" />
      </View>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  item: {
    padding: 0,
    fontSize: 18,
    height: 400,
    borderWidth: 0.5,
    borderColor: '#d6d7da',
  },
  text: {
    fontSize: 24,
    padding: 10,
    fontWeight: "bold",
  }
})

Dashboard.navigationOptions = {
  title: 'Dashboard',
  headerForceInset: { top: 'never', bottom: 'never' }
};

export default Dashboard;
