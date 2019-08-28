import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import {View, Text, Icon} from 'native-base';
import FeaturingListItem from './FeaturingListItem';
import Helper from '../../Utils/Helper';

export default class VideosListItem extends PureComponent{

  onPress = function(){
    if (this.props.onPressItemFunc){
      this.props.onPressItemFunc(this.props.id);
    }
  }.bind(this)

  render(){
    return(
      <TouchableWithoutFeedback onPress={this.onPress} >
      <View style={styles.container}>
        <View style={styles.content}>
          <Image
          source={{uri: this.props.thumbUrl}}
          style={styles.image} />
          <View style={styles.upperView}>
            <Text style={styles.title}>{this.props.title}</Text>
            <Text numberOfLines={1} style={styles.description}>{this.props.description}</Text>
            <View style={styles.upperDetailsView}>
              <Icon style={styles.bookmarkIcon} name="star" type="AntDesign" />
              <Text style={styles.bookmarkText}>BOOKMARK</Text>
              <Text style={styles.likesCount}>{Helper.formatCount(this.props.likes)}</Text>
              <Icon style={styles.likesIcon} name="like1" type="AntDesign" />
              <Text style={styles.commentsText}>{Helper.formatCount(this.props.comments)}</Text>
              <Icon style={styles.commentsIcon} name="comments-o" type="FontAwesome" />
            </View>
          </View>
        </View>
        {/* Featured*/}
        <View style={styles.featuredView}>
          <FeaturingListItem id={this.props.featured.uid} profileImageUrl={this.props.featured.profileImageUrl} name={this.props.featured.name} description={this.props.featured.description}/>
        </View>
      </View>
      </TouchableWithoutFeedback>
    )
  }

}

const styles = StyleSheet.create({
  bookmarkText: {fontSize: 13, marginRight: 10, color: '#9a9a9a'},
  bookmarkIcon: {fontSize: 13, marginRight: 5, color: '#9a9a9a'},
  commentsText: {fontSize: 13, color: '#9a9a9a'},
  commentsIcon: {fontSize: 13, color: '#9a9a9a'},
  container: {
    flexDirection: 'column',
    height: 144
  },
  content: {
    flexDirection :'row',
    width: '100%',
    height: 90
  },
  description: {
    fontSize: 12,
    marginLeft: 8,
    marginRight: 8,
    color: '#313131'
  },
  featuredView: {backgroundColor: '#ebf5ff', width: '100%', padding: 2},
  image: {
    width: null,
    height: '100%',
    flex: 40
  },
  likesCount: {fontSize: 13, color: '#9a9a9a'},
  likesIcon: {fontSize: 13, marginRight: 5, color: '#9a9a9a'},
  upperDetailsView: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    margin: 8
  },
  upperView: {
    flexDirection: 'column',
    flex: 60
  },
  title: {
    fontSize: 14,
    marginTop: 8,
    marginLeft: 8,
    marginRight: 8,
    marginBottom: 4,
    color: '#0b5202'
  }
})

VideosListItem.propTypes = {
  id: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  thumbUrl: PropTypes.string,
  views: PropTypes.number,
  likes: PropTypes.number,
  comments: PropTypes.number,
  duration: PropTypes.string,
  isBookmarkedFlag: PropTypes.string,
  featured: PropTypes.object,
  onPressItemFunc: PropTypes.func.isRequired
};
