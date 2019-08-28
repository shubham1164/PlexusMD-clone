/**
 * Created by: Shubham Singla
 * Created on: 28 August
 *
 */

import React, { Component} from "react";
import {Image, StyleSheet, FlatList, TouchableNativeFeedback, StatusBar } from 'react-native';
import {Container, Header, Left, Body, Right, Title, Content, View, Text, Button, Icon, Separator, Footer, FooterTab} from 'native-base';
import FeaturingListItem from '../Components/ListItems/FeaturingListItem';
import Video from 'react-native-video';
import Helper from '../Utils/Helper';

class VideosDetailScreen extends Component{

  constructor(props){
    super(props);
    this.nav = {
      id: this.props.navigation.getParam('id', 0),
    }
    this.state = {
      title: undefined,
      description: undefined,
      videoUrl: undefined,
      views: 0,
      likes: 0,
      comments: 0,
      shares: 0,
      featuredUid: undefined,
      featuredProfileImageUrl: undefined,
      featuredName: undefined,
      featuredDescription: undefined
    }
  }

  componentDidMount(){
    // Fetch Data from the server corresponding to the Id

    // Videos Data array
    const videos = require('../data/Videos.json');
    const videoDetails = videos.filter(obj => obj.id == this.nav.id);
    if (videoDetails.length == 1){
      var data = videoDetails[0];
      this.setState({
        title: data.title,
        description: data.description,
        videoUrl: data.videoUrl,
        views: data.views,
        likes: data.likes,
        comments: data.comments,
        shares: data.shares,
        featuredUid: data.featured.uid,
        featuredProfileImageUrl: data.featured.profileImageUrl,
        featuredName: data.featured.name,
        featuredDescription: data.featured.description
      })
    }

  }

  render(){
    return(
      <Container>
        <Header noRight style={styles.headerView}>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="arrow-back" style={{color: 'black'}} />
            </Button>
          </Left>
          <Body>
            <Text numberOfLine={1} style={styles.headerText}>{this.state.title}</Text>
          </Body>
        </Header>
        <Content contentContainerStyle={{backgroundColor: '#e8e8e8'}}>
          <StatusBar backgroundColor={'#e8e8e8'} />
          <Video
            ref={(ref) => {
             this.player = ref
           }}
           source={{uri: this.state.videoUrl}}
           style={styles.videoView}
           fullscreen={false}
           controls={true}
           fullscreenOrientation={'portrait'}
          />
          <View style={styles.mainContent}>
           <Text style={styles.title}>{this.state.title}</Text>
           <View style={styles.subtitleView}>
             <Text style={styles.subtitleTextCount}>{Helper.formatCount(this.state.views)}</Text>
             <Text style={styles.subtitleText}> VIEWS   </Text>
             <Text style={styles.subtitleTextCount}>{Helper.formatCount(this.state.likes)}</Text>
             <Text style={styles.subtitleText}> LIKES   </Text>
             <Text style={styles.subtitleTextCount}>{Helper.formatCount(this.state.comments)}</Text>
             <Text style={styles.subtitleText}> COMMENTS   </Text>
             <Text style={styles.subtitleTextCount}>{Helper.formatCount(this.state.shares)}</Text>
             <Text style={styles.subtitleText}> SHARES </Text>
           </View>
           <Text style={styles.description}>{this.state.description}</Text>
          </View>

          {/* Featuring */}
          {this.state.featuredUid != undefined && (
            <View style={{backgroundColor: 'white'}}>
              <Text style={styles.featuringText}>FEATURING</Text>
              <View style={styles.featuringView}>
                <FeaturingListItem
                  id={this.state.featuredUid}
                  profileImageUrl={this.state.featuredProfileImageUrl}
                  name={this.state.featuredProfileImageUrl}
                  description={this.state.featuredDescription}
                 />
               </View>
             </View>
          )}

          {/* Subscribe View */}
          <View style={styles.subscribeView}>
            <View style={{flex: 1}}>
              <Text style={styles.subscribeViewTitle}>This video is a part of</Text>
              <Text style={styles.subscribeViewSubtitle}>PlexusMD Learning</Text>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center'}}>
              <TouchableNativeFeedback onPress={() => {}}>
                <View style={styles.subscribeViewButton}>
                  <Text style={styles.subscribeViewButtonText}>SUBSCRIBE</Text>
                </View>
              </TouchableNativeFeedback>
            </View>
          </View>

          {/* Like, Bookmark, Share */}
          <View style={styles.likeCommentShareView}>
            <View style={styles.likeCommentShareViewButton}>
              <Icon style={styles.likeCommentShareViewButtonIcon} name="like2" type="AntDesign"  />
              <Text style={styles.likeCommentShareViewButtonText}>LIKE</Text>
            </View>
            <View style={styles.likeCommentShareViewButton}>
              <Icon style={styles.likeCommentShareViewButtonIcon} name="md-star-outline" type="Ionicons"  />
              <Text style={styles.likeCommentShareViewButtonText}>BOOKMARK</Text>
            </View>
            <View style={styles.likeCommentShareViewButton}>
              <Icon style={styles.likeCommentShareViewButtonIcon} name="share-alt" type="FontAwesome" />
              <Text style={styles.likeCommentShareViewButtonText}>SHARE</Text>
            </View>
          </View>

          {/* Empty space */}
          <View style={{width: 10, height: 500}}></View>

        </Content>
        <Footer>
          <FooterTab>
            <Button>
              <View style={styles.footerButton}>
                <Icon style={styles.footerButtonIcon} name="plus" type="Entypo"  />
                <Text style={styles.footerButtonText}>ADD A COMMENT</Text>
              </View>
            </Button>
          </FooterTab>
        </Footer>
      </Container>
    )
  }

}

