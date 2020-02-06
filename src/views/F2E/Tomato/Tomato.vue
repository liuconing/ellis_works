<template>
  <div id="Tmato">
    <div class="Tmato">
      <div class="Tmato_content">
        <div class="addmission">
          <input type="text" placeholder="add a new mission…" v-model="AddMesg" />
          <span @click="AddList">+</span>
        </div>
        <div class="UpcomingList">
          <ul>
            <li v-for="(n,key) in DataList" :class="{'List':key}">
              <div class="ListContent">
                <div @click="ListDelete(key)" class="RoundButton"></div>
                <p class="ListText" v-if="!key">{{n.text}}</p>
                <p class="ListText" v-else-if="key">{{n.text}}</p>
                <img
                  @click="ArrayMoblie(DataList,key,0)"
                  v-if="key"
                  src="@/assets/images/THET2E/PlayBlack.svg"
                  alt="Play"
                />
              </div>
              <div class="ListTime" v-if="!key">{{M}}:{{S == 60 ? '00': S <10?`0${S}`:S }}</div>
            </li>
          </ul>
        </div>
      </div>
      <div class="PlayButton">
        <div class="ButtonContent" @click="Reciprocal">
          <img src="@/assets/images/THET2E/PlayWhite.svg" alt />
          <img v-if="false" src="@/assets/images/THET2E/Stop.svg" alt />
        </div>
      </div>
      <div class="Tmato_menu">
        <ul>
          <li>
            <img src="@/assets/images/THET2E/baseline_list_white.png" alt />
          </li>
          <li>
            <img src="@/assets/images/THET2E/baseline_assessment.png" alt />
          </li>
          <li>
            <img src="@/assets/images/THET2E/music.png" alt />
          </li>
          <li class="lineText fixed-bottom">POMODORO</li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        AddMesg: "",
        DataList: [
          {
            id: 1,
            text: "the second thing to do today1"
          },
          {
            id: 2,
            text: "the second thing to do today2"
          },
          {
            id: 3,
            text: "the second thing to do today3"
          },
          {
            id: 4,
            text: "the second thing to do today4"
          }
        ],
        ListFocus: null,
        S: 60,
        M: 25,
        Start: false,
        Interval: null
      };
    },
    methods: {
      AddList() {
        if (!this.AddMesg) return;
        let obj = { id: this.DataList.length + 1, text: this.AddMesg };
        this.DataList.push(obj);
        this.AddMesg = "";
      },
      ListDelete(id) {
        this.DataList.splice(id, 1);
      },
      ArrayMoblie(arr, fromIndex, toIndex) {
        arr[toIndex] = arr.splice(fromIndex, 1, arr[toIndex])[0];
        return arr;
      },
      Reciprocal() {
        if (this.Start) return;
        this.Start = true;
        this.M = 24;
        this.S = 59;
        this.Interval = setInterval(() => {
          this.S = this.S - 1;
          if (this.S == 0) {
            if (this.M == 0 && this.S == 0) {
              this.S = 60;
              this.M = 25;
              this.DataList.splice(0, 1);
              this.Start = false;
              return clearInterval(this.Interval);
            }
            this.S = 60;
            this.M = this.M - 1;
          }

          console.log(this.M, this.S);
        }, 1000);
      }
    },
    created() {}
  };
</script>
<style lang="scss" scoped>
  @import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");
  * {
    font-family: "Roboto", sans-serif;
  }
  #Tmato {
    .Tmato {
      height: 100vh;
      width: 100%;
      position: relative;
      z-index: 1;
      display: flex;
      justify-content: center;
      align-content: center;
    }
  }
  .PlayButton {
    position: absolute;
    z-index: 3;
    width: 540px;
    height: 540px;
    border-radius: 50%;
    border: 4px solid #ff4384;
    right: 21%;
    top: 20%;
    display: flex;
    justify-content: center;
    align-items: center;
    @include mouse;
    &:active {
      top: 20.5%;
      right: 20.8%;
    }
    .ButtonContent {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 500px;
      height: 500px;
      border-radius: 50%;
      background-color: #ff4384;
      border: 4px solid #ff4384;
      img {
        width: 96px;
        height: auto;
      }
    }
  }
  .Tmato_content {
    width: 65%;
    height: 100%;
    background-color: #ffedf7;
    padding: 50px 85px;
    .addmission {
      width: 70%;
      height: 56px;
      background-color: #ffffff;
      padding: 18px;
      padding-left: 16px;
      display: flex;
      justify-content: center;
      align-content: center;
      input {
        display: inline-block;
        width: 100%;
        height: 100%;
        border: none;
        color: #ff4384;
        font-size: 16px;
        &::placeholder {
          color: #ff4384;
          font-size: 16px;
        }
        &:focus {
          outline: none;
        }
      }
      span {
        display: inline-block;
        line-height: 20px;
        font-size: 24px;
        color: #ff4384;
        font-weight: bold;
        @include mouse;
      }
    }
    .UpcomingList {
      margin-top: 150px;
      width: 70%;
      ul {
        li {
          &.List {
            width: 100%;
            height: 35px;
            border-bottom: 1px solid #003164;
            margin-bottom: 10px;
            .ListContent {
              .RoundButton {
                width: 24px;
                height: 24px;
              }
              .ListText {
                font-size: 16px;
              }
            }
          }
          .ListTime {
            font-size: 176px;
            color: #ff4384;
            font-weight: bold;
            text-align: center;
            margin-bottom: 100px;
          }
          .ListContent {
            display: flex;
            align-items: center;
            .RoundButton {
              width: 48px;
              height: 48px;
              border-radius: 50%;
              border: 2px solid #003164;
              transition: background-color 0.3s;
              @include mouse;
              &:hover {
                background-color: #000;
              }
            }
            .ListText {
              font-size: 48px;
              color: #003164;
              font-weight: bold;
              padding-left: 10px;
            }
            img {
              display: block;
              margin-left: auto;
            }
          }
        }
      }
    }
  }
  .Tmato_menu {
    width: 35%;
    height: 100%;
    background-color: #003164;
    padding: 50px 85px;
    ul {
      height: 100%;
      width: 100%;
      li {
        width: 100%;
        text-align: right;
        margin-bottom: 48px;
        img {
          width: 36px;
          height: 36px;
          @include mouse;
        }
        &.lineText {
          color: #ffffff;
          font-size: 24px;
          font-weight: bold;
          writing-mode: vertical-rl;
          margin-right: 85px;
        }
      }
    }
  }
</style>