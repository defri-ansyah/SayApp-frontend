<template>
  <div class="container-fluid d-flex position-relative">
    <!-- Left Side -->
    <section class="left-side d-flex flex-column position-relative">
      <!-- Menu After Click -->
      <div class="menu position-absolute flex-column justify-content-between" :class="activeMenu === 1 ? 'd-flex':'d-none'">
        <div class="menu-select d-flex justify-content-between" @click="activateProfile">
          <h2 class=" align-self-center">Settings</h2>
          <img src="../../src/assets/settings.svg" alt="setting">
        </div>
        <div class="menu-select d-flex justify-content-between">
          <h2 class=" align-self-center">Contacts</h2>
          <img src="../../src/assets/contacts.svg" alt="setting">
        </div>
        <div class="menu-select d-flex justify-content-between">
          <h2 class=" align-self-center">Calls</h2>
          <img src="../../src/assets/phone.svg" alt="setting">
        </div>
        <div class="menu-select d-flex justify-content-between">
          <h2 class=" align-self-center">Saved Messages</h2>
          <img src="../../src/assets/saved.svg" alt="setting">
        </div>
        <div class="menu-select d-flex justify-content-between">
          <h2 class=" align-self-center">Invite Friends</h2>
          <img src="../../src/assets/invite.svg" alt="setting">
        </div>
        <div class="menu-select d-flex justify-content-between">
          <h2 class=" align-self-center">SayApp FAQ</h2>
          <img src="../../src/assets/faq.svg" alt="setting">
        </div>
      </div>
      <!-- Title Telegram -->
      <div class="wrap-title d-flex w-100 justify-content-between">
        <h1 class="title" @click="activateProfile">SayApp</h1>
        <!-- Menu -->
        <img src="../../src/assets/menu.svg" alt="menu" @click="activateMenu">
      </div>
      <!-- Search User -->
      <div class="wrap-search d-flex justify-content-between">
        <div class="search d-flex">
          <img src="../../src/assets/search.svg" alt="search" @click="handleSearch">
          <input type="text" placeholder="Type your message..." v-model="search" @keypress.enter="handleSearch">
        </div>
        <img src="../../src/assets/plus.svg" alt="plus">
      </div>
      <!-- All, Important, Unread -->
      <div class="wrap-tab d-flex justify-content-between align-items-center">
        <!-- All -->
        <input @change="handleTab" v-model="tab" type="radio" id="all" name="tab" value="all">
        <label :class="tab === 'all' ? 'tab-active': 'tab-inactive'" for="all">All</label><br>
        <!-- Important -->
        <input @change="handleTab" v-model="tab" type="radio" id="important" name="tab" value="important">
        <label :class="tab === 'important' ? 'tab-active': 'tab-inactive'" for="important">Important</label><br>
        <!-- Unread -->
        <input @change="handleTab" v-model="tab" type="radio" id="unread" name="tab" value="unread">
        <label :class="tab === 'unread' ? 'tab-active': 'tab-inactive'" for="unread">Unread</label>
      </div>
      <!-- Chat List (All Chat) -->
      <div class="wrap-chat w-100 d-flex flex-column ">
        <!-- Per Person -->
        <div class="chat-person w-100 d-flex" v-for="(item, index) in alluser" :key="index" @click="handleChatList(item)">
          <!-- Image -->
          <div class="wrap-img">
            <img :src="item.image === '' ? require(`../../src/assets/default.svg`) : item.image" alt="profile">
          </div>
          <!-- Name and Last Message -->
          <div class="wrap-name-message d-flex flex-column justify-content-between ">
            <div class="name">{{item.room_name}}</div>
            <div class="last-message" v-if="item.last_chat !== null">{{item.last_chat.chat}}</div>
          </div>
          <!-- Time and Count message -->
          <div class="wrap-time-count d-flex flex-column justify-content-between flex-grow-1 align-items-end">
            <!-- Time -->
            <div class="time" v-if="item.last_chat !== null">{{item.last_chat.time}}</div>
            <!-- Count Message Unread -->
            <div class="count d-flex justify-content-center align-items-center" v-if="item.count !== undefined">{{item.count}}</div>
            <!-- Icon Send
            <img src="../../src/assets/send.svg" alt="unread">
            Icon Unread
            <img src="../../src/assets/unread.svg" alt="unread">
            Icon Read
            <img src="../../src/assets/read.svg" alt="read"> -->
          </div>
        </div>
        <!-- End Per Person -->
      </div>
    </section>

    <!-- Right Side -->
    <section class="right-side flex-grow-1 position-relative">
      <!-- Unselected Chat -->
      <div v-if="this.selected === 0" class="not-select d-flex justify-content-center align-items-center h-100">Please select a chat to start messaging</div>
      <!-- Menu Chat -->
      <!-- <div class="menu-profile position-absolute"></div> -->
      <!-- Selected Chat -->
      <div v-if="this.selected === 1" class="room-chat h-100 d-flex flex-column">
        <!-- Header -->
        <div class="header-chat d-flex" @click="activateProfileFriend">
          <!-- Photo Profile -->
          <div class="wrap-img">
            <!-- <img src="../../assets/default.svg" alt="photo"> -->
            <img :src="this.imgF === '' ? require(`../../src/assets/default.svg`) : this.imgF" alt="photo">
          </div>
          <!-- Name and status -->
          <div class="wrap-name-status d-flex flex-column justify-content-between ">
            <div class="name">{{nameF}}</div>
            <div class="status" v-if="roomType === 'private'">{{statusF}}</div>
          </div>
          <!-- Icon Menu -->
          <div class="wrap-menu d-flex flex-grow-1 justify-content-end align-items-center">
            <img src="../../src/assets/profile-menu.svg" alt="menu">
          </div>
        </div>
        <!-- Body -->
        <div class="body-chat " id='messageBody'>
          <!-- All Messages -->
          <div v-for="msg in allmessages" :key="msg.id">

            <!-- If Receiver -->
            <div v-if="msg.from_user_id !== user.id">
              <!-- Receiver -->
              <div class="receiver w-100 d-flex">
                <!-- Image -->
                <div class="wrap-img-chat d-flex align-items-end">
                  <div class="img-chat">
                    <img src="../../src/assets/default.svg" alt="" v-if="msg.user.image === ''">
                    <img :src="msg.user.image" alt="">
                  </div>
                </div>
                <!-- Receiver Message -->
                <div class="receiver-message" >
                  {{msg.chat}}
                </div>
              </div>
            </div>

            <!-- Else Sender -->
            <div v-if="msg.from_user_id === user.id">
              <!-- Sender -->
              <div class="sender w-100 d-flex justify-content-end">
                <!-- Sender Message -->
                <div class="sender-message" >
                  {{msg.chat}}
                </div>
                <!-- Image -->
                <div class="wrap-img-chat">
                  <div class="img-chat">
                    <img src="../../src/assets/default.svg" alt="" v-if="msg.user.image === ''">
                    <img :src="msg.user.image" alt="">
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
        <!-- Box Send Chat -->
        <div class="wrap-send-chat">
          <!-- Input Messages -->
          <div class="wrap-input w-100 h-100 d-flex align-items-center">
            <input type="text" placeholder="Type your message..." v-model="chat" @keyup.enter="handleChat">
            <img src="../../src/assets/plus.svg" alt="plus">
            <img src="../../src/assets/emoji.svg" alt="emoji">
            <img src="../../src/assets/image.svg" alt="image">
          </div>
        </div>
      </div>
    </section>

    <!-- My Profile -->
    <section class=" position-absolute d-flex flex-column" :class="activeProfile === 1 ? 'profile-active':'profile-inactive'">
      <!-- My Username and icon Back -->
      <div class="wrap-username d-flex w-100 justify-content-center position-relative" @click="activateProfile">
        <img src="../../src/assets/back.svg" alt="back" class=" position-absolute">
        <div class="username">{{username}}</div>
      </div>
      <!-- My Photo Profile -->
      <div class="container-photo d-flex justify-content-center">
        <label for="image">
        <div class="wrap-profile">
          <img :src="img === '' ? require(`../../src/assets/default.svg`) : this.img" alt="photo">
        </div>
        </label>
        <input type="file" @change="updateImage" class="d-none" id="image" multiple>
      </div>
      <!-- My Name and Username -->
      <div class="wrap-name align-self-center">
        <input type="text" class="my-name-edit w-100" v-model="name" v-if="editName === 1" @keyup.enter="saveName">
        <input type="text" class="my-name w-100" v-model="name" v-if="editName === 0" disabled>
        <div class="edit-name" @click="activateName" v-if="editName === 0">Edit Name</div>
        <div class="edit-name" @click="saveName" v-if="editName === 1">Save Name</div>
        <div class="my-username">{{username}}</div>
      </div>
      <!-- My Phone Number -->
      <div class="wrap-my-phone">
        <div class="account">Account</div>
        <input type="text" class="my-phone-edit w-100" v-model="phone" v-if="editPhone === 1" @keyup.enter="savePhone">
        <input type="text" class="my-phone w-100" v-model="phone" v-if="editPhone === 0" disabled>
        <div class="tap-to" @click="activatePhone" v-if="editPhone === 0">Tap to change phone number</div>
        <div class="tap-to" @click="savePhone" v-if="editPhone === 1">Enter to save phone number</div>
      </div>
      <!-- My Username -->
      <div class="wrap-my-username w-100">
        <!-- <div class="input-my-username">@wdlam</div> -->
        <input type="text" class="input-my-username w-100" v-model="username" v-if="editUsername === 1" @keyup.enter="saveUsername">
        <input type="text" class="save-my-username w-100" v-model="username" v-if="editUsername === 0" disabled>
        <div class="username">Username</div>
        <div class="tap-to" @click="activateUsername" v-if="editUsername === 0">Tap to change username</div>
        <div class="tap-to" @click="saveUsername" v-if="editUsername === 1">Enter to save username</div>
      </div>
      <!-- My Bio -->
      <div class="wrap-bio">
        <div class="container-bio">
          <textarea class="activeBio" name="bio" id="bio" v-model="bio" v-if="editBio === 1"></textarea>
          <textarea class="inactiveBio" name="bio" id="bio" v-model="bio" v-if="editBio === 0" disabled></textarea>
        </div>
        <div class="bio">Bio</div>
        <div class="tap-to" @click="activateBio" v-if="editBio === 0">Tap to change bio</div>
        <div class="tap-to" @click="saveBio" v-if="editBio === 1">Enter to save bio</div>
      </div>
      <!-- My Location -->
      <div class="wrap-location">
        <div class="title-location">Location</div>
        <!-- <div class="location w-100"></div> -->
        <GmapMap id="googleMap" map-type-id="roadmap" :zoom="12" :center="{lat:location.lat, lng:location.lng}" style="width: 300px; height: 300px">
          <GmapMarker :clickable="true" :position="{lat:location.lat, lng:location.lng}" />
        </GmapMap>
      </div>
    </section>

    <!-- Profile Friends -->
    <section class="position-absolute d-flex flex-column" :class="activeProfileFriend === 1 ? 'profile-f-active':'profile-f-inactive'">
      <!-- Username Friend -->
      <div class="wrap-username-f d-flex w-100 justify-content-center position-relative" @click="activateProfileFriend">
        <img src="../../src/assets/back.svg" alt="back" class=" position-absolute">
        <div class="username-f">{{usernameF}}</div>
      </div>
      <!-- Photo Profile Friend -->
      <div class="container-profile-f d-flex justify-content-center">
        <div class="wrap-profile-f align-self-center">
          <!-- <img src="../../assets/calvin-flores.png" alt="profile"> -->
          <img :src="this.imgF === '' ? require(`../../src/assets/default.svg`) : this.imgF" alt="profile">
        </div>
      </div>
      <!-- Name Friend -->
      <div class="wrap-name-f w-100 d-flex justify-content-between align-items-center">
        <div class="name-status-f">
          <div class="name-f">{{nameF}}</div>
          <div class="status-f" v-if="roomType === 'private'">{{statusF}}</div>
        </div>
        <img src="../../src/assets/chat.svg" alt="chat" @click="activateProfileFriend">
      </div>
      <!-- Phone Number -->
      <div class="wrap-phone-f" v-if="roomType === 'private'">
        <div class="text-phone">Phone number</div>
        <div class="phone-number">{{phoneF}}</div>
      </div>
      <!-- Misc/Document Tab -->
      <div class="wrap-doc d-flex w-100 justify-content-between align-items-center ">
        <input @change="handleTabF" v-model="tabF" type="radio" id="location" name="tabF" value="location">
        <label :class="tabF === 'location' ? 'tab-active-f': 'tab-inactive-f'" for="location" v-if="roomType === 'private'">Location</label>
        <label :class="tabF === 'location' ? 'tab-active-f': 'tab-inactive-f'" for="location" v-if="roomType === 'group'">List Member</label>
        <input @change="handleTabF" v-model="tabF" type="radio" id="images" name="tabF" value="images">
        <label :class="tabF === 'images' ? 'tab-active-f': 'tab-inactive-f'" for="images">Images</label>
        <input @change="handleTabF" v-model="tabF" type="radio" id="document" name="tabF" value="document">
        <label :class="tabF === 'document' ? 'tab-active-f': 'tab-inactive-f'" for="document">Document</label>
        <!-- <div class="tab-active-f">Location</div>
        <div class="tab-inactive-f">Images</div>
        <div class="tab-inactive-f">Document</div> -->
      </div>
      <!-- Tab Location Friend-->
      <div  v-if="roomType === 'private'">
      <div class="wrap-location" v-if="tabF === 'location'">
        <!-- <div class="location w-100"></div> -->
         <GmapMap id="googleMap" map-type-id="roadmap" :zoom="12" :center="{lat:latF, lng:lngF}" style="width: 300px; height: 300px">
          <GmapMarker :clickable="true" :position="{lat:latF, lng:lngF}" />
        </GmapMap>
      </div>
      </div>
      <div v-if="roomType === 'group' && tabF === 'location'">
        <div v-for="member in listMember" :key="member.user_id" class="member-list">{{member.user.full_name}}</div>
      </div>
    </section>
  </div>
