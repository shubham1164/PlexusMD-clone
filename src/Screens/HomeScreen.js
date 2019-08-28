/**
 * Created by: Shubham Singla
 * Created on: 27 August
 *
 */

import React, { Component} from "react";
import {Image, StyleSheet, FlatList, TouchableNativeFeedback, StatusBar } from 'react-native';
import {Container, Header, Left, Body, Right, Title, Content, Footer, View, Text, Button, Icon, Separator} from 'native-base';
import FeaturingListItem from '../Components/ListItems/FeaturingListItem';
import VideosListItem from '../Components/ListItems/VideosListItem';
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
      videosDataArray: []
    }
  }

  componentDidMount(){
    // Fetch Data from the server

    // Home Page data
    const homeScreenData = require('../data/HomeScreenData.json');
    this.setState({
      imageUrl: homeScreenData.imageUrl,
      title: homeScreenData.title,
      description: homeScreenData.description,
      videos: homeScreenData.videos,
      views: homeScreenData.views,
      subscribers: homeScreenData.subsribers,
      featuringDataArray: homeScreenData.featuring
    });
    // Videos Data array
    const videos = require('../data/Videos.json');
    this.setState({
      videosDataArray: videos
    })

  }

  _keyExtractorForFeaturing = (item, index) => item.uid;

  _keyExtractorForVideos = (item, index) => item.id;

  _renderItemForFeaturing = function({item}){
    return (
      <FeaturingListItem
        id={item.uid}
        profileImageUrl={item.profileImageUrl}
        name={item.name}
        description={item.description}
       />
    )
  }.bind(this)

  _renderItemHeaderForVideos = function({item}){
    return(
      <View style={styles.videosHeaderView}>
        <Text style={styles.videosHeaderTextView}>ALL VIDEOS</Text>
      </View>
    )
  }.bind(this)

  _renderItemFooterForVideos = function({item}){
    return(
      <View style={styles.footerView}>
        <Icon name="md-star-outline" type="Ionicons" />
        <Text style={styles.footerText}>NO MORE VIDEOS TO SHOW!</Text>
      </View>
    )
  }.bind(this)

  _renderItemSeparatorForVideos = function({item}){
    return(
      <View style={styles.listSeperator}>
      </View>
    )
  }.bind(this)

  _renderItemForVideos = function({item}){
    return (
      <VideosListItem
        id={item.id}
        title={item.title}
        description={item.description}
        thumbUrl={item.thumbUrl}
        views={item.views}
        likes={item.likes}
        comments={item.comments}
        duration={item.duration}
        isBookmarkedFlag={item.isBookmarkedFlag}
        featured={item.featured}
        onPressItemFunc={this.navigateToVideosDetailScreen}
       />
    )
  }.bind(this)

  navigateToVideosDetailScreen = function(id){
    this.props.navigation.navigate('VideosDetailScreen', {
      id: id
    })
  }.bind(this)

  render(){
    return(
      <Container>
        <Header noLeft style={styles.headerView}>
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
                  keyExtractor={this._keyExtractorForFeaturing}
                  renderItem={this._renderItemForFeaturing}
                />
             </View>
           )}

           {/* subscribe & Share */}
           <View style={styles.subscribeAndShareView}>
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

           {/* All Videos */}
           <FlatList
              data={this.state.videosDataArray}
              keyExtractor={this._keyExtractorForVideos}
              ListHeaderComponent={this._renderItemHeaderForVideos}
              ListFooterComponent={this._renderItemFooterForVideos}
              ItemSeparatorComponent={this._renderItemSeparatorForVideos}
              renderItem={this._renderItemForVideos}
            />

        </Content>
      </Container>
    )
  }
}

const styles = StyleSheet.create({
  headerView: {
    backgroundColor: '#e8e8e8'
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
    fontSize: 11,
    color: '#5e9a6e'
  },
  subtitleTextCount: {
    fontWeight: 'bold',
    fontSize: 12,
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
    fontWeight: 'bold'
  },
  featuringList: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  footerView: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20
  },
  footerText: {
    color: '#9a9a9a',
    marginTop: 10,
    fontSize: 16
  },
  listSeperator: {
    backgroundColor: '#e8e8e8',
    width: '100%',
    height: 20
  },
  mainContent: {
    margin: 10
  },
  subscribeAndShareView: {
    flex: 1,
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
  videosHeaderView: {
    paddingTop: 25,
    paddingLeft: 10,
    paddingBottom: 8,
    backgroundColor: '#e8e8e8'
  },
  videosHeaderTextView: {
    fontWeight: 'bold',
    fontSize: 14
  }
})

export default HomeScreen;
