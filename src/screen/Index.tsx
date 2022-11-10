import React, { useState } from 'react';
import { StyleSheet, Text, View, I18nManager, DeviceEventEmitter, Pressable } from 'react-native';

import { FlatList, RectButton } from 'react-native-gesture-handler';

import AppleStyleSwipeableRow from './Item';

//  To toggle LTR/RTL change to `true`
I18nManager.allowRTL(false);

type DataRow = {
    isTop?: boolean,
    id: string;
  from: string;
  when: string;
  message: string;
};
const Row = ({ item, index, isTop }: { item: DataRow, index: number, isTop?: boolean }) => (
  <Pressable style={[styles.rectButton, isTop && {backgroundColor: "#e9e9e9"}]} onTouchStart={()=> {
    DeviceEventEmitter.emit("sloseswipe", index);
  }}>
    <Text style={styles.fromText}>{item.from}</Text>
    <Text numberOfLines={2} style={styles.messageText}>
      {item.message}
    </Text>
    <Text style={styles.dateText}>{item.when} ❭</Text>
  </Pressable>
);


export default function Example() {
    const [data, setData] = useState(DATA);

    const onDelete = (index: number) => {
        const list = [...data];
        list.splice(index, 1);
        setData(list);
    }
    const onTotop = (index: number) => {
        const list = [...data];
        const item = list.splice(index, 1)[0];
        if (!item.isTop) {
            list.unshift({...item, isTop: true});
        }else{
            list.push({...item, isTop: false});
        }
        setData(list);
    }

    return (
      <FlatList
        data={data}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
        renderItem={({ item, index }) => (
            <AppleStyleSwipeableRow
            data={item}
            indexId={index} 
            onDelete={onDelete}
            onTotop={onTotop}>
                <Row item={item} isTop={item.isTop} index={index} />
            </AppleStyleSwipeableRow>
        )}
        keyExtractor={(_item, index) => `message ${_item.id}`}
      />
    );
  }

const styles = StyleSheet.create({
  rectButton: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  separator: {
    backgroundColor: 'rgb(200, 199, 204)',
    height: StyleSheet.hairlineWidth,
  },
  fromText: {
    fontWeight: 'bold',
    backgroundColor: 'transparent',
  },
  messageText: {
    color: '#999',
    backgroundColor: 'transparent',
  },
  dateText: {
    backgroundColor: 'transparent',
    position: 'absolute',
    right: 20,
    top: 10,
    color: '#999',
    fontWeight: 'bold',
  },
});

const DATA: DataRow[] = [
  {
    id: "0",
    from: "D'Artagnan",
    when: '3:11 PM',
    message:
      'Unus pro omnibus, omnes pro uno. Nunc scelerisque, massa non lacinia porta, quam odio dapibus enim, nec tincidunt dolor leo non neque',
  },
  {
    id: "1",
    from: 'Aramis',
    when: '11:46 AM',
    message:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus hendrerit ligula dignissim maximus aliquet. Integer tincidunt, tortor at finibus molestie, ex tellus laoreet libero, lobortis consectetur nisl diam viverra justo.',
  },
  {
    id: "2",
    from: 'Athos',
    when: '6:06 AM',
    message:
      'Sed non arcu ullamcorper, eleifend velit eu, tristique metus. Duis id sapien eu orci varius malesuada et ac ipsum. Ut a magna vel urna tristique sagittis et dapibus augue. Vivamus non mauris a turpis auctor sagittis vitae vel ex. Curabitur accumsan quis mauris quis venenatis.',
  },
  {
    id: "3",
    from: 'Porthos',
    when: 'Yesterday',
    message:
      'Vivamus id condimentum lorem. Duis semper euismod luctus. Morbi maximus urna ut mi tempus fermentum. Nam eget dui sed ligula rutrum venenatis.',
  },
  {
    id: "4",
    from: 'Domestos',
    when: '2 days ago',
    message:
      'Aliquam imperdiet dolor eget aliquet feugiat. Fusce tincidunt mi diam. Pellentesque cursus semper sem. Aliquam ut ullamcorper massa, sed tincidunt eros.',
  },
  {
    id: "5",
    from: 'Cardinal Richelieu',
    when: '2 days ago',
    message:
      'Pellentesque id quam ac tortor pellentesque tempor tristique ut nunc. Pellentesque posuere ut massa eget imperdiet. Ut at nisi magna. Ut volutpat tellus ut est viverra, eu egestas ex tincidunt. Cras tellus tellus, fringilla eget massa in, ultricies maximus eros.',
  },
  {
    id: "6",
    from: "D'Artagnan",
    when: 'Week ago',
    message:
      'Aliquam non aliquet mi. Proin feugiat nisl maximus arcu imperdiet euismod nec at purus. Vestibulum sed dui eget mauris consequat dignissim.',
  },
  {
    id: "7",
    from: 'Cardinal Richelieu',
    when: '2 weeks ago',
    message:
      'Vestibulum ac nisi non augue viverra ullamcorper quis vitae mi. Donec vitae risus aliquam, posuere urna fermentum, fermentum risus. ',
  },
];