<template>
  <v-card class="justify-center secondary" fill-height>
    <v-parallax src="/static/images/banners/summer-homepage-banner.jpg"
                style="height: 60vh" class="secondary">
      <div :class="{'homebanner': $vuetify.breakpoint.smAndDown,'animatedParent':$vuetify.breakpoint.mdAndUp}">
        <v-layout row wrap class="pa-3 text-xs-center justify-center animated fadeInDown">
          <v-flex xs12>
            <v-layout align-center fill-height row wrap class="pa-3 mt-3 justify-center">
              <v-flex xs8 md6 >
                  <div :class="{'slanted1': $vuetify.breakpoint.mdAndUp}">
                    <div>
                      <h3 class="welcome" style="padding-top: 3vh">Welcome to JustCredo !</h3>
                    </div>
                  </div>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm8 md6>
            <div :class="{'slanted3': $vuetify.breakpoint.mdAndUp}">
              <p class="welcomeP">Create
                <span class="typewrite"
                      data-period="3000"
                      data-type='[ "School",
                      "Music Class",
                      "Sports Class",
                      "Coaching",
                       "Tutors"]'>
                  <span class="wrap"></span>
                </span>
                Profile Here !
              </p>
            </div>
            <v-btn large
                   @click="scrollFunc()"
                   dark
                   color="green darken-2"
                   class="mt-4">
              Know More</v-btn>
          </v-flex>
        </v-layout>
      </div>
    </v-parallax>
    <v-container class="blue colorPrimaryText--text text-xs-center" fluid>
      <div class="animatedParent" data-appear-top-offset='-300'>
        <div class='animated bounceInRight'>
          <p style="font-weight: bold;font-size: 2vh">We are transforming the way end users and educational institute used
            to interact with each other by creating a
            digital ecosystem where they can interact with each other directly.</p>
        </div>
      </div>
    </v-container>

    <v-card fluid id="services">
      <v-layout row wrap class="justify-center">
        <v-flex xs12 class="justify-center fadeInCustom">
          <v-layout class="vd_visitor-counter justify-center mt-5">
            <div class="item-row">
              <div class="item  vd_green hidden-sm-and-down">
                <v-icon size="50px" color="green">fa fa-minus</v-icon>
              </div>
              <div class="item vd_bg-green break"> 1
                <div class="line"></div>
              </div>
              <div class="item vd_bg-green"> 2
                <div class="line"></div>
              </div>
              <div class="item vd_bg-green"> 3
                <div class="line"></div>
              </div>
              <div class="item vd_bg-green break"> 4
                <div class="line"></div>
              </div>
              <div class="item vd_bg-green"> 2
                <div class="line"></div>
              </div>
              <div class="item vd_bg-green"> 3
                <div class="line"></div>
              </div>
              <div class="item vd_bg-green break"> 4
                <div class="line"></div>
              </div>
              <div class="item  vd_green hidden-sm-and-down">
                <v-icon size="50px" color="green">fa fa-minus</v-icon>
              </div>
            </div>
          </v-layout>
        </v-flex>
        <v-flex xs12 mb-5>
          <div class="text-center visitor-word appear text-xs-center">
            <h2>Registered Educational Places and Still Counting...</h2>
          </div>
        </v-flex>
        <v-flex class="feature" xs12 md3 sm6 pa-2 mb-5 v-for="featureBox in featureBox1">
          <v-card class="align-center" hover>
            <v-card-media :src="featureBox.image" height="300" >
            </v-card-media>
            <v-card-title primary-title  class="justify-center align-center">
              <div>
                <h3 class="headline mb-0 text-xs-center">{{featureBox.name}}</h3>
                <div class="mt-3 text-xs-center" style="height: 20vh;font-size: 2vh">{{featureBox.desc}}</div>
              </div>
            </v-card-title>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
    <v-parallax id="features" src="/static/images/banners/istock-499343530.jpg"
                height="480" class="secondary fadeInCustom">
      <div style="background: rgba(0, 0, 0, 0.5)">
        <v-layout row wrap class="pa-3 text-xs-center justify-center">
          <v-flex xs12>
            <v-layout align-center fill-height row wrap class="pa-3 mt-3 justify-center fadeInCustom">
              <v-flex xs6 >
                <div>
                  <div>
                    <h2 class="section-title">JustCredo is the <span>next generation</span> educational networking</h2>
                  </div>
                </div>
              </v-flex>
            </v-layout>
          </v-flex>
          <v-flex xs12 sm6>
            <div>
              <p class="section-intro colorPrimaryText--text">
                We are transforming the way end users and educational institute used to interact with each other by creating a digital ecosystem where they can interact with each other direclty.
              </p>
            </div>
          </v-flex>
        </v-layout>
      </div>
    </v-parallax>
    <v-container class="justify-center text-xs-center blue-grey darken-4 fluid">
      <v-layout row wrap mb-5>
        <v-flex md8 offset-md2 class="mt-5 text-xs-center justify-center">
          <v-card dark class="transparent featureBox colorPrimaryText--text elevation-0">
            <div class="text-center">
              <h2 class="section-title">For End Users We Offers A Wide Range Of <span>Features</span></h2>
              <p class="section-intro">It acts as a educational networking and central platform for educational institutes, teachers, students and parents who are linked to education in any way.</p>
            </div>
          </v-card>
        </v-flex>
        <v-flex md4 sm12>
          <v-card dark class="transparent featureBox colorPrimaryText--text elevation-0">
            <div class="features1-content left feature">
              <v-icon>touch_app</v-icon>
              <h4>Easy To Use</h4>
              <p>Just download the application and sign up or sign in through gmail and start exploring nearby schools,
                coaching, music classes, sports classes, art classes and private/home tutors very easily.</p>
            </div>
            <div class="features1-content left feature">
              <v-icon>chrome_reader_mode</v-icon>
              <h4>Browse Details</h4>
              <p>Users can browse all the details like classes and boards available, facilities and extracurricular activities
                provided, admission open or not, contact details along with google location.
              </p>
            </div>
          </v-card>
        </v-flex>
        <v-flex md4 sm12 class="fadeInCustom">
          <v-card dark hover class="transparent elevation-24 pa-5  mt-5">
            <v-container>
              <v-layout class="justify-center fill-height">
                <!--<img class="img-responsive" src="/static/images/school_home_mobile.png">-->
                <div align="center" style="height: 50vh">
                  <h2 class="section-title colorPrimaryText--text">Single Point Of Contact For People Related With <br><span>Educational Networking</span> in any way.</h2>
                  <p class="section-intro colorPrimaryText--text mt-5" style="font-size: 2vh">
                    JustCredo is helping people in digitally advertising all the educational institutes. People can add their places profile very easily. The new generation Educational Networking app.
                  </p>
                </div>
              </v-layout>
            </v-container>
          </v-card>
        </v-flex>
        <v-flex md4 sm12>
          <v-card dark class="transparent featureBox colorPrimaryText--text elevation-0">
            <div class="features1-content right feature">
              <v-icon>bookmark</v-icon>
              <h4>Bookmarking</h4>
              <p>You can see the up to date details, browse images, read blogs/reviews, get the contact details and you can bookmark
                it so that you can compare them later. You can find bookmarked places in profile section of the app.</p>
            </div>
            <div class="features1-content right feature">
              <v-icon>receipt</v-icon>
              <h4>Read Reviews</h4>
              <p>Places can be browsed based on rating and reviews given by the end users. People can read the reviews.</p>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
    <v-jumbotron id="contents" class="grey lighten-3" height="700">
      <v-container class="justify-center">
        <v-layout row wrap class="justify-center">
          <v-flex xs12 mt-3>
            <v-card class="transparent elevation-0">
              <v-card-title class="justify-center text-xs-center">
                <v-layout row wrap>
                  <v-flex xs12>
                    <h3 class="welcome" style="color: #757575">Discover Educational Place on JustCredo</h3>
                  </v-flex xs12>
                  <v-flex>
                    <h2>Next Generation Educational Networking</h2>
                  </v-flex>
                </v-layout>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex xs12>
            <carousel :perPageCustom="[[480, 1], [768, 2], [1024,3]]"
                      :autoplay=true :autoplayHoverPause=true
                      :paginationEnabled="false"
                      :autoplayTimeout=2000 :minSwipeDistance=8
                      :loop=true :paginationPadding=5>
              <slide v-for="category in categories" :key="category.name" class="pa-3">
                <v-card class="align-center pt-4" hover>
                  <v-card-media contain :src="category.image" height="20vh">
                  </v-card-media>
                  <v-card-title primary-title  class="justify-center text-xs-center align-center">
                    <div class="section-intro">
                      <h3 class="mb-0">{{category.name}}</h3>
                      <div class="mt-3" style="height: 20vh">{{category.desc}}</div>
                    </div>
                  </v-card-title>
                </v-card>

              </slide>
            </carousel>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
    <v-card class="elevation-24">
      <v-layout row wrap id="partners">
        <v-flex xs12 md6>
          <img
            src="/static/images/banners/138710949-58b741915f9b5880804ff093.jpg"
            style="height: 60vh;width: 100%"/>
        </v-flex>
        <v-flex xs6 md6>
          <v-card dark class="featureBox colorPrimaryText--text elevation-0" style="float:right;height: 60vh">
            <div class="features2-content pa-2">
              <h2 class="section-title">Create your advertising profile very easily by clicking on
                <span>Add Place</span> in profile section.</h2>
              <p>Owners of schools, coaching, music classes, sports classes, art classes and
                private/home tutors can create their advertising profile very easily.
                They just need to fill up a form after selecting a
                appropriate option and their profile will be visible to the end users as soon as they save and submit it.</p>
              <ul class="section-title">
                <li><i class="fa fa-check"></i> Profile contents can be updated at any time in future by themselves </li>
                <li><i class="fa fa-check"></i> Mention about the facilities and key features</li>
                <li><i class="fa fa-check"></i> Blogs can be shared, people can like and comment on it </li>
                <li><i class="fa fa-check"></i> Pictures can be uploaded and will be visible in gallery section</li>
                <li><i class="fa fa-check"></i> Get notified when people bookmark your advertising profile.</li>
              </ul>
            </div>
          </v-card>
        </v-flex>
      </v-layout>
    </v-card>
      <v-container id="mission" class="justify-center text-xs-center text-md-left grey lighten-3" fluid>
        <v-layout row wrap class="justify-center mt-5">
          <v-flex xs12 mt-3 mb-5>
            <v-card class="transparent elevation-0 slideDown">
              <v-card-title class="justify-center">
                <div align="center">
                  <h2 class="section-title">Single Point Of Contact For People Related With <br><span>Educational Networking</span> in any way.</h2>
                  <p class="section-intro pl-5 pr-5">JustCredo's mission is to provide a educational networking platform to people
                    where they can find any type of educational institute very easily through mobile application.
                    For educational institutes owner they can create profile on this application and digitally advertise themselves to the world.
                  </p>
                </div>
              </v-card-title>
            </v-card>
          </v-flex>
          <v-flex xs12 md6>
            <v-card dark class="transparent featureBox background--text elevation-0 mb-5">
              <div class="features2-content feature" style="height: 40vh">
                <h2 class="section-title">Education is for improving the lives of others and for leaving your community
                  and world better than you found it.
                  <span></span></h2>
                <p>JustCredo aims at providing people easy way to search for schools, coaching, music classes, sports classes,
                  art classes and private/home tutors, compare them by rating and reviews shared by end users.
                  They can browse them category wise as well as location wise.
                </p>
                <p>We help schools, coaching, music classes, sports classes, art classes and private/home tutors
                  to take digital route for advertising themselves seamlessly.</p>
              </div>
            </v-card>
          </v-flex>
          <v-flex xs12 md6 class="mb-5 feature">
            <v-card dark class="transparent featureBox background--text elevation-24 mb-5">
              <img
                src="/static/images/banners/crafts-your-kids-can-do-while-you-worry-about-back-to-school.jpeg"
              style="height: 55vh;width: 100%">
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
  </v-card>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