const styles = StyleSheet.create({
  videoView: {
    width: '100%',
    height: 180,
    paddingBottom: 10,
    backgroundColor: 'black'
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
  featuringView: {
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  },
  headerView: {
    backgroundColor: '#e8e8e8'
  },
  headerText: {
    color: 'black'
  },
  likeCommentShareView: {padding: 15, borderTopWidth: 0.5, borderTopColor: 'black', borderBottomWidth: 0.5, borderBottomColor: 'black', flexDirection: 'row', marginTop: 1, flex: 1, backgroundColor: 'white'},
  likeCommentShareViewButton: {flexDirection: 'row', justifyContent: 'center', alignItems: 'center', flex: 1},
  likeCommentShareViewButtonText: {fontSize: 12, fontWeight: 'bold'},
  likeCommentShareViewButtonIcon: {paddingRight: 4, fontSize: 12},
  footerButton: {flexDirection: 'row', alignItems: 'center', justifyContent: 'center'},
  footerButtonText: {color: 'white', fontSize: 12, opacity: 0.8},
  footerButtonIcon: {color: 'white', paddingRight: 5, fontSize: 12, opacity: 0.8},
  mainContent: {
    backgroundColor: 'white',
    padding: 10
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
  subscribeView: {padding: 15, borderTopWidth: 0.5, borderTopColor: 'black', borderBottomWidth: 0.5, borderBottomColor: 'black', flexDirection: 'row', backgroundColor: 'white'},
  subscribeViewTitle: {color: 'gray', fontSize: 11, fontWeight: 'bold', marginBottom: 5},
  subscribeViewSubtitle: {color: 'gray', fontSize: 15, fontWeight: 'bold', color: '#0363c2'},
  subscribeViewButton: {width: 80, padding: 5, backgroundColor: '#ba2811', borderRadius: 5, justifyContent: 'center', alignItems: 'center'},
  subscribeViewButtonText: {color: 'white', fontSize: 12},
  title: {
    marginTop: 8,
    marginLeft: 8,
    marginBottom: 4,
    fontWeight: 'bold',
    fontSize: 19,
    color: '#0363c2'
  },
})

export default VideosDetailScreen
