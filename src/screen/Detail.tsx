import { Button, ScrollView, Text, TouchableOpacity } from "react-native"
const Detail = ({navigation}: any) => {
    return (
        <ScrollView>
            <Button
                title="Go to Index"
                onPress={() => navigation.goBack()}
            />
        </ScrollView>
    )
}
export default Detail