export default {
  data() {
    return {
      show:"false",
      featureBox1:[
        {
          name:"LIVE FEEDS AND BLOGS",
          image:"static/images/banners/import-rss-feeds-into-wordpress-as-posts-1090x545.jpg",
          desc:"Get the live updates of the educational places in your city at every second. People can see rating/reviews shared by other people about the educational places and read the blogs shared by the educational places about any event happening within their premises."
        },
        {
          name:"NOTIFICATIONS",
          image:"static/images/banners/referral.png",
          desc:"People can bookmark places and get notified whenever anything shared by the educational places. Notifications can be about 'Admission Opening'. People can also follow other people to get their updates."
        },
        {
          name:"LOCATION WISE SEARCHING",
          image:"static/images/banners/location.jpg",
          desc:"JustCredo shows contents based on the selected location or by fetching user's location automatically."
        }
      ],
      categories:[
        {
          image:"static/images/school/abacus.svg",
          name:"Pre-Schools",
          desc:"Preschool is an early childhood program in which children combine learning with play in a program run by professionally trained adults."
        },
        {
          image:"static/images/school/backpack.svg",
          name:"Primary Schools",
          desc:"The children in these classes are generally aged between 6 and 15 years. It is the next stage after kindergarten (Pre-Nursery, Nursery, Prep or Lower Kindergarten and Upper Kindergarten). "
        },
        {
          image:"static/images/school/graduate.svg",
          name:"Secondary Schools",
          desc:"Secondary schooling system in India Secondary school education comprises of two years of lower secondary and two years of higher secondary education. The lower secondary level is for students aged 14 to 16 years."
        },
        {
          image:"static/images/school/geography.svg",
          name:"International School",
          desc:"An international school is a school that promotes international education, in an international environment by adopting a curriculum such as that of the International Baccalaureate, Edexcel or Cambridge International Examinations."
        },
        {
          image:"static/images/school/wheelchair.svg",
          name:"Special Schools",
          desc:"A special school is a school catering for students who have special educational needs due to severe learning difficulties, physical disabilities or behavioural problems."
        },
        {
          image:"static/images/school/acoustic-guitar.svg",
          name:"Music Classes",
          desc:"Their mission is to equip you with all the knowledge and expertise you need to turn your musical passion into a successful career. It can be dancing, singing or instruments."
        },
        {
          image:"static/images/school/football.svg",
          name:"Sports Classes",
          desc:"Sports classes can be any type of education in the field of sports. It can be indoor/outdoor games, fitness activities, yoga etc."
        },
        {
          image:"static/images/school/painting-palette.svg",
          name:"Painting Classes",
          desc:"Painting classes contains educational institute in the field of art & craft, painting, drawing, handicraft, sketching, Clay modelling etc."
        },
        {
          image:"static/images/school/presentation.svg",
          name:"Coaching",
          desc:"Coaching classes contains educational institute that helps people gather expertise in some particular subject, it may be competitive exams preparation."
        },
        {
          image:"static/images/school/laptop.svg",
          name:"Home Tutors",
          desc:"This section comprises of Elementary Tutors, General Tutors, Homework Helper, Pre-K Tutors, Specialty Subject Tutors, Special Education Tutors and Test-Prep Tutors."
        },
        ],
      images: [
        { image: "/static/images/app-screen/justcredo_screen1.jpg" },
        { image: "/static/images/app-screen/justcredo_screen2.jpg" },
        { image: "/static/images/app-screen/justcredo_screen3.jpg" },
        { image: "/static/images/app-screen/justcredo_screen4.jpg" },
        { image: "/static/images/app-screen/justcredo_screen5.jpg" },
        { image: "/static/images/app-screen/justcredo_screen6.jpg" },
        { image: "/static/images/app-screen/justcredo_screen7.jpg" },
        { image: "/static/images/app-screen/justcredo_screen8.jpg" },
        { image: "/static/images/app-screen/justcredo_screen9.jpg" },
        { image: "/static/images/app-screen/justcredo_screen10.jpg" },
        { image: "/static/images/app-screen/justcredo_screen11.jpg" },
        { image: "/static/images/app-screen/justcredo_screen12.jpg" }
      ]
    };
  },
  methods: {
    scrollFunc :function(){
      this.$SmoothScroll(document.getElementById('Content'));
    }
  },
  mounted() {

    jQuery(document).ready(function() {
      jQuery('.feature').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated fadeInUp',
        offset: 100
      });
    });

    jQuery(document).ready(function() {
      jQuery('.slideDown').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated fadeInDown',
        offset: 100
      });
    });

    jQuery(document).ready(function() {
      jQuery('.fadeInCustom').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated fadeIn',
        offset: 100
      });
    });

    jQuery(document).ready(function() {
      jQuery('.fadeInRight').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated fadeInRight',
        offset: 100
      });
    });

    jQuery(document).ready(function() {
      jQuery('.fadeInLeft').addClass("hidden").viewportChecker({
        classToAdd: 'visible animated fadeInLeft',
        offset: 100
      });
    });

    let TxtType = function(el, toRotate, period) {
      this.toRotate = toRotate;
      this.el = el;
      this.loopNum = 0;
      this.period = parseInt(period, 10) || 2000;
      this.txt = '';
      this.tick();
      this.isDeleting = false;
    };

    TxtType.prototype.tick = function() {
      let i = this.loopNum % this.toRotate.length;
      let fullTxt = this.toRotate[i];

      if (this.isDeleting) {
        this.txt = fullTxt.substring(0, this.txt.length - 1);
      } else {
        this.txt = fullTxt.substring(0, this.txt.length + 1);
      }

      this.el.innerHTML = '<span class="wrap">'+this.txt+'</span>';

      let that = this;
      let delta = 200 - Math.random() * 100;

      if (this.isDeleting) { delta /= 2; }

      if (!this.isDeleting && this.txt === fullTxt) {
        delta = this.period;
        this.isDeleting = true;
      } else if (this.isDeleting && this.txt === '') {
        this.isDeleting = false;
        this.loopNum++;
        delta = 500;
      }

      setTimeout(function() {
        that.tick();
      }, delta);
    };


    let elements = document.getElementsByClassName('typewrite');
      for (let i=0; i<elements.length; i++) {
        let toRotate = elements[i].getAttribute('data-type');
        let period = elements[i].getAttribute('data-period');
        if (toRotate) {
          new TxtType(elements[i], JSON.parse(toRotate), period);
        }
      }
      // INJECT CSS
    let css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff;font-family:Roboto, " +
      "                  sans-serif;font-weight: 400;\n" +
      "                  line-height: 4.8vh;\n" +
      "                  margin-bottom: 2%;\n" +
      "                  font-size: 3.5vh;}";
    document.body.appendChild(css);

  }
};
</script>

