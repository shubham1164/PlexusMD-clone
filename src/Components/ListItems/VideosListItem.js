import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Image, StyleSheet} from 'react-native'
import {View, Text, Icon} from 'native-base';
import FeaturingListItem from './FeaturingListItem';
import Helper from '../../Utils/Helper';

export default class VideosListItem extends PureComponent{

  render(){
    return(
      <View style={{flexDirection: 'column', height: 144}}>
        <View style={{flexDirection :'row', width: '100%', height: 90}}>
          <Image
          source={{uri: this.props.thumbUrl}}
          style={{width: null, height: '100%', flex: 40}} />
          <View style={{flexDirection: 'column', flex: 60}}>
            <Text style={{fontSize: 14, marginTop: 8, marginLeft: 8, marginRight: 8, marginBottom: 4, color: '#0b5202'}}>{this.props.title}</Text>
            <Text numberOfLines={1} style={{fontSize: 12, marginLeft: 8, marginRight: 8, color: '#313131'}}>{this.props.description}</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', position: 'absolute', bottom: 0, left: 0, margin: 8}}>
              <Icon style={{fontSize: 13, marginRight: 5, color: '#9a9a9a'}} name="star" type="AntDesign" />
              <Text style={{fontSize: 13, marginRight: 10, color: '#9a9a9a'}}>BOOKMARK</Text>
              <Text style={{fontSize: 13, color: '#9a9a9a'}}>{Helper.formatCount(this.props.likes)}</Text>
              <Icon style={{fontSize: 13, marginRight: 5, color: '#9a9a9a'}} name="like1" type="AntDesign" />
              <Text style={{fontSize: 13, color: '#9a9a9a'}}>{Helper.formatCount(this.props.comments)}</Text>
              <Icon style={{fontSize: 13, color: '#9a9a9a'}} name="comments-o" type="FontAwesome" />
            </View>
          </View>
        </View>
        {/* Featured*/}
        <View style={{backgroundColor: '#ebf5ff', width: '100%', padding: 2}}>
          <FeaturingListItem id={this.props.featured.uid} profileImageUrl={this.props.featured.profileImageUrl} name={this.props.featured.name} description={this.props.featured.description}/>
        </View>
      </View>
    )
  }

}

const styles = StyleSheet.create({

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
  featured: PropTypes.object
};
