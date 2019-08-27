/**
 * Created by: Shubham Singla
 * Created on: 27 August
 *
 */

import React, { Component} from "react";
import {Image, StyleSheet, FlatList, TouchableNativeFeedback, StatusBar } from 'react-native';
import {Container, Header, Left, Body, Right, Title, Content, Footer, View, Text, Button, Icon} from 'native-base';
import FeaturingListItem from '../Components/ListItems/FeaturingListItem';
import Helper from '../Utils/Helper';


class HomeScreen extends Component{

  constructor(props){
    super(props);
    this.state = {
      imageUrl: undefined,
      title: undefined,
      description: undefined,
      videos: 0,
      views: 0,
      subscribers: 0,
      featuringDataArray: [],
    }
  }

  componentDidMount(){
    // Fetch Data from the server
    const data = require('../data/HomeScreenData.json');
    this.setState({
      imageUrl: data.imageUrl,
      title: data.title,
      description: data.description,
      videos: data.videos,
      views: data.views,
      subscribers: data.subsribers,
      featuringDataArray: data.featuring
    })

  }

  _keyExtractor = (item, index) => item.uid;

  _renderItem = function({item}){
    return (
      <FeaturingListItem
        id={item.uid}
        profileImageUrl={item.profileImageUrl}
        name={item.name}
        description={item.description}
       />
    )
  }.bind(this)

  // <editor-fold desc="Subscribe & Share">

  // </editor-fold>


  render(){
    return(
      <Container>
        <Header noLeft style={{backgroundColor: '#eeeeee'}}>
          <Body><Text style={styles.headerText}>PlexusMD Learning</Text></Body>
          <Right />
        </Header>
        <Content>
          <StatusBar backgroundColor={'#e8e8e8'} />
          <Image
            source={{uri: this.state.imageUrl}}
            style={styles.image} />
           <View style={styles.mainContent}>
            <Text style={styles.title}>{this.state.title}</Text>
            <View style={styles.subtitleView}>
              <Text style={styles.subtitleTextCount}>{Helper.formatCount(this.state.videos)}</Text>
              <Text style={styles.subtitleText}> VIDEOS  </Text>
              <Text style={styles.subtitleTextCount}>{Helper.formatCount(this.state.views)}</Text>
              <Text style={styles.subtitleText}> VIEWS  </Text>
              <Text style={styles.subtitleTextCount}>{Helper.formatCount(this.state.subscribers)}</Text>
              <Text style={styles.subtitleText}> SUBSCRIBERS </Text>
            </View>
            <Text style={styles.description}>{this.state.description}</Text>
           </View>

           {/* Featuring */}
           {this.state.featuringDataArray.length>0 && (
             <View>
               <Text style={styles.featuringText}>FEATURING</Text>
               <FlatList
                  style={styles.featuringList}
                  horizontal={true}
                  data={this.state.featuringDataArray}
                  keyExtractor={this._keyExtractor}
                  renderItem={this._renderItem}
                />
             </View>
           )}

           {/* subscribe & Share */}
           <View style={{flex: 1, flexDirection: 'row'}}>
             <TouchableNativeFeedback>
                <View style={[styles.button, styles.subscribeButton]}>
                 <Text style={styles.subscribeButtonText}>SUBSCRIBE (FREE)</Text>
                 <Icon style={styles.subscribeButtonIcon} name="arrow-right" type="FontAwesome5" />
               </View>
             </TouchableNativeFeedback >
             <TouchableNativeFeedback>
             <View style={[styles.button, styles.shareButton]}>
                 <Text style={styles.shareButtonText}>SHARE</Text>
                 <Icon style={styles.shareButtonIcon} name="share-alt" type="FontAwesome" />
               </View>
             </TouchableNativeFeedback >
           </View>

           {/* Empty Space */}
           <View style={{width: 100, height: 500}}></View>

        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  mainContent: {
    margin: 10
  },
  headerText: {
    color: 'black'
  },
  image: {
    width: '100%',
    height: 180,
    marginBottom: 10
  },
  title: {
    marginTop: 8,
    marginLeft: 8,
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 19,
    color: '#0363c2'
  },
  subtitleView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 8,
    marginTop: 4,
    marginBottom: 4
  },
  subtitleText: {
    fontWeight: 'bold',
    fontSize: 12,
    color: '#5e9a6e'
  },
  subtitleTextCount: {
    fontWeight: 'bold',
    fontSize: 13,
    color: '#5e9a6e'
  },
  description: {
    margin: 8,
    fontSize: 13,
    marginBottom: 20,
  },
  featuringText: {
    color: 'gray',
    marginLeft: 20,
    marginBottom: 5,
    fontSize: 13,
  },
  featuringList: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  subscribeAndShareView: {
    flexDirection: 'row'
  },
  button: {
    flex: 1,
    flexDirection: 'row',
    padding: 18,
    justifyContent: 'center',
    alignItems: 'center'
  },
  subscribeButton: {
    flex: 70,
    backgroundColor: '#db251b'
  },
  subscribeButtonText: {
    color: 'white',
    fontSize: 12
  },
  subscribeButtonIcon: {
    marginLeft: 5,
    fontSize: 15,
    color: 'white'
  },
  shareButton: {
    flex: 30,
    backgroundColor: '#d2d2d2'
  },
  shareButtonText: {
    fontSize: 12,
    color: '#243e3c'
  },
  shareButtonIcon: {
    marginLeft: 5,
    fontSize: 15,
    color: '#243e3c'
  },
})

export default HomeScreen;