<style scoped>
@import url(https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,600,700);

img {
  max-width: 100%;
  height: auto;
}

.overview-video {
  margin: auto auto 7%;
}
.overview-video iframe {
  width: 800px;
  height: 450px;
}
.subscribe h2 {
  margin-top: 0;
  letter-spacing: 2px;
}

h2 {
  font-size: 30px;
  font-weight: 100;
}

.subscribe p {
  margin: 5% 10% 7% 10%;
  font-size: 14px;
  line-height: 21px;
  font-weight: 300;
  letter-spacing: 1px;
}

ul li {
  list-style: none;
}

.banner-text {
  padding-top: 35%;
}
.banner-text h1 {
  color: #fff;
  font-family: "Roboto", sans-serif;
  font-weight: 100;
  line-height: 48px;
  margin-bottom: 5%;
  font-size: 43px;
}
.banner-text span {
  font-weight: 300;
}
.banner-text p {
  color: #fff;
  font-size: 16px;
  line-height: 24px;
  margin-bottom: 7%;
  font-family: "Roboto", sans-serif;
}
.banner-img {
  bottom: -186px;
  position: relative;
}
.banner-btn a {
  margin-right: 15px;
  display: inline-block;
}

.section-title {
  margin-top: 0;
  letter-spacing: 0.2vh;
  font-weight: 100;
  font-size: 3vh;
}
.section-title span {
  font-weight: 400;
}
.section-title li {
  font-weight: 400;
  font-size: 2vh;
}
.section-intro {
  margin: 4vh 8vh 4vh 4vh;
  font-size: 1.8vh;
  line-height: 2.1vh;
  font-weight: 300;
  letter-spacing: 0.1vh;
}
.icon {
  font-size: 33px;
  color: #ffffff;
}