</template>

<script>

import io from 'socket.io-client'
import axios from 'axios'
import Swal from 'sweetalert2'

export default {
  name: 'Room',
  data () {
    return {
      location: {
        lat: 0,
        lng: 0
      },
      statusF: 'offline',
      latF: 0,
      lngF: 0,
      socket: io('http://localhost:4040'),
      search: '',
      tab: 'important',
      tabF: 'location',
      roomType: '',
      user: JSON.parse(localStorage.getItem('user')),
      alluser: [],
      allmessages: [],
      id: 4,
      img: 'mother.png',
      phone: '+375(29)9638433',
      name: 'Gloria Mckinney',
      username: '@wdlam',
      bio: 'I’m Senior Frontend Developer from Microsoft',
      usernameF: '',
      phoneF: '',
      nameF: '',
      imgF: '',
      idF: 0,
      selected: 0,
      chat: '',
      editName: 0,
      editPhone: 0,
      editUsername: 0,
      editBio: 0,
      activeMenu: 0,
      activeProfileFriend: 0,
      activeProfile: 0
    }
  },
  methods: {
    handleSearch () {
      const search = this.search
      console.log('handleSearch ' + search)
      this.search = ''
    },
    handleTab () {
      if (this.tab === 'all') {
        console.log(this.tab)
      } else if (this.tab === 'important') {
        console.log(this.tab)
      } else if (this.tab === 'unread') {
        console.log(this.tab)
      }
    },
    handleTabF () {
      if (this.tabF === 'location') {
        console.log(this.tabF)
      } else if (this.tabF === 'images') {
        console.log(this.tabF)
      } else if (this.tabF === 'document') {
        console.log(this.tabF)
      }
    },
    handleChatList (item) {
      this.getRoomChat(item.id)
      this.selected = 1
      this.imgF = item.image
      this.usernameF = item.username
      this.nameF = item.room_name
      this.roomType = item.room_type
      this.listMember = item.members
      if (item.other_user !== undefined) {
        this.statusF = item.other_user.status
        this.phoneF = item.other_user.phone_number
        this.latF = item.other_user.latitude
        this.lngF = item.other_user.longitude
      }
      this.idF = item.id
      this.$store.commit('SET_RECEIVER', item.id)
      this.$store.commit('SET_IMG_FRIEND', item.image)
      const newAllUser = this.alluser.map((room) => {
        if (room.id === item.id) {
          const messageBody = document.querySelector('#messageBody')
          messageBody.scrollTop = messageBody.scrollHeight - messageBody.clientHeight
          room = {
            ...room,
            count: undefined
          }
          return room
        } else {
          return room
        }
      })
      this.alluser = newAllUser
    },
    handleChat (e) {
      console.log(this.idF)
      const chatting = {
        chat: e.target.value,
        room_id: this.idF,
        from_user_id: this.user.id
      }
      this.socket.emit('reciverMessage', chatting)
      this.getRoomChat(this.idF)
      this.getRoomList()
      this.chat = ''
    },
    activateName () {
      if (this.editName === 0) {
        this.editName = 1
      }
    },
    saveName () {
      if (this.editName > 0) {
        this.editName = 0
        this.editProfile()
        console.log(this.name)
      }
    },
    activatePhone () {
      if (this.editPhone === 0) {
        this.editPhone = 1
      }
    },
    savePhone () {
      if (this.editPhone > 0) {
        this.editPhone = 0
        this.editProfile()
        console.log(this.phone)
      }
    },
    activateUsername () {
      if (this.editUsername === 0) {
        this.editUsername = 1
      }
    },
    saveUsername () {
      if (this.editUsername > 0) {
        this.editUsername = 0
        this.editProfile()
        console.log(this.username)
      }
    },
    activateBio () {
      if (this.editBio === 0) {
        this.editBio = 1
      }
    },
    saveBio () {
      if (this.editBio > 0) {
        this.editBio = 0
        this.editProfile()
        console.log(this.bio)
      }
    },
    activateMenu () {
      if (this.activeMenu === 0) {
        this.activeMenu = 1
      } else if (this.activeMenu > 0) {
        this.activeMenu = 0
      }
    },
    activateProfileFriend () {
      if (this.activeProfileFriend === 0) {
        this.activeProfileFriend++
      } else if (this.activeProfileFriend > 0) {
        this.activeProfileFriend--
      }
    },
    activateProfile () {
      if (this.activeProfile === 0) {
        this.activeProfile++
      } else if (this.activeProfile > 0) {
        this.activeProfile--
      }
    },
    getDetailUser () {
      const token = this.user.token
      axios.get('http://localhost:5000/api/user/detail', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          const userInfo = res.data.data
          this.id = userInfo.id
          this.img = userInfo.image
          this.phone = userInfo.phone_number
          this.name = userInfo.full_name
          this.username = userInfo.username
          this.bio = userInfo.bio
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getRoomList () {
      const token = this.user.token
      return axios.get('http://localhost:5000/api/room/list', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          this.alluser = res.data.data
        })
        .catch((err) => {
          console.log(err)
        })
    },
    getRoomChat (roomId) {
      const token = this.user.token
      axios.get('http://localhost:5000/api/room/detail/' + roomId, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          this.allmessages = res.data.data
          console.log(this.allmessages)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    handleMap (coordinates) {
      const token = this.user.token
      axios.patch('http://localhost:5000/api/user/update-map', {
        latitude: coordinates.lat,
        longitude: coordinates.lng
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log('success handle map')
          // this.allmessages = res.data.data
          // console.log(this.allmessages)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    editProfile () {
      const token = this.user.token
      axios.patch('http://localhost:5000/api/user/edit-profile', {
        full_name: this.name,
        phone_number: this.phone,
        username: this.username,
        bio: this.bio
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log('success update profile')
          // this.allmessages = res.data.data
          // console.log(this.allmessages)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    updateImage (e) {
      const token = this.user.token
      const data = new FormData()
      data.append('image', e.target.files[0])
      axios.patch('http://localhost:5000/api/user/update-image', data, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
        .then((res) => {
          console.log('success update photo')
          this.img = res.data.data.image
          Swal.fire('Success..', 'Photo has been updated', 'success')
          // this.allmessages = res.data.data
          // console.log(this.allmessages)
        })
        .catch((err) => {
          console.log(err)
          Swal.fire('Sorry..', 'Something went wrong!', 'error')
        })
    }
  },
  created () {
    this.getRoomList()
    this.getDetailUser()
  },
  mounted () {
    this.getRoomList()
    this.$getLocation().then(coordinates => {
      this.location.lat = coordinates.lat
      this.location.lng = coordinates.lng
      this.handleMap(coordinates)
      console.log(coordinates)
    })
    this.socket.on('refresh user status', () => {
      console.log('refresh user status: ', this.idF)
    })
    if (this.selected === 1) {
      this.alluser.map((room) => {
        if (room.id === this.idF) {
          console.log('ini ini: ', this.idF)
          this.handleChatList(room)
        }
      })
    }
    this.socket.emit('userOnline', { userId: this.user.id })
    this.socket.on('refresh feed', (chatting) => {
      this.getRoomList().then(() => {
        if (chatting.room_id === this.idF) {
          this.getRoomChat(chatting.room_id)
        } else {
          const newAllUser = this.alluser.map((room) => {
            if (room.id === chatting.room_id) {
              this.$toast.open({
                message: 'New Message from ' + room.room_name,
                type: 'info',
                duration: 3000
              // all of other options may go here
              })
              room = {
                ...room,
                count: (room.count || 0) + 1
              }
              return room
            }
            return room
          })
          console.log(newAllUser)
          this.alluser = newAllUser
        }
      })
    })
    // this.allmessages.push(chatting)
  }
}
</script>

<style lang="scss" scoped>

input[type=radio] {
  display: none;
}

.container-fluid {
  height: 100vh;
  padding: 0;
  overflow: hidden;
}

// Left Side

/* width */
::-webkit-scrollbar {
  width: 5px;
  transition: .3s;
}

/* Track */
::-webkit-scrollbar-track {
  background: rgb(255, 255, 255);
  transition: .3s;
}

/* Handle */
::-webkit-scrollbar-thumb {
  background: rgba(126, 152, 223, 0.3);
  transition: .3s;
}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  background: rgba(126, 152, 223, 0.5);
  transition: .3s;
}

.wrap-title,
.wrap-search,
.wrap-tab {
  padding: 0 30px;
}

.left-side {
  width: 350px;
  height: 100vh;
  padding: 40px 0 0 0;

}

// Title
.wrap-title  {
  margin: 0 0 50px 0;
  img {
    cursor: pointer;
  }
  img:hover {
    opacity: .8;
  }
}

.title {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 29px;
  line-height: 34px;
  text-align: center;
  letter-spacing: -0.165px;
  color: #7E98DF;
  cursor: pointer;
}

.title:hover {
  opacity: .8;
}

.menu {
  width: 250px;
  height: 360px;
  right: 30px;
  top: 75px;
  background: #7E98DF;
  border-radius: 35px 10px 35px 35px;
  padding: 22px 30px;
}

.menu-select {
  height: fit-content;
  width: 100%;
  cursor: pointer;
  h2 {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.165px;
    color: #FFFFFF;
  }
}

.menu-select:hover {
  opacity: .8;
}

// Search
.wrap-search {
  margin: 0 0 25px 0;
  img {
    cursor: pointer;
  }
  img:hover {
    opacity: .8;
  }
}

.wrap-search {
  .search {
    img {
      margin: 0 10px 0 20px;
    }
  }
  img {
    margin: 0 0 0 20px;
  }
}

.search {
  width: 250px;
  height: 60px;
  background: #FAFAFA;
  border-radius: 15px;
  img {
    margin: 0 10px 0 20px;
  }
  input {
    width: 100%;
    background-color: rgba($color: #000000, $alpha: 0);
    padding: 0 15px 0 0;
  }
  input::placeholder {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    color: #848484;
  }
}

// Tab All, Important, Unread
.wrap-tab {
  height: 50px;
  margin: 0 0 35px 0;
  div:hover {
    opacity: .8;
  }
}

.tab-inactive {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.165px;
  color: #232323;
  cursor: pointer;
}

.tab-active {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 24px;
  text-align: center;
  letter-spacing: -0.165px;
  color: #FFFFFF;
  width: fit-content;
  height: 100%;
  background: #7E98DF;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  padding: 0 18px;
}

.tab-active:hover, .tab-inactive:hover {
  opacity: .8;
}

// Chat List
.wrap-chat {
  overflow: auto;
  padding: 0 30px;
}

.chat-person {
  cursor: pointer;
  margin: 0 0 30px 0;
}

.chat-person:hover {
  opacity: .8;
}

.wrap-img {
  width: 64px;
  height: 64px;
  border-radius: 20px;
  background-color: #dadada;
  overflow: hidden;
  margin: 0 15px 0 0;
  img {
    width: 100%;
  }
}

.wrap-name-message, .wrap-time-count {
  padding: 7px 0;
}

.name {
  font-family: Rubik;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  letter-spacing: -0.165px;
  color: #232323;
}

.status {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.165px;
  color: #7E98DF;
}

.last-message {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  letter-spacing: -0.165px;
  color: #848484;
}

.time {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 17px;
  text-align: center;
  letter-spacing: -0.165px;
  color: #848484;
}

.count {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 12px;
  line-height: 14px;
  text-align: center;
  letter-spacing: -0.165px;
  color: #FFFFFF;
  min-width: 20px;
  height: 20px;
  background: #7E98DF;
  border-radius: 30px;
  padding: 0 7px;
}

// Right Side
.right-side {
  // width: 100%;
  height: 100vh;
  background: #FAFAFA;
  border-left: 1px solid #E5E5E5;
}

.not-select {
  font-family: Rubik;
  font-style: normal;
  font-weight: normal;
  font-size: 24px;
  line-height: 28px;
  text-align: center;
  color: #848484;
}

.room-chat {
  top: 0;
}

// Header
.header-chat {
  padding: 28px 50px;
  background-color: white;
  cursor: pointer;
  height: 120px;
}

.wrap-name-status {
  padding: 9px 0;
}

.menu-profile {
  top: 75px;
  right: 50px;
  width: 250px;
  height: 268px;
  background: #7E98DF;
  border-radius: 35px 10px 35px 35px;
}

// Body
.body-chat {
  height: 100%;
  padding: 25px 50px 0 50px;
  overflow: auto;
}

// Image Chat
.wrap-img-chat {
  .img-chat {
    width: 54px;
    height: 54px;
    border-radius: 20px;
    background-color: #dadada;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}

// Body Receiver
.receiver {
  // background-color: wheat;
  margin: 0 0 15px 0;
  .receiver-message {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 185.17%;
    letter-spacing: -0.165px;
    color: #FFFFFF;
    max-width: 70%;
    height: fit-content;
    background: #7E98DF;
    padding: 17px 30px;
    border-radius: 35px 35px 35px 10px;
    margin: 0 0 0 15px;
  }
}

// Body Sender
.sender {
  margin: 0 0 15px 0;
  .sender-message {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 15px;
    line-height: 185.17%;
    letter-spacing: -0.165px;
    color: #232323;
    padding: 17px 30px;
    background: #ffffff;
    border-radius: 35px 10px 35px 35px;
    max-width: 70%;
    height: fit-content;
    margin: 0 15px 0 0;
  }
}

// Send Chat
.wrap-send-chat {
  height: 120px;
  padding: 30px 50px;
  background-color: white;
}

.wrap-input {
  // padding: 0 30px;
  height: 60px;
  background: #FAFAFA;
  border-radius: 15px;
  input {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 176, 255, 0);
    padding: 0 20px 0 30px;
  }
  input::placeholder {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.165px;
    color: #848484;
  }
  img {
    margin: 0 20px 0 0;
  }
}

// My Profile
.profile-active {
  width: 350px;
  background-color: white;
  left: 0;
  height: 100vh;
  top: 0;
  border-right: 1px solid #E5E5E5;
  padding: 28px 28px 0 28px;
  overflow: auto;
}

.profile-inactive {
  width: 350px;
  background-color: white;
  left: -350px;
  height: 100vh;
  top: 0;
  border-right: 1px solid #E5E5E5;
  padding: 28px;
  overflow: auto;
}

.wrap-username {
  cursor: pointer;
  margin: 0 0 50px 0;
  img {
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    margin: 0 25px 0 0;
  }
  .username {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: #7E98DF;
  }
}

.container-photo {
  width: 100%;
  height: 82px;
  margin: 0 0 25px 0;
  .wrap-profile {
    width: 82px;
    height: 82px;
    border-radius: 30px;
    background-color: #dadada;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}

.wrap-name {
  margin: 0 0 35px 0;
  width: 100%;
  .my-name-edit {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    letter-spacing: -0.165px;
    color: #232323;
    text-align: center;
    margin: 0 0 7px 0;
    border-bottom: 1px solid #dadada;
  }
  .my-name {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 22px;
    line-height: 26px;
    letter-spacing: -0.165px;
    color: #232323;
    text-align: center;
    margin: 0 0 7px 0;
    background-color: rgba(255, 255, 255, 0);
    border-bottom: 1px solid #dadada00;
  }
  .edit-name {
    font-family: Rubik;
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 1em;
    color:  #7E98DF;
    text-align: center;
    margin: 0 0 7px 0;
    cursor: pointer;
  }
  .edit-name:hover{
    opacity: .8;
  }
  .my-username {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 1.335px;
    color: #848484;
    text-align: center;
  }
}

.wrap-my-phone {
  margin: 0 0 25px 0;
  padding: 0 0 25px 0;
  border-bottom: 2px solid #F6F6F6;
  .account {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 23px;
    color: #232323;
    margin: 0 0 15px 0;
  }
  .my-phone-edit {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 1.335px;
    color: #232323;
    margin: 0 0 8px 0;
    background-color: rgba($color: #000000, $alpha: 0);
  }
  .my-phone {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 1.335px;
    color: #848484;
    margin: 0 0 8px 0;
    background-color: rgba($color: #000000, $alpha: 0);
  }
  .tap-to {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.17px;
    color: #7E98DF;
    cursor: pointer;
  }
}

.wrap-my-username {
  margin: 0 0 25px 0;
  border-bottom: 2px solid #F6F6F6;
  .input-my-username {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #232323;
    margin: 0 0 8px 0;
    background-color: rgba($color: #000000, $alpha: 0);
  }
  .save-my-username {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    color: #848484;
    margin: 0 0 8px 0;
    background-color: rgba($color: #000000, $alpha: 0);
  }
  .username {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.17px;
    color: #848484;
    margin: 0 0 8px 0;
  }
  .tap-to {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.17px;
    color: #7E98DF;
    cursor: pointer;
    margin: 0 0 25px 0;
  }
}

.wrap-bio {
  margin: 0 0 25px 0;
  border-bottom: 2px solid #F6F6F6;
  .container-bio {
    background-color: #ffffff;
    min-height: 58px;
    .activeBio {
      background-color: #ffffff00;
      padding: 0;
      width: 100%;
      min-height: 58px;
      outline: 0;
      border: 0;
      resize: none;
      font-family: Rubik;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 181%;
      color: #232323;
    }
    .inactiveBio {
      background-color: #ffffff00;
      padding: 0;
      width: 100%;
      min-height: 58px;
      outline: 0;
      border: 0;
      resize: none;
      font-family: Rubik;
      font-style: normal;
      font-weight: 500;
      font-size: 16px;
      line-height: 181%;
      color: #848484;
    }
    textarea:focus {
      outline: 0;
      border: 0;
      padding: 0;
      resize: none;
    }
  }
  .bio {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.17px;
    color: #848484;
    margin: 0 0 8px 0;
  }
  .tap-to {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: -0.17px;
    color: #7E98DF;
    cursor: pointer;
    margin: 0 0 25px 0;
  }
}

.wrap-location {
  margin: 0 0 28px 0;
  .title-location {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 23px;
    color: #232323;
    margin: 0 0 15px 0;
  }
  .location {
    height: 300px;
    background-color: #dadada;
  }
}

// Friends Profile
.profile-f-active {
  width: 350px;
  background-color: white;
  right: 0;
  height: 100vh;
  top: 0;
  border-left: 1px solid #E5E5E5;
  padding: 28px 28px 0 28px;
  overflow: auto;
}

.profile-f-inactive {
  width: 350px;
  background-color: white;
  right: -350px;
  height: 100vh;
  top: 0;
  border-left: 1px solid #E5E5E5;
  padding: 28px 28px 0 28px;
  overflow: auto;
}

.wrap-username-f {
  cursor: pointer;
  margin: 0 0 50px 0;
  img {
    top: 50%;
    left: 0;
    transform: translate(0, -50%);
    margin: 0 25px 0 0;
  }
  .username-f {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 24px;
    line-height: 28px;
    color: #7E98DF;
  }
}

.container-profile-f {
  width: 100%;
  height: 82px;
  margin: 0 0 25px 0;
  .wrap-profile-f {
    width: 82px;
    height: 82px;
    border-radius: 30px;
    background-color: #dadada;
    overflow: hidden;
    img {
      width: 100%;
    }
  }
}

.wrap-name-f {
  margin: 0 0 35px 0;
  .name-status-f {
    .name-f {
      font-family: Rubik;
      font-style: normal;
      font-weight: 500;
      font-size: 22px;
      line-height: 26px;
      letter-spacing: -0.165px;
      color: #232323;
      margin: 0 0 7px 0;
    }
    .status-f {
      font-family: Rubik;
      font-style: normal;
      font-weight: normal;
      font-size: 16px;
      line-height: 19px;
      letter-spacing: 1.335px;
      color: #232323;
    }
  }
  img {
    cursor: pointer;
  }
}

.wrap-phone-f {
  border-bottom: 2px solid #F6F6F6;
  margin: 0 0 35px 0;
  .text-phone {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 19px;
    line-height: 23px;
    color: #232323;
    margin: 0 0 15px 0 ;
  }
  .phone-number {
    font-family: Rubik;
    font-style: normal;
    font-weight: normal;
    font-size: 16px;
    line-height: 19px;
    letter-spacing: 1.335px;
    color: #232323;
    margin: 0 0 20px 0;
  }
}

.wrap-doc {
  margin: 0 0 35px 0;
  .tab-active-f {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    letter-spacing: -0.165px;
    color: #FFFFFF;
    padding: 0 25px;
    width: fit-content;
    height: 50px;
    background: #7E98DF;
    border-radius: 20px;
    display: flex;
    align-items: center;
    cursor: pointer;
  }
  .tab-inactive-f {
    font-family: Rubik;
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 19px;
    text-align: center;
    letter-spacing: -0.165px;
    color: #232323;
    cursor: pointer;
  }
}

.tab-location-f {
  background-color: #dadada;
  width: 100%;
  height: 300px;
}

@media (min-width: 1367px) {

  //  Left Side
  .left-side {
    width: 350px!important;
  }

  .wrap-search {
    .search {
      img {
        margin: 0 10px 0 20px;
      }
    }
    img {
      margin: 0 0 0 20px;
    }
  }

  // Right Side
  .right-side {
    width: 100%;
  }
}

.member-list {
  border-radius: 20px;
  margin-top: 10px;
  background: rgba(132, 132, 132, 0.2);
  padding: 20px;
  text-align: center;
}

</style>
