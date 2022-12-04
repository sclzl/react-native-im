import React, { useState } from 'react';
import { StyleSheet, Text, View, I18nManager, DeviceEventEmitter, Pressable, Image } from 'react-native';

import { FlatList, RectButton, TextInput } from 'react-native-gesture-handler';
import { useNavigation } from "@react-navigation/native"
import AppleStyleSwipeableRow from './Item';
import { Avatar } from "../components";
//  To toggle LTR/RTL change to `true`
I18nManager.allowRTL(false);

type DataRow = {
  isTop?: boolean,
  id: string;
  from: string;
  when: string;
  message: string;
  avatar: string;
};
const Row = ({ item, index, isTop }: { item: DataRow, index: number, isTop?: boolean }) => {
  const router = useNavigation();
  return (

    <Pressable style={[styles.listItem, isTop && { backgroundColor: "#e9e9e9" }]}
      onPress={() => {
        router.navigate('Detail');
      }}
      onTouchStart={() => {
        DeviceEventEmitter.emit("sloseswipe", index);
      }}>
      <Avatar source={{ uri: item.avatar }} size={30} />
      <Text style={styles.fromText}>{item.from}aaaa</Text>
      <Text numberOfLines={2} style={styles.messageText}>
        {item.message}
      </Text>
      <Text style={styles.dateText}>{item.when}a</Text>
    </Pressable>
  );
}

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
      list.unshift({ ...item, isTop: true });
    } else {
      list.push({ ...item, isTop: false });
    }
    setData(list);
  }

  return (
    <View>
      <FlatList
        data={data}
        ListHeaderComponent={<View><TextInput placeholder='搜索' style={{ textAlign: "center" }} /></View>}
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
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flex: 1,
    height: 80,
    paddingVertical: 10,
    paddingHorizontal: 20,
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
    avatar: "https://img0.baidu.com/it/u=1058789211,486981586&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=499",
    message:
      'Unus pro omnibus, omnes pro uno. Nunc scelerisque, massa non lacinia porta, quam odio dapibus enim, nec tincidunt dolor leo non neque',
  },
  {
    id: "1",
    from: 'Aramis',
    when: '11:46 AM',
    avatar: "https://img0.baidu.com/it/u=1058789211,486981586&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=499",
    message:
      'Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Vivamus hendrerit ligula dignissim maximus aliquet. Integer tincidunt, tortor at finibus molestie, ex tellus laoreet libero, lobortis consectetur nisl diam viverra justo.',
  },
  {
    id: "2",
    from: 'Athos',
    when: '6:06 AM',
    avatar: "https://img0.baidu.com/it/u=1058789211,486981586&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=499",
    message:
      'Sed non arcu ullamcorper, eleifend velit eu, tristique metus. Duis id sapien eu orci varius malesuada et ac ipsum. Ut a magna vel urna tristique sagittis et dapibus augue. Vivamus non mauris a turpis auctor sagittis vitae vel ex. Curabitur accumsan quis mauris quis venenatis.',
  },
  {
    id: "3",
    from: 'Porthos',
    when: 'Yesterday',
    avatar: "https://img0.baidu.com/it/u=1058789211,486981586&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=499",
    message:
      'Vivamus id condimentum lorem. Duis semper euismod luctus. Morbi maximus urna ut mi tempus fermentum. Nam eget dui sed ligula rutrum venenatis.',
  },
  {
    id: "4",
    from: 'Domestos',
    when: '2 days ago',
    avatar: "https://img0.baidu.com/it/u=1058789211,486981586&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=499",
    message:
      'Aliquam imperdiet dolor eget aliquet feugiat. Fusce tincidunt mi diam. Pellentesque cursus semper sem. Aliquam ut ullamcorper massa, sed tincidunt eros.',
  },
  {
    id: "5",
    from: 'Cardinal Richelieu',
    when: '2 days ago',
    avatar: "https://img0.baidu.com/it/u=1058789211,486981586&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=499",
    message:
      'Pellentesque id quam ac tortor pellentesque tempor tristique ut nunc. Pellentesque posuere ut massa eget imperdiet. Ut at nisi magna. Ut volutpat tellus ut est viverra, eu egestas ex tincidunt. Cras tellus tellus, fringilla eget massa in, ultricies maximus eros.',
  },
  {
    id: "6",
    from: "D'Artagnan",
    when: 'Week ago',
    avatar: "https://img0.baidu.com/it/u=1058789211,486981586&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=499",
    message:
      'Aliquam non aliquet mi. Proin feugiat nisl maximus arcu imperdiet euismod nec at purus. Vestibulum sed dui eget mauris consequat dignissim.',
  },
  {
    id: "7",
    from: 'Cardinal Richelieu',
    when: '2 weeks ago',
    avatar: "https://img0.baidu.com/it/u=1058789211,486981586&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=499",
    message:
      'Vestibulum ac nisi non augue viverra ullamcorper quis vitae mi. Donec vitae risus aliquam, posuere urna fermentum, fermentum risus. ',
  },
];