.overview-content h4 {
  text-transform: uppercase;
  letter-spacing: 1px;
}
.overview-content p {
  font-family: "Roboto", sans-serif;
  font-size: 13px;
  font-weight: 300;
  line-height: 21px;
  letter-spacing: 1px;
  padding-right: 12%;
}

.featureBox {
  padding-right: 15px;
  padding-left: 15px;
}

/* ------------------------------------------------------------------------------
	Feature 1
-------------------------------------------------------------------------------*/
.features1 {
  background-color: #f2f2f2;
}
.left {
  padding-right: 5%;
}
.middle {
  padding-left: 3.5%;
}
.right {
  padding-left: 5%;
}
.features1-content {
  margin-top: 20%;
}
.features1-content h4 {
  text-transform: uppercase;
  letter-spacing: 0.1vh;
  margin-top: 2vh;
}
.features1-content p {
  font-family: "Roboto", sans-serif;
  font-size: 2vh;
  font-weight: 300;
  line-height: 2.1vh;
  letter-spacing: 0.1vh;
  margin-top: 2.4vh;
}
/* ------------------------------------------------------------------------------
      Feature 2 & 3
  -------------------------------------------------------------------------------*/

.features2 {
  padding-bottom: 0;
}
.features2-content {
  margin-top: 4.5%;
}
.features2-content img {
  bottom: -100px;
}
.features2-content p {
  font-family: "Roboto", sans-serif;
  font-size: 2vh;
  font-weight: 300;
  line-height: 3vh;
  letter-spacing: 0.2vh;
  margin-top: 7%;
}
.features2-content ul {
  margin-top: 7%;
  line-height: 36px;
  font-weight: 300;
}
.features3 {
  background-color: #f2f2f2;
  padding-bottom: 0;
}
.features3 img {
  bottom: -100px;
  padding-left: 15%;
}

  .homebanner{
    overflow: hidden;
    position: relative;
    width:120%;
    margin-right:-60px;
    margin-left:-30px;
    height: 120%;
    background: rgba(0, 0, 0, 0.5);
  }

