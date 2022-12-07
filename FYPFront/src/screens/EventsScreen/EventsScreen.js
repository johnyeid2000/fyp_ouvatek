import React from 'react';
import { View, Text, FlatList } from 'react-native';
import Calendar from 'react-native-calendars/src/calendar'; 

const EventsScreen =()=>{

    return(
        <View style={{flex:1}}>
        <Calendar
            style={{borderRadius:10, elevation:4, margin:20}}
            theme={{ 
                arrowColor: '#651B70', 
                selectedDayBackgroundColor:'#651B70',
                }}
                markedDates={{
                    '2022-12-08': {marked: true, dotColor: '#fff'},
                    '2022-12-09': {marked: true, dotColor: '#651B70'},
                    '2022-12-16': {marked: true, dotColor: '#651B70'},
                    '2022-12-20': {marked: true, dotColor: '#651B70'}
                }}
        />
        <FlatList
          data={[
            // { key: '8-12-2022: Add your measurements' },
            // { key: '11-12-2022: Appointment with Dr. Jack at 11:00' },
            // { key: '13-12-2022: Appointment with Dr. Bob at 13:00 ' },
            // { key: '16-12-2022: Add your measurements' },
            { key: 'Event 1' },
            { key: 'Event 2' },
            { key: 'Event 3' },
            { key: 'Event 4' },
          ]}
          renderItem={({ item }) => {
            return (
              <View style={{ marginLeft:20}}>
                <Text style={{fontSize:16, marginBottom:5}}>{`\u2022 ${item.key}`}</Text>
              </View>
            );
          }}
        />
        </View>
    )
}

export default EventsScreen


// uncomment the code below to see another option for this page but it is slow so idk




// import React, {useState} from 'react';
// import {Text, View, TouchableOpacity, StatusBar } from 'react-native';
// import { Agenda } from 'react-native-calendars';
// import { Card } from 'react-native-paper';
// import styles from './styles';

// const timeToString = (time) => {
//     const date = new Date(time);
//     return date.toISOString().split('T')[0];
// }

// const EventsScreen = () => {
//     const [items, setItems] = useState({});

//     const loadItems = (day) => {

//         setTimeout(() => {
//             for (let i = -15; i < 85; i++) {
//                 const time = day.timestamp + i * 24 * 60 * 60 * 1000;
//                 const strTime = timeToString(time);

//                 if (!items[strTime]) {
//                     items[strTime] = [];

//                     const numItems = Math.floor(Math.random() * 3 + 1);
//                     for (let j = 0; j < numItems; j++) {
//                         items[strTime].push({
//                             name: 'Item for ' + strTime + ' #' + j,
//                             height: Math.max(10, Math.floor(Math.random() * 150)),
//                             day: strTime
//                         });
//                     }
//                 }
//             }
//             const newItems = {};
//             Object.keys(items).forEach(key => {
//                 newItems[key] = items[key];
//             });
//             setItems(newItems);
//         }, 1000);
//     }

//     const renderItem = (item) => {
//         return (
//             <TouchableOpacity style={styles.item}>
//                 <Card>
//                     <Card.Content>
//                         <View>
//                             <Text>{item.name}</Text>
//                         </View>
//                     </Card.Content>
//                 </Card>
//             </TouchableOpacity>
//         );
//     }

//     return (
//         <View style={styles.container}>
//             <Agenda
//                 items={items}
//                 loadItemsForMonth={loadItems}
//                 renderItem={renderItem}
//                 theme={{
//                     selectedDayBackgroundColor:'#651B70',     
//                     dotColor:'#651B70',
//                     agendaTodayColor:'#651B70',
//                     }}
//             />
//         </View>
//     );
// }


// export default EventsScreen;