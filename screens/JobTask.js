import React, {Component, useState}from 'react';
import {Text, View, StyleSheet, SafeAreaView, FlatList, Image, Modal, TextInput, Container} from 'react-native';
import {TouchableOpacity} from 'react-native';
import CheckBox from '@react-native-community/checkbox';

export const JobTask = ()=> {
  const [data, setData] = useState([{id: 1, title: 'Confirm Request', active: false}]);
  const [isModalVisible, setIsModalVisible] = useState(false); 
  const [title, setTitle] = useState();  

    const renderItem = ({item,index}) => {
        return(
            <View style = {styles.taskItem}>
                    <CheckBox
                        disabled={false}
                        value={item.active}
                        onValueChange={(newValue) => setToggleCheckBox(newValue,index)}
                    />
                    <TouchableOpacity style={styles.deletebtnwrapper} onPress={openModal}>
                        <Image style={styles.deleteimg} source={require('../assets/delete.png')} />
                    </TouchableOpacity>
                    <Text style={styles.subtitle}>{item.title}</Text>   
            </View> 
        );
    };

    const openModal = () => {
        setIsModalVisible(true);
    };
    const saveTitle = () => {
        let newArr = [...data];
        newArr.push({id: newArr.length + 1, title: title, active: false});
        setData(newArr);
    }; 
    const setToggleCheckBox=(value,index) =>{
        let newArr = [...data];

        newArr[index].active = !newArr[index].active;
        setData(newArr);
    };
    const loadWelcomePage = () => {

    };

    return (
      <View style={styles.Container}>
          <SafeAreaView style= {styles.contentContainer}>
            <Text style={styles.title}>Task Todo List</Text>
                <FlatList data={data} renderItem={renderItem}/>
                <TouchableOpacity style={styles.addbtnwrapper} onPress={openModal}>
                    <Image style={styles.addimg} source={require('../assets/add.png')} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.donebtnwrapper} onPress={loadWelcomePage} >
                        <Text style={{textAlign: 'center'}}> DONE</Text>
                </TouchableOpacity>
          </SafeAreaView>
             
          <Modal transparent={true} visible={isModalVisible} >    
            <View style={styles.modalContentWrapper}>
                <TouchableOpacity style={styles.closebtnwrapper} onPress={ () => setIsModalVisible(false)}>
                   <Image style={styles.closeimg} source={require('../assets/close.png')} />
                </TouchableOpacity>
                <View style={styles.inputwrapper}>
                    <TextInput style={styles.taskenter} placeholder={'Please enter the Task'} 
                    onChangeText={(text) => setTitle(text)}
                    />
                    <TouchableOpacity style={styles.savebtnwrapper} onPress={saveTitle} >
                        <Text style={{textAlign: 'center'}}> SAVE</Text>
                    </TouchableOpacity>
                </View>
            </View>
          </Modal>     
      </View>
    );
  };

  const styles = StyleSheet.create({
    Container: {
        display: 'flex',
        flex: 1,
    },
    list:{
        backgroundColor: 'red',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 30,
        marginBottom:20,
    },
    contentContainer: {
        display: 'flex',
        flex: 1,
    },
    addimg: {
        width: 50,
        height: 50,
    },
    addbtnwrapper: {
        alignItems: 'flex-end',
        marginRight: 30,
    }, 
    modalContentWrapper: {
        height: '40%',
        marginTop: 'auto',
        backgroundColor: '#428ce3',
        padding: 15,
        borderTopLeftRadius: 70,
    },
    closeimg: {
        width: 25,
        height: 25, 
    },
    closebtnwrapper: {
        alignItems: 'flex-end',   
    }, 
    inputwrapper: {
        marginTop:25,
    },
    donebtnwrapper:{
        backgroundColor: '#428ce3',
        marginTop: 30,
        marginBottom:30,
        padding:10, 
        width: '40%',
        borderRadius: 20, 
        marginRight: 'auto',
        marginLeft: 'auto',
       }, 
    taskenter: {
        padding: 15,
        height: 80,
        backgroundColor: 'white',
        borderRadius: 20,  
        fontSize: 18, 
    },
    savebtnwrapper:{
        backgroundColor: 'white',  
        marginTop: 30,
        padding:10, 
        width: '40%',
        borderRadius: 20, 
        marginRight: 'auto',
        marginLeft: 'auto',
    }, 
    taskItem:{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 10,
        padding: 15,
        backgroundColor: '#b1e8fe',
        borderRadius: 20,
        marginLeft:10,
        marginRight:10,
    },   
    deleteimg: {
        width: 30,
        height: 30, 
    },
    deletebtnwrapper: {
        alignItems: 'flex-end',   
    },    
    subtitle:{
        fontSize:20,
        marginLeft: 15,   
    },
  });

 