.welcome {
  font-family: "Roboto", sans-serif;
  font-weight: 800;
  line-height: 4.8vh;
  margin-bottom: 2vh;
  font-size: 4.3vh;
  /*position: relative;*/
  /*white-space: nowrap;*/
  /*animation: floatText 1s alternate ease-in-out;*/
}

.welcomeP{
  font-family: "Roboto", sans-serif;
  font-weight: 400;
  line-height: 4.8vh;
  margin-bottom: 2vh;
  font-size: 3.5vh;
}

.homebanner span {
  letter-spacing: 0.1vh;
  font-size: 1.5vh;
  font-weight: 400;
}
.homebanner h2 {
  font-family: "Roboto", sans-serif;
  line-height: 4.5vh;
  letter-spacing: 0.1vh;
  font-weight: 400;
}

.slanted {
  clip-path: polygon(0 0, 1600px 0, 1600px 85%, 0 100%);
}


.slanted1 {
  clip-path: polygon(5% 5%, 100% 0, 100% 80%, 0 100%);
  background:orange;
  height: 100px
}

.slanted2 {
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 96%, 0 100%);
  clip-path: polygon(0 0, 100% 0%, 100% 90%, 0 100%);
}

.slanted3 {
  -webkit-clip-path: polygon(0 0, 1600px 0, 1600px 87%, 0 100%);
  clip-path: polygon(0 -20%, 100% 0, 100% 77%, 0 100%);
  background:#6200ea;
  height: 100px;
  padding: 10px
}


