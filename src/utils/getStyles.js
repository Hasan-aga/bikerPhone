import {lightMap, darkMap} from './map.theme';

export function getStyles(isDark) {
  const primaryColor = isDark ? '#264653' : '#f7f7f7';
  const highLightColor = isDark ? '#F9C46A' : '#555';
  const softColor = isDark ? '#2f2715' : '#999';
  const styles = {
    highLightColor,
    primaryColor,
    softColor,
    home: {
      flex: 1,
      position: 'relative',
    },
    mapcontainer: {
      flex: 1, //the container will fill the whole screen.
    },
    map: {
      flex: 1,
    },
    mapTheme: isDark ? darkMap : lightMap,
    ui: {
      flexDirection: 'row',
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      position: 'absolute',
      top: 10,
    },
    bar: {
      flex: 0.9,
      backgroundColor: primaryColor,
      color: highLightColor,
      height: 40,
      margin: 12,
      borderWidth: 1,
      borderRadius: 5000,
      padding: 1,
      elevation: 100,
      flexDirection: 'row',
      alignItems: 'center',
      borderColor: softColor,
    },
    input: {
      flex: 1,
      color: highLightColor,
      marginLeft: 10,
      marginRight: 5,
      borderRightWidth: 1,
      borderColor: softColor,
    },
    icon: {
      color: highLightColor,
      paddingLeft: 5,
      paddingRight: 5,
    },

    circleButton: {
      backgroundColor: primaryColor,
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 1,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: softColor,
      marginRight: 2,
    },

    textAndIconButton: {
      flexDirection: 'row',
      backgroundColor: primaryColor,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      paddingLeft: 10,
      paddingRight: 10,
      margin: 10,
      borderRadius: 100,
      borderWidth: 1,
      borderColor: softColor,
    },

    iconOnlyButton: {
      height: 40,
      width: 40,
      justifyContent: 'center',
      alignItems: 'center',
    },

    callout: {
      flexDirection: 'row',
      backgroundColor: '#f7f7f7',
      padding: 10,
      borderWidth: 1,
      borderRadius: 100,
      color: '#222',
      margin: 1,
    },
    calloutText: {
      alignSelf: 'center',
    },
    bottomUi: {
      position: 'absolute',
      bottom: 0,
      width: '100%',
      alignItems: 'center',
    },
    card: {
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      backgroundColor: primaryColor,
      bottom: 0,
      width: '100%',
      height: '100%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
    },
    cardText: {
      color: highLightColor,
    },

    chartContainer: {flex: 4},
    verticalContainer: {
      alignItems: 'flex-end',
      backgroundColor: primaryColor,
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      paddingTop: 10,
    },
    chart: {
      height: 200,
      width: 'auto', // width is set to screen.width in component
      backgroundColor: primaryColor,
      alignSelf: 'center',
    },
    horizontalScroll: {
      backgroundColor: 'red',
    },
    infoCard: {
      flexDirection: 'row',
      position: 'absolute',
      bottom: 1,
      width: '100%',
    },
    busy: {
      backgroundColor: primaryColor,
      borderRadius: 100,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      marginLeft: 'auto',
      marginRight: 'auto',
      marginBottom: 100,
      width: '50%',
      borderColor: softColor,
      borderWidth: 1,
    },
    busyText: {
      fontSize: 15,
      fontWeight: 'bold',
      color: highLightColor,
    },
    highlightChart: {
      backgroundColor: 'rgba(3, 166, 74, 0.3)',
      height: '95%',
      zIndex: 1000,
      position: 'absolute',
      bottom: 10,
      justifyContent: 'center',
    },
    highlightText: {
      opacity: 1,
      backgroundColor: highLightColor,
      alignSelf: 'center',
      width: 110,
      borderRadius: 100,
      borderWidth: 1,
      paddingLeft: 5,
      fontSize: 13,
    },
  };

  return styles;
}
