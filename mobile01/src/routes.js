import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { createStackNavigator } from 'react-navigation-stack';

import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Detalhes from './pages/Dashboard/Detalhes';
import InfProblema from './pages/Dashboard/InfProblema';
import VisProblema from './pages/Dashboard/VisProblema';
import ConfEntrega from './pages/Dashboard/ConfEntrega';
import Perfil from './pages/Perfil';

import Icon from 'react-native-vector-icons/MaterialIcons';

export default (signedIn = false) =>
  createAppContainer(
    createSwitchNavigator(
      {
        Login: createSwitchNavigator({
          Login,
        }),
        App: createBottomTabNavigator(
          {
            Dashboard: {
              screen: createStackNavigator(
                {
                  Dashboard: {
                    screen: Dashboard,
                    navigationOptions: {
                      header: null,
                    },
                  },
                  Detalhes: {
                    screen: Detalhes,
                    navigationOptions: {
                      title: 'Detalhes da encomenda',
                    },
                  },
                  ConfEntrega: {
                    screen: ConfEntrega,
                    navigationOptions: {
                      title: 'Confirmar entrega',
                    },
                  },
                  VisProblema: {
                    screen: VisProblema,
                    navigationOptions: {
                      title: 'Visualizar problemas',
                    },
                  },
                  InfProblema: {
                    screen: InfProblema,
                    navigationOptions: {
                      title: 'Informar problema',
                    },
                  },
                },
                {
                  defaultNavigationOptions: {
                    headerTransparent: false,
                    headerStyle: {
                      backgroundColor: '#7D40E7',
                    },
                    headerTintColor: '#fff',
                    headerLeftContainerStyle: {
                      marginLeft: 20,
                    },
                  },
                }
              ),
              navigationOptions: {
                tabBarVisible: true,
                tabBarLabel: 'Entregas',

                tabBarIcon: <Icon name="menu" size={30} color="#999999" />,
              },
            },

            Perfil: {
              screen: Perfil,
              navigationOptions: {
                tabBarVisible: true,
                tabBarLabel: 'Meu Perfil',

                tabBarIcon: (
                  <Icon name="account-circle" size={30} color="#999999" />
                ),
              },
            },
          },
          {
            resetOnBlur: true,
            tabBarOptions: {
              keyboardHidesTabBar: true,
              fontSize: 50,
              activeTintColor: '#7D40E7',
              inactiveTintColor: '#999999',
              style: {
                backgroundColor: '#FFFFFF',
                height: 70,
              },
            },
          }
        ),
      },
      {
        initialRouteName: signedIn ? 'App' : 'Login',
      }
    )
  );