@-webkit-keyframes floatText {
  from {
    left: -100%;
  }

  to {
    /* left: auto; */
    left: 00%;
  }
}

.vd_visitor-counter .item {
  width: 4.6vh;
  height: 6vh;
  line-height: 6vh;
  font-size: 4.6vh;
  margin-bottom: 1vh;
}
@media (max-width: 991px)
.vd_visitor-counter .item {
  width: 6vh;
  height: 7.6vh;
  line-height: 7.6vh;
  font-size: 5.6vh;
}
.vd_visitor-counter .break {
  margin-right: 2.5vh;
}
.vd_visitor-counter .item {
  width: 7.2vh;
  text-align: center;
  font-size: 7.2vh;
  font-weight: 700;
  height: 8.8vh;
  color: #FFF;
  display: table-cell;
  vertical-align: middle;
  border-radius: 0.4vh;
  position: relative;
  line-height: 8.8vh;
  margin-right: 0.5vh;
  float: left;
}
.vd_bg-green {
  background-color: #1fae66 !important;
}

@media (max-width: 991px)
.vd_visitor-counter .item .line {
  width: 6vh;
}
.vd_visitor-counter .item .line {
  border: 1px solid #FFF;
  position: absolute;
  width: 7.2vh;
  top: 50%;
}

.hidden{
  opacity:0;
}
.visible{
  opacity:1;
}

</style>
