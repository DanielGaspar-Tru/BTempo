import React from 'react';
import {StyleSheet, Text, SafeAreaView, View} from 'react-native';
import {Button} from '..';

const ErrorView = ({errorMessage}) => {
  onPress = () => {
    console.log('RECOVER');
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.error_title}>Ooops, algo deu errado</Text>
        <Text style={styles.error_subtitle}>{errorMessage}</Text>
        <Button title="Tentar novamente" onPress={onPress} />
      </View>
    </SafeAreaView>
  );
};

class ErrorBoundary extends React.Component {
  state = {
    hasError: false,
    errorMessage: '',
  };

  static getDerivedStateFromError(error) {
    return {errorMessage: error.toString(), hasError: true};
  }

  componentDidCatch(error, info) {
    // Pode submeter o log para algum serviço de log.
    // logError(error, info);
    // OU
    // logError(error.toString(), info.componentStack);
    console.log('Erro:', error.toString());
    console.log('Info:', info);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorView errorMessage={this.state.errorMessage} />;
    }
    return this.props.children;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
    flex: 1,
  },
  content: {
    paddingHorizontal: 32,
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  error_title: {
    fontSize: 24,
    fontFamily: 'Poppins_600SemiBold',
    color: 'white',
    textAlign: 'center',
    marginTop: 24,
  },
  error_subtitle: {
    fontSize: 13,
    fontFamily: 'Poppins_300Light',
    color: 'white',
    textAlign: 'center',
    marginTop: 16,
  },
});

export default ErrorBoundary;
