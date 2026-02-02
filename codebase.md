# .eslintrc.js

```js
module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2022,
    sourceType: 'module',
    project: './tsconfig.json',
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
    'no-console': 'off',
  },
  env: {
    node: true,
    es2022: true,
  },
};
```

# .gitignore

```
node_modules/
dist/
.env
*.log
.DS_Store






 See https://help.github.com/articles/ignoring-files/ for more about ignoring files.

# dependencies
./admin/node_modules
./admin/.pnp
./admin.pnp.js

# testing
./admin/coverage

# next.js
./admin/.next/
./admin.next
./admin/out/

# production
./admin/build

# misc
./admin/.DS_Store
./admin/*.pem

# debug
./admin/npm-debug.log*
./admin/yarn-debug.log*
./admin/yarn-error.log*
./admin/pnpm-debug.log*

# local env files
./admin/.env*.local
./admin/.env

# vercel
./admin/.vercel

# typescript
./admin/*.tsbuildinfo
./admin/next-env.d.ts
```

# .prettierrc

```
{
  "semi": true,
  "trailingComma": "es5",
  "singleQuote": true,
  "printWidth": 100,
  "tabWidth": 2,
  "useTabs": false,
  "arrowParens": "always",
  "endOfLine": "lf"
}
```

# ecosystem.js

```js
module.exports = {
  apps: [
    {
      name: 'merchantai-bot',
      script: './dist/index.js',
      instances: 1,
      exec_mode: 'fork',
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production',
      },
      error_file: './logs/error.log',
      out_file: './logs/out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      autorestart: true,
      max_restarts: 10,
      min_uptime: '10s',
      restart_delay: 4000,
    },
  ],
};
```

# How to boost your brain and memory/Attach Meaning.en.vtt

```vtt
WEBVTT
Kind: captions
Language: en

00:00:07.040 --> 00:00:10.610 align:start position:0%
 
stories<00:00:08.040><c> anything</c><00:00:08.700><c> we</c><00:00:09.059><c> can</c><00:00:09.240><c> visualize</c><00:00:09.840><c> and</c>

00:00:10.610 --> 00:00:10.620 align:start position:0%
stories anything we can visualize and
 

00:00:10.620 --> 00:00:13.009 align:start position:0%
stories anything we can visualize and
emotion<00:00:11.219><c> are</c><00:00:11.700><c> all</c><00:00:12.000><c> elements</c><00:00:12.480><c> that</c><00:00:12.719><c> can</c><00:00:12.900><c> help</c>

00:00:13.009 --> 00:00:13.019 align:start position:0%
emotion are all elements that can help
 

00:00:13.019 --> 00:00:15.410 align:start position:0%
emotion are all elements that can help
us<00:00:13.200><c> remember</c><00:00:13.620><c> because</c><00:00:14.400><c> we</c><00:00:14.759><c> can't</c><00:00:14.880><c> help</c><00:00:15.179><c> but</c>

00:00:15.410 --> 00:00:15.420 align:start position:0%
us remember because we can't help but
 

00:00:15.420 --> 00:00:17.450 align:start position:0%
us remember because we can't help but
attach<00:00:15.780><c> meaning</c><00:00:16.199><c> to</c><00:00:16.740><c> what</c><00:00:16.920><c> we</c><00:00:17.100><c> can</c><00:00:17.220><c> imagine</c>

00:00:17.450 --> 00:00:17.460 align:start position:0%
attach meaning to what we can imagine
 

00:00:17.460 --> 00:00:18.769 align:start position:0%
attach meaning to what we can imagine
and<00:00:17.880><c> feel</c>

00:00:18.769 --> 00:00:18.779 align:start position:0%
and feel
 

00:00:18.779 --> 00:00:20.630 align:start position:0%
and feel
here's<00:00:19.320><c> an</c><00:00:19.440><c> example</c>

00:00:20.630 --> 00:00:20.640 align:start position:0%
here's an example
 

00:00:20.640 --> 00:00:22.429 align:start position:0%
here's an example
most<00:00:21.060><c> of</c><00:00:21.180><c> us</c><00:00:21.300><c> have</c><00:00:21.539><c> trouble</c><00:00:21.840><c> remembering</c>

00:00:22.429 --> 00:00:22.439 align:start position:0%
most of us have trouble remembering
 

00:00:22.439 --> 00:00:26.330 align:start position:0%
most of us have trouble remembering
people's<00:00:22.859><c> names</c><00:00:23.359><c> this</c><00:00:24.359><c> is</c><00:00:24.539><c> normal</c><00:00:24.980><c> because</c><00:00:25.980><c> a</c>

00:00:26.330 --> 00:00:26.340 align:start position:0%
people's names this is normal because a
 

00:00:26.340 --> 00:00:28.670 align:start position:0%
people's names this is normal because a
person's<00:00:26.760><c> name</c><00:00:26.939><c> is</c><00:00:27.119><c> a</c><00:00:27.359><c> proper</c><00:00:27.660><c> noun</c><00:00:27.960><c> an</c>

00:00:28.670 --> 00:00:28.680 align:start position:0%
person's name is a proper noun an
 

00:00:28.680 --> 00:00:30.830 align:start position:0%
person's name is a proper noun an
abstract<00:00:29.099><c> concept</c><00:00:29.640><c> not</c><00:00:30.060><c> associated</c><00:00:30.539><c> with</c>

00:00:30.830 --> 00:00:30.840 align:start position:0%
abstract concept not associated with
 

00:00:30.840 --> 00:00:33.889 align:start position:0%
abstract concept not associated with
anything<00:00:31.140><c> to</c><00:00:32.040><c> our</c><00:00:32.279><c> brains</c><00:00:32.759><c> this</c><00:00:33.420><c> word</c><00:00:33.660><c> is</c>

00:00:33.889 --> 00:00:33.899 align:start position:0%
anything to our brains this word is
 

00:00:33.899 --> 00:00:36.290 align:start position:0%
anything to our brains this word is
essentially<00:00:34.260><c> meaningless</c><00:00:34.860><c> and</c><00:00:35.760><c> our</c><00:00:35.940><c> brains</c>

00:00:36.290 --> 00:00:36.300 align:start position:0%
essentially meaningless and our brains
 

00:00:36.300 --> 00:00:38.630 align:start position:0%
essentially meaningless and our brains
have<00:00:36.480><c> a</c><00:00:36.719><c> hard</c><00:00:36.899><c> time</c><00:00:37.200><c> remembering</c><00:00:37.920><c> what</c><00:00:38.460><c> is</c>

00:00:38.630 --> 00:00:38.640 align:start position:0%
have a hard time remembering what is
 

00:00:38.640 --> 00:00:39.709 align:start position:0%
have a hard time remembering what is
meaningless

00:00:39.709 --> 00:00:39.719 align:start position:0%
meaningless
 

00:00:39.719 --> 00:00:43.610 align:start position:0%
meaningless
so<00:00:40.320><c> whenever</c><00:00:40.739><c> you</c><00:00:41.100><c> can</c><00:00:41.540><c> add</c><00:00:42.540><c> meaning</c>

00:00:43.610 --> 00:00:43.620 align:start position:0%
so whenever you can add meaning
 

00:00:43.620 --> 00:00:45.830 align:start position:0%
so whenever you can add meaning
let's<00:00:44.280><c> say</c><00:00:44.460><c> you</c><00:00:44.700><c> meet</c><00:00:44.879><c> a</c><00:00:45.059><c> man</c><00:00:45.180><c> named</c><00:00:45.540><c> Mr</c>

00:00:45.830 --> 00:00:45.840 align:start position:0%
let's say you meet a man named Mr
 

00:00:45.840 --> 00:00:48.110 align:start position:0%
let's say you meet a man named Mr
Silverman<00:00:46.500><c> and</c><00:00:47.100><c> you</c><00:00:47.280><c> want</c><00:00:47.399><c> to</c><00:00:47.579><c> remember</c><00:00:47.700><c> his</c>

00:00:48.110 --> 00:00:48.120 align:start position:0%
Silverman and you want to remember his
 

00:00:48.120 --> 00:00:48.889 align:start position:0%
Silverman and you want to remember his
name

00:00:48.889 --> 00:00:48.899 align:start position:0%
name
 

00:00:48.899 --> 00:00:51.770 align:start position:0%
name
in<00:00:49.559><c> addition</c><00:00:49.800><c> to</c><00:00:50.160><c> repeating</c><00:00:50.700><c> Mr</c><00:00:50.940><c> Silverman's</c>

00:00:51.770 --> 00:00:51.780 align:start position:0%
in addition to repeating Mr Silverman's
 

00:00:51.780 --> 00:00:54.709 align:start position:0%
in addition to repeating Mr Silverman's
name<00:00:51.960><c> which</c><00:00:52.559><c> helps</c><00:00:52.920><c> us</c><00:00:53.039><c> remember</c><00:00:53.300><c> we</c><00:00:54.300><c> can</c><00:00:54.480><c> take</c>

00:00:54.709 --> 00:00:54.719 align:start position:0%
name which helps us remember we can take
 

00:00:54.719 --> 00:00:57.709 align:start position:0%
name which helps us remember we can take
this<00:00:55.079><c> proper</c><00:00:55.559><c> noun</c><00:00:55.739><c> and</c><00:00:56.460><c> attach</c><00:00:56.879><c> meaning</c><00:00:57.300><c> to</c>

00:00:57.709 --> 00:00:57.719 align:start position:0%
this proper noun and attach meaning to
 

00:00:57.719 --> 00:00:58.610 align:start position:0%
this proper noun and attach meaning to
it

00:00:58.610 --> 00:00:58.620 align:start position:0%
it
 

00:00:58.620 --> 00:00:59.930 align:start position:0%
it
for<00:00:59.039><c> example</c>

00:00:59.930 --> 00:00:59.940 align:start position:0%
for example
 

00:00:59.940 --> 00:01:02.029 align:start position:0%
for example
let's<00:01:00.600><c> say</c><00:01:00.780><c> you</c><00:01:01.079><c> recently</c><00:01:01.440><c> watched</c><00:01:01.920><c> the</c>

00:01:02.029 --> 00:01:02.039 align:start position:0%
let's say you recently watched the
 

00:01:02.039 --> 00:01:05.390 align:start position:0%
let's say you recently watched the
doubles<00:01:02.460><c> luge</c><00:01:02.879><c> competition</c><00:01:03.359><c> on</c><00:01:03.780><c> TV</c><00:01:04.280><c> you</c><00:01:05.280><c> can</c>

00:01:05.390 --> 00:01:05.400 align:start position:0%
doubles luge competition on TV you can
 

00:01:05.400 --> 00:01:08.750 align:start position:0%
doubles luge competition on TV you can
imagine<00:01:05.760><c> Mr</c><00:01:06.659><c> Silverman</c><00:01:07.320><c> holding</c><00:01:08.280><c> a</c><00:01:08.580><c> silver</c>

00:01:08.750 --> 00:01:08.760 align:start position:0%
imagine Mr Silverman holding a silver
 

00:01:08.760 --> 00:01:11.630 align:start position:0%
imagine Mr Silverman holding a silver
trophy<00:01:09.540><c> for</c><00:01:09.960><c> coming</c><00:01:10.200><c> in</c><00:01:10.560><c> second</c><00:01:10.799><c> place</c><00:01:11.159><c> in</c><00:01:11.520><c> the</c>

00:01:11.630 --> 00:01:11.640 align:start position:0%
trophy for coming in second place in the
 

00:01:11.640 --> 00:01:14.990 align:start position:0%
trophy for coming in second place in the
doubles<00:01:12.000><c> luge</c><00:01:12.900><c> now</c><00:01:13.680><c> you've</c><00:01:14.100><c> linked</c><00:01:14.460><c> his</c><00:01:14.640><c> name</c>

00:01:14.990 --> 00:01:15.000 align:start position:0%
doubles luge now you've linked his name
 

00:01:15.000 --> 00:01:18.410 align:start position:0%
doubles luge now you've linked his name
a<00:01:15.900><c> meaningless</c><00:01:16.320><c> word</c><00:01:16.740><c> to</c><00:01:17.580><c> a</c><00:01:17.760><c> network</c><00:01:17.939><c> of</c>

00:01:18.410 --> 00:01:18.420 align:start position:0%
a meaningless word to a network of
 

00:01:18.420 --> 00:01:20.990 align:start position:0%
a meaningless word to a network of
already<00:01:18.840><c> established</c><00:01:19.799><c> highly</c><00:01:20.520><c> accessible</c>

00:01:20.990 --> 00:01:21.000 align:start position:0%
already established highly accessible
 

00:01:21.000 --> 00:01:23.870 align:start position:0%
already established highly accessible
neural<00:01:21.840><c> connections</c><00:01:22.619><c> that</c><00:01:23.100><c> have</c><00:01:23.280><c> meaning</c><00:01:23.520><c> to</c>

00:01:23.870 --> 00:01:23.880 align:start position:0%
neural connections that have meaning to
 

00:01:23.880 --> 00:01:26.630 align:start position:0%
neural connections that have meaning to
you<00:01:24.200><c> you've</c><00:01:25.200><c> now</c><00:01:25.380><c> made</c><00:01:25.680><c> the</c><00:01:25.979><c> memory</c><00:01:26.280><c> of</c><00:01:26.460><c> his</c>

00:01:26.630 --> 00:01:26.640 align:start position:0%
you you've now made the memory of his
 

00:01:26.640 --> 00:01:29.570 align:start position:0%
you you've now made the memory of his
name<00:01:26.880><c> much</c><00:01:27.600><c> easier</c><00:01:28.020><c> to</c><00:01:28.259><c> activate</c><00:01:28.580><c> and</c>

00:01:29.570 --> 00:01:29.580 align:start position:0%
name much easier to activate and
 

00:01:29.580 --> 00:01:31.670 align:start position:0%
name much easier to activate and
therefore<00:01:29.939><c> remember</c>

00:01:31.670 --> 00:01:31.680 align:start position:0%
therefore remember
 

00:01:31.680 --> 00:01:33.830 align:start position:0%
therefore remember
here's<00:01:32.220><c> one</c><00:01:32.400><c> more</c><00:01:32.520><c> example</c><00:01:32.939><c> this</c><00:01:33.659><c> just</c>

00:01:33.830 --> 00:01:33.840 align:start position:0%
here's one more example this just
 

00:01:33.840 --> 00:01:36.170 align:start position:0%
here's one more example this just
happened<00:01:34.080><c> to</c><00:01:34.320><c> me</c><00:01:34.560><c> I</c><00:01:35.400><c> had</c><00:01:35.520><c> a</c><00:01:35.700><c> tight</c><00:01:35.880><c> connection</c>

00:01:36.170 --> 00:01:36.180 align:start position:0%
happened to me I had a tight connection
 

00:01:36.180 --> 00:01:39.109 align:start position:0%
happened to me I had a tight connection
at<00:01:36.540><c> O'Hare</c><00:01:36.900><c> Airport</c><00:01:37.200><c> in</c><00:01:37.560><c> Chicago</c><00:01:37.799><c> and</c><00:01:38.759><c> knew</c><00:01:39.000><c> I</c>

00:01:39.109 --> 00:01:39.119 align:start position:0%
at O'Hare Airport in Chicago and knew I
 

00:01:39.119 --> 00:01:41.569 align:start position:0%
at O'Hare Airport in Chicago and knew I
was<00:01:39.299><c> going</c><00:01:39.420><c> to</c><00:01:39.540><c> have</c><00:01:39.659><c> to</c><00:01:39.840><c> run</c><00:01:40.140><c> I</c><00:01:41.040><c> checked</c><00:01:41.460><c> my</c>

00:01:41.569 --> 00:01:41.579 align:start position:0%
was going to have to run I checked my
 

00:01:41.579 --> 00:01:43.550 align:start position:0%
was going to have to run I checked my
phone<00:01:41.820><c> and</c><00:01:42.240><c> read</c><00:01:42.420><c> that</c><00:01:42.659><c> my</c><00:01:42.960><c> connecting</c><00:01:43.320><c> gate</c>

00:01:43.550 --> 00:01:43.560 align:start position:0%
phone and read that my connecting gate
 

00:01:43.560 --> 00:01:45.170 align:start position:0%
phone and read that my connecting gate
was<00:01:43.860><c> K10</c>

00:01:45.170 --> 00:01:45.180 align:start position:0%
was K10
 

00:01:45.180 --> 00:01:47.749 align:start position:0%
was K10
I<00:01:45.780><c> wanted</c><00:01:45.960><c> to</c><00:01:46.200><c> remember</c><00:01:46.380><c> this</c><00:01:46.860><c> accurately</c><00:01:47.400><c> and</c>

00:01:47.749 --> 00:01:47.759 align:start position:0%
I wanted to remember this accurately and
 

00:01:47.759 --> 00:01:49.370 align:start position:0%
I wanted to remember this accurately and
without<00:01:47.939><c> needing</c><00:01:48.360><c> to</c><00:01:48.479><c> stop</c><00:01:48.659><c> to</c><00:01:48.900><c> look</c><00:01:49.020><c> at</c><00:01:49.200><c> my</c>

00:01:49.370 --> 00:01:49.380 align:start position:0%
without needing to stop to look at my
 

00:01:49.380 --> 00:01:52.370 align:start position:0%
without needing to stop to look at my
phone<00:01:49.500><c> again</c><00:01:49.799><c> so</c><00:01:50.520><c> I</c><00:01:50.759><c> added</c><00:01:51.119><c> meaning</c><00:01:51.420><c> to</c><00:01:52.020><c> this</c>

00:01:52.370 --> 00:01:52.380 align:start position:0%
phone again so I added meaning to this
 

00:01:52.380 --> 00:01:55.190 align:start position:0%
phone again so I added meaning to this
meaningless<00:01:52.860><c> gate</c><00:01:53.280><c> number</c><00:01:53.479><c> I</c><00:01:54.479><c> imagined</c><00:01:55.020><c> my</c>

00:01:55.190 --> 00:01:55.200 align:start position:0%
meaningless gate number I imagined my
 

00:01:55.200 --> 00:01:58.249 align:start position:0%
meaningless gate number I imagined my
dog<00:01:55.439><c> peanut</c><00:01:56.040><c> wearing</c><00:01:56.759><c> a</c><00:01:57.000><c> party</c><00:01:57.180><c> hat</c><00:01:57.479><c> with</c><00:01:58.020><c> his</c>

00:01:58.249 --> 00:01:58.259 align:start position:0%
dog peanut wearing a party hat with his
 

00:01:58.259 --> 00:02:00.530 align:start position:0%
dog peanut wearing a party hat with his
paw<00:01:58.560><c> carrying</c><00:01:59.100><c> an</c><00:01:59.340><c> invitation</c><00:01:59.759><c> for</c><00:02:00.060><c> peanut</c>

00:02:00.530 --> 00:02:00.540 align:start position:0%
paw carrying an invitation for peanut
 

00:02:00.540 --> 00:02:01.969 align:start position:0%
paw carrying an invitation for peanut
and<00:02:00.899><c> guest</c>

00:02:01.969 --> 00:02:01.979 align:start position:0%
and guest
 

00:02:01.979 --> 00:02:06.230 align:start position:0%
and guest
K9<00:02:02.759><c> plus</c><00:02:03.420><c> one</c><00:02:03.780><c> equals</c><00:02:04.740><c> K10</c>

00:02:06.230 --> 00:02:06.240 align:start position:0%
K9 plus one equals K10
 

00:02:06.240 --> 00:02:09.070 align:start position:0%
K9 plus one equals K10
the<00:02:06.780><c> image</c><00:02:07.020><c> was</c><00:02:07.320><c> silly</c><00:02:07.979><c> and</c><00:02:08.340><c> unusual</c>

00:02:09.070 --> 00:02:09.080 align:start position:0%
the image was silly and unusual
 

00:02:09.080 --> 00:02:12.290 align:start position:0%
the image was silly and unusual
emotional<00:02:10.080><c> because</c><00:02:10.319><c> I</c><00:02:10.619><c> love</c><00:02:10.739><c> my</c><00:02:11.039><c> dog</c><00:02:11.400><c> and</c><00:02:12.120><c> I</c>

00:02:12.290 --> 00:02:12.300 align:start position:0%
emotional because I love my dog and I
 

00:02:12.300 --> 00:02:15.290 align:start position:0%
emotional because I love my dog and I
could<00:02:12.420><c> picture</c><00:02:12.660><c> it</c><00:02:13.020><c> and</c><00:02:13.920><c> it</c><00:02:14.099><c> totally</c><00:02:14.400><c> worked</c><00:02:14.760><c> I</c>

00:02:15.290 --> 00:02:15.300 align:start position:0%
could picture it and it totally worked I
 

00:02:15.300 --> 00:02:17.630 align:start position:0%
could picture it and it totally worked I
ran<00:02:15.540><c> without</c><00:02:15.840><c> stopping</c><00:02:16.560><c> to</c><00:02:16.680><c> the</c><00:02:16.920><c> correct</c><00:02:17.220><c> gate</c>

00:02:17.630 --> 00:02:17.640 align:start position:0%
ran without stopping to the correct gate
 

00:02:17.640 --> 00:02:20.720 align:start position:0%
ran without stopping to the correct gate
and<00:02:18.060><c> made</c><00:02:18.300><c> my</c><00:02:18.480><c> flight</c>


```

# How to boost your brain and memory/Brain Healthy Food.en.vtt

```vtt
WEBVTT
Kind: captions
Language: en

00:00:05.960 --> 00:00:09.230 align:start position:0%
 
as<00:00:06.960><c> a</c><00:00:07.140><c> rule</c><00:00:07.440><c> of</c><00:00:07.500><c> thumb</c><00:00:07.740><c> anything</c><00:00:08.580><c> that</c><00:00:08.940><c> is</c><00:00:09.059><c> good</c>

00:00:09.230 --> 00:00:09.240 align:start position:0%
as a rule of thumb anything that is good
 

00:00:09.240 --> 00:00:11.330 align:start position:0%
as a rule of thumb anything that is good
for<00:00:09.420><c> your</c><00:00:09.660><c> heart</c><00:00:09.780><c> is</c><00:00:10.440><c> good</c><00:00:10.679><c> for</c><00:00:10.860><c> your</c><00:00:11.099><c> brain</c>

00:00:11.330 --> 00:00:11.340 align:start position:0%
for your heart is good for your brain
 

00:00:11.340 --> 00:00:13.610 align:start position:0%
for your heart is good for your brain
and<00:00:11.639><c> memory</c><00:00:12.000><c> and</c><00:00:12.960><c> for</c><00:00:13.200><c> preventing</c>

00:00:13.610 --> 00:00:13.620 align:start position:0%
and memory and for preventing
 

00:00:13.620 --> 00:00:16.430 align:start position:0%
and memory and for preventing
Alzheimer's<00:00:14.880><c> many</c><00:00:15.599><c> Studies</c><00:00:16.020><c> have</c><00:00:16.260><c> now</c>

00:00:16.430 --> 00:00:16.440 align:start position:0%
Alzheimer's many Studies have now
 

00:00:16.440 --> 00:00:18.710 align:start position:0%
Alzheimer's many Studies have now
clearly<00:00:16.859><c> demonstrated</c><00:00:17.520><c> that</c><00:00:17.940><c> eating</c><00:00:18.300><c> foods</c>

00:00:18.710 --> 00:00:18.720 align:start position:0%
clearly demonstrated that eating foods
 

00:00:18.720 --> 00:00:20.870 align:start position:0%
clearly demonstrated that eating foods
from<00:00:18.960><c> the</c><00:00:19.140><c> Mediterranean</c><00:00:19.800><c> or</c><00:00:20.220><c> the</c><00:00:20.400><c> Mind</c><00:00:20.580><c> diet</c>

00:00:20.870 --> 00:00:20.880 align:start position:0%
from the Mediterranean or the Mind diet
 

00:00:20.880 --> 00:00:23.810 align:start position:0%
from the Mediterranean or the Mind diet
is<00:00:21.660><c> associated</c><00:00:22.199><c> with</c><00:00:22.619><c> a</c><00:00:22.920><c> significantly</c>

00:00:23.810 --> 00:00:23.820 align:start position:0%
is associated with a significantly
 

00:00:23.820 --> 00:00:26.689 align:start position:0%
is associated with a significantly
reduced<00:00:24.600><c> risk</c><00:00:25.080><c> of</c><00:00:25.560><c> developing</c><00:00:25.980><c> Alzheimer's</c>

00:00:26.689 --> 00:00:26.699 align:start position:0%
reduced risk of developing Alzheimer's
 

00:00:26.699 --> 00:00:27.890 align:start position:0%
reduced risk of developing Alzheimer's
disease

00:00:27.890 --> 00:00:27.900 align:start position:0%
disease
 

00:00:27.900 --> 00:00:30.170 align:start position:0%
disease
now<00:00:28.199><c> if</c><00:00:28.320><c> I</c><00:00:28.619><c> told</c><00:00:28.800><c> you</c><00:00:28.980><c> that</c><00:00:29.220><c> the</c><00:00:29.460><c> U.S</c><00:00:29.760><c> Food</c><00:00:29.939><c> and</c>

00:00:30.170 --> 00:00:30.180 align:start position:0%
now if I told you that the U.S Food and
 

00:00:30.180 --> 00:00:32.510 align:start position:0%
now if I told you that the U.S Food and
Drug<00:00:30.359><c> Administration</c><00:00:30.960><c> just</c><00:00:31.500><c> approved</c><00:00:31.980><c> a</c><00:00:32.279><c> safe</c>

00:00:32.510 --> 00:00:32.520 align:start position:0%
Drug Administration just approved a safe
 

00:00:32.520 --> 00:00:34.850 align:start position:0%
Drug Administration just approved a safe
medication<00:00:33.120><c> that</c><00:00:33.780><c> reduces</c><00:00:34.260><c> your</c><00:00:34.500><c> risk</c><00:00:34.739><c> of</c>

00:00:34.850 --> 00:00:34.860 align:start position:0%
medication that reduces your risk of
 

00:00:34.860 --> 00:00:36.110 align:start position:0%
medication that reduces your risk of
Alzheimer's

00:00:36.110 --> 00:00:36.120 align:start position:0%
Alzheimer's
 

00:00:36.120 --> 00:00:38.090 align:start position:0%
Alzheimer's
you'd<00:00:36.840><c> all</c><00:00:36.960><c> take</c><00:00:37.200><c> it</c>

00:00:38.090 --> 00:00:38.100 align:start position:0%
you'd all take it
 

00:00:38.100 --> 00:00:40.850 align:start position:0%
you'd all take it
both<00:00:38.700><c> the</c><00:00:39.000><c> Mediterranean</c><00:00:39.600><c> and</c><00:00:40.440><c> the</c><00:00:40.620><c> mine</c>

00:00:40.850 --> 00:00:40.860 align:start position:0%
both the Mediterranean and the mine
 

00:00:40.860 --> 00:00:43.930 align:start position:0%
both the Mediterranean and the mine
diets<00:00:41.399><c> include</c><00:00:42.120><c> green</c><00:00:42.780><c> leafy</c><00:00:43.260><c> vegetables</c>

00:00:43.930 --> 00:00:43.940 align:start position:0%
diets include green leafy vegetables
 

00:00:43.940 --> 00:00:46.430 align:start position:0%
diets include green leafy vegetables
brightly<00:00:44.940><c> colored</c><00:00:45.360><c> fruits</c><00:00:45.840><c> and</c><00:00:45.960><c> veggies</c>

00:00:46.430 --> 00:00:46.440 align:start position:0%
brightly colored fruits and veggies
 

00:00:46.440 --> 00:00:49.450 align:start position:0%
brightly colored fruits and veggies
think<00:00:47.160><c> eating</c><00:00:47.640><c> the</c><00:00:47.820><c> colors</c><00:00:48.120><c> of</c><00:00:48.239><c> the</c><00:00:48.480><c> rainbow</c>

00:00:49.450 --> 00:00:49.460 align:start position:0%
think eating the colors of the rainbow
 

00:00:49.460 --> 00:00:53.810 align:start position:0%
think eating the colors of the rainbow
nuts<00:00:50.460><c> beans</c><00:00:51.059><c> olive</c><00:00:51.539><c> oil</c><00:00:51.840><c> and</c><00:00:52.379><c> fish</c><00:00:52.820><c> especially</c>

00:00:53.810 --> 00:00:53.820 align:start position:0%
nuts beans olive oil and fish especially
 

00:00:53.820 --> 00:00:55.790 align:start position:0%
nuts beans olive oil and fish especially
fish<00:00:54.120><c> like</c><00:00:54.420><c> salmon</c><00:00:54.899><c> that</c><00:00:55.199><c> are</c><00:00:55.260><c> rich</c><00:00:55.440><c> in</c>

00:00:55.790 --> 00:00:55.800 align:start position:0%
fish like salmon that are rich in
 

00:00:55.800 --> 00:00:58.069 align:start position:0%
fish like salmon that are rich in
omega-3<00:00:56.160><c> fatty</c><00:00:56.699><c> acids</c><00:00:57.180><c> which</c><00:00:57.600><c> our</c><00:00:57.719><c> bodies</c>

00:00:58.069 --> 00:00:58.079 align:start position:0%
omega-3 fatty acids which our bodies
 

00:00:58.079 --> 00:00:59.930 align:start position:0%
omega-3 fatty acids which our bodies
don't<00:00:58.320><c> make</c><00:00:58.500><c> on</c><00:00:58.739><c> their</c><00:00:58.920><c> own</c>

00:00:59.930 --> 00:00:59.940 align:start position:0%
don't make on their own
 

00:00:59.940 --> 00:01:04.250 align:start position:0%
don't make on their own
this<00:01:00.600><c> diet</c><00:01:01.020><c> isn't</c><00:01:01.980><c> about</c><00:01:02.219><c> deprivation</c><00:01:03.260><c> try</c>

00:01:04.250 --> 00:01:04.260 align:start position:0%
this diet isn't about deprivation try
 

00:01:04.260 --> 00:01:05.929 align:start position:0%
this diet isn't about deprivation try
thinking<00:01:04.680><c> of</c><00:01:04.799><c> it</c><00:01:04.979><c> this</c><00:01:05.159><c> way</c>

00:01:05.929 --> 00:01:05.939 align:start position:0%
thinking of it this way
 

00:01:05.939 --> 00:01:08.510 align:start position:0%
thinking of it this way
every<00:01:06.659><c> time</c><00:01:06.900><c> you</c><00:01:07.200><c> add</c><00:01:07.439><c> these</c><00:01:07.740><c> foods</c><00:01:08.040><c> to</c><00:01:08.280><c> your</c>

00:01:08.510 --> 00:01:08.520 align:start position:0%
every time you add these foods to your
 

00:01:08.520 --> 00:01:11.149 align:start position:0%
every time you add these foods to your
meals<00:01:08.939><c> and</c><00:01:09.180><c> snacks</c><00:01:09.659><c> you're</c><00:01:10.380><c> supporting</c><00:01:10.860><c> the</c>

00:01:11.149 --> 00:01:11.159 align:start position:0%
meals and snacks you're supporting the
 

00:01:11.159 --> 00:01:13.910 align:start position:0%
meals and snacks you're supporting the
health<00:01:11.280><c> of</c><00:01:11.580><c> your</c><00:01:11.939><c> brain</c><00:01:12.240><c> and</c><00:01:13.080><c> your</c><00:01:13.320><c> ability</c><00:01:13.560><c> to</c>

00:01:13.910 --> 00:01:13.920 align:start position:0%
health of your brain and your ability to
 

00:01:13.920 --> 00:01:15.050 align:start position:0%
health of your brain and your ability to
remember

00:01:15.050 --> 00:01:15.060 align:start position:0%
remember
 

00:01:15.060 --> 00:01:19.370 align:start position:0%
remember
as<00:01:15.780><c> you</c><00:01:16.020><c> probably</c><00:01:16.260><c> already</c><00:01:16.799><c> know</c><00:01:17.479><c> exercise</c><00:01:18.479><c> is</c>

00:01:19.370 --> 00:01:19.380 align:start position:0%
as you probably already know exercise is
 

00:01:19.380 --> 00:01:22.670 align:start position:0%
as you probably already know exercise is
good<00:01:19.619><c> for</c><00:01:19.860><c> the</c><00:01:20.040><c> heart</c><00:01:20.240><c> and</c><00:01:21.240><c> in</c><00:01:21.600><c> addition</c><00:01:21.900><c> it</c>

00:01:22.670 --> 00:01:22.680 align:start position:0%
good for the heart and in addition it
 

00:01:22.680 --> 00:01:25.010 align:start position:0%
good for the heart and in addition it
might<00:01:22.920><c> be</c><00:01:23.220><c> the</c><00:01:23.520><c> most</c><00:01:23.700><c> powerfully</c><00:01:24.360><c> beneficial</c>

00:01:25.010 --> 00:01:25.020 align:start position:0%
might be the most powerfully beneficial
 

00:01:25.020 --> 00:01:27.469 align:start position:0%
might be the most powerfully beneficial
thing<00:01:25.320><c> we</c><00:01:25.619><c> can</c><00:01:25.799><c> do</c><00:01:26.040><c> for</c><00:01:26.640><c> the</c><00:01:26.820><c> health</c><00:01:27.000><c> of</c><00:01:27.240><c> our</c>

00:01:27.469 --> 00:01:27.479 align:start position:0%
thing we can do for the health of our
 

00:01:27.479 --> 00:01:28.670 align:start position:0%
thing we can do for the health of our
brains

00:01:28.670 --> 00:01:28.680 align:start position:0%
brains
 

00:01:28.680 --> 00:01:31.990 align:start position:0%
brains
it<00:01:29.159><c> helps</c><00:01:29.460><c> us</c><00:01:29.580><c> sleep</c><00:01:29.820><c> better</c><00:01:30.259><c> reduces</c><00:01:31.259><c> stress</c>

00:01:31.990 --> 00:01:32.000 align:start position:0%
it helps us sleep better reduces stress
 

00:01:32.000 --> 00:01:35.090 align:start position:0%
it helps us sleep better reduces stress
improves<00:01:33.000><c> heart</c><00:01:33.360><c> health</c><00:01:33.600><c> and</c><00:01:34.500><c> lowers</c><00:01:34.860><c> the</c>

00:01:35.090 --> 00:01:35.100 align:start position:0%
improves heart health and lowers the
 

00:01:35.100 --> 00:01:38.210 align:start position:0%
improves heart health and lowers the
risk<00:01:35.340><c> of</c><00:01:35.520><c> developing</c><00:01:36.000><c> Alzheimer's</c><00:01:37.220><c> aerobic</c>

00:01:38.210 --> 00:01:38.220 align:start position:0%
risk of developing Alzheimer's aerobic
 

00:01:38.220 --> 00:01:40.910 align:start position:0%
risk of developing Alzheimer's aerobic
exercise<00:01:38.640><c> has</c><00:01:39.479><c> been</c><00:01:39.720><c> correlated</c><00:01:40.259><c> with</c><00:01:40.619><c> less</c>

00:01:40.910 --> 00:01:40.920 align:start position:0%
exercise has been correlated with less
 

00:01:40.920 --> 00:01:43.310 align:start position:0%
exercise has been correlated with less
brain<00:01:41.340><c> shrinkage</c><00:01:41.880><c> and</c><00:01:42.479><c> lower</c><00:01:42.659><c> levels</c><00:01:43.140><c> of</c>

00:01:43.310 --> 00:01:43.320 align:start position:0%
brain shrinkage and lower levels of
 

00:01:43.320 --> 00:01:46.130 align:start position:0%
brain shrinkage and lower levels of
amyloid<00:01:44.040><c> A</c><00:01:44.820><c> protein</c><00:01:45.119><c> which</c><00:01:45.360><c> can</c><00:01:45.600><c> accumulate</c>

00:01:46.130 --> 00:01:46.140 align:start position:0%
amyloid A protein which can accumulate
 

00:01:46.140 --> 00:01:48.590 align:start position:0%
amyloid A protein which can accumulate
in<00:01:46.439><c> your</c><00:01:46.619><c> brain</c><00:01:46.799><c> and</c><00:01:46.979><c> cause</c><00:01:47.220><c> dementia</c>

00:01:48.590 --> 00:01:48.600 align:start position:0%
in your brain and cause dementia
 

00:01:48.600 --> 00:01:51.050 align:start position:0%
in your brain and cause dementia
again<00:01:49.380><c> if</c><00:01:49.740><c> I</c><00:01:49.920><c> had</c><00:01:50.040><c> a</c><00:01:50.220><c> pill</c><00:01:50.340><c> that</c><00:01:50.640><c> did</c><00:01:50.820><c> this</c>

00:01:51.050 --> 00:01:51.060 align:start position:0%
again if I had a pill that did this
 

00:01:51.060 --> 00:01:55.069 align:start position:0%
again if I had a pill that did this
you'd<00:01:51.960><c> all</c><00:01:52.140><c> take</c><00:01:52.380><c> it</c><00:01:52.700><c> even</c><00:01:53.700><c> a</c><00:01:54.060><c> 30</c><00:01:54.180><c> minute</c><00:01:54.479><c> brisk</c>

00:01:55.069 --> 00:01:55.079 align:start position:0%
you'd all take it even a 30 minute brisk
 

00:01:55.079 --> 00:01:58.310 align:start position:0%
you'd all take it even a 30 minute brisk
walk<00:01:55.259><c> five</c><00:01:56.100><c> days</c><00:01:56.340><c> a</c><00:01:56.579><c> week</c><00:01:56.759><c> may</c><00:01:57.600><c> be</c><00:01:57.720><c> enough</c><00:01:57.960><c> to</c>

00:01:58.310 --> 00:01:58.320 align:start position:0%
walk five days a week may be enough to
 

00:01:58.320 --> 00:02:00.950 align:start position:0%
walk five days a week may be enough to
see<00:01:58.500><c> this</c><00:01:58.740><c> benefit</c><00:01:59.060><c> if</c><00:02:00.060><c> I</c><00:02:00.299><c> haven't</c><00:02:00.420><c> convinced</c>

00:02:00.950 --> 00:02:00.960 align:start position:0%
see this benefit if I haven't convinced
 

00:02:00.960 --> 00:02:03.289 align:start position:0%
see this benefit if I haven't convinced
you<00:02:01.079><c> to</c><00:02:01.259><c> get</c><00:02:01.380><c> up</c><00:02:01.560><c> and</c><00:02:01.680><c> move</c><00:02:01.860><c> yet</c><00:02:02.159><c> here's</c><00:02:03.060><c> one</c>

00:02:03.289 --> 00:02:03.299 align:start position:0%
you to get up and move yet here's one
 

00:02:03.299 --> 00:02:07.490 align:start position:0%
you to get up and move yet here's one
more<00:02:03.479><c> shot</c><00:02:03.780><c> at</c><00:02:04.079><c> it</c><00:02:04.460><c> APO</c><00:02:05.460><c> E4</c><00:02:05.880><c> is</c><00:02:06.540><c> a</c><00:02:06.719><c> gene</c><00:02:07.079><c> variant</c>

00:02:07.490 --> 00:02:07.500 align:start position:0%
more shot at it APO E4 is a gene variant
 

00:02:07.500 --> 00:02:09.710 align:start position:0%
more shot at it APO E4 is a gene variant
associated<00:02:08.220><c> with</c><00:02:08.580><c> an</c><00:02:08.819><c> increased</c><00:02:09.300><c> risk</c><00:02:09.599><c> of</c>

00:02:09.710 --> 00:02:09.720 align:start position:0%
associated with an increased risk of
 

00:02:09.720 --> 00:02:13.369 align:start position:0%
associated with an increased risk of
Alzheimer's<00:02:10.580><c> in</c><00:02:11.580><c> one</c><00:02:11.760><c> study</c><00:02:12.120><c> older</c><00:02:12.900><c> adults</c>

00:02:13.369 --> 00:02:13.379 align:start position:0%
Alzheimer's in one study older adults
 

00:02:13.379 --> 00:02:15.949 align:start position:0%
Alzheimer's in one study older adults
with<00:02:13.620><c> either</c><00:02:13.860><c> one</c><00:02:14.220><c> or</c><00:02:14.400><c> two</c><00:02:14.580><c> copies</c><00:02:14.879><c> of</c><00:02:15.060><c> apoe4</c>

00:02:15.949 --> 00:02:15.959 align:start position:0%
with either one or two copies of apoe4
 

00:02:15.959 --> 00:02:18.110 align:start position:0%
with either one or two copies of apoe4
were<00:02:16.739><c> found</c><00:02:16.980><c> to</c><00:02:17.220><c> have</c><00:02:17.400><c> a</c><00:02:17.700><c> three</c><00:02:17.879><c> percent</c>

00:02:18.110 --> 00:02:18.120 align:start position:0%
were found to have a three percent
 

00:02:18.120 --> 00:02:21.350 align:start position:0%
were found to have a three percent
decrease<00:02:18.660><c> in</c><00:02:19.020><c> hippocampus</c><00:02:19.800><c> size</c><00:02:20.040><c> over</c><00:02:20.700><c> 1.5</c>

00:02:21.350 --> 00:02:21.360 align:start position:0%
decrease in hippocampus size over 1.5
 

00:02:21.360 --> 00:02:22.630 align:start position:0%
decrease in hippocampus size over 1.5
years

00:02:22.630 --> 00:02:22.640 align:start position:0%
years
 

00:02:22.640 --> 00:02:25.850 align:start position:0%
years
only<00:02:23.640><c> if</c><00:02:24.180><c> they</c><00:02:24.540><c> were</c><00:02:24.720><c> sedentary</c>

00:02:25.850 --> 00:02:25.860 align:start position:0%
only if they were sedentary
 

00:02:25.860 --> 00:02:28.550 align:start position:0%
only if they were sedentary
if<00:02:26.459><c> they</c><00:02:26.700><c> exercised</c><00:02:27.360><c> they</c><00:02:28.020><c> showed</c><00:02:28.379><c> no</c>

00:02:28.550 --> 00:02:28.560 align:start position:0%
if they exercised they showed no
 

00:02:28.560 --> 00:02:30.350 align:start position:0%
if they exercised they showed no
hippocampal<00:02:29.220><c> shrinkage</c>

00:02:30.350 --> 00:02:30.360 align:start position:0%
hippocampal shrinkage
 

00:02:30.360 --> 00:02:32.570 align:start position:0%
hippocampal shrinkage
so<00:02:30.780><c> if</c><00:02:31.080><c> you</c><00:02:31.319><c> have</c><00:02:31.560><c> an</c><00:02:31.800><c> increased</c><00:02:32.220><c> risk</c><00:02:32.459><c> of</c>

00:02:32.570 --> 00:02:32.580 align:start position:0%
so if you have an increased risk of
 

00:02:32.580 --> 00:02:35.990 align:start position:0%
so if you have an increased risk of
Alzheimer's<00:02:33.300><c> and</c><00:02:33.900><c> you</c><00:02:34.080><c> sit</c><00:02:34.379><c> all</c><00:02:34.739><c> day</c><00:02:34.920><c> the</c><00:02:35.819><c> part</c>

00:02:35.990 --> 00:02:36.000 align:start position:0%
Alzheimer's and you sit all day the part
 

00:02:36.000 --> 00:02:38.089 align:start position:0%
Alzheimer's and you sit all day the part
of<00:02:36.180><c> your</c><00:02:36.360><c> brain</c><00:02:36.599><c> That's</c><00:02:36.900><c> essential</c><00:02:37.560><c> for</c><00:02:37.860><c> the</c>

00:02:38.089 --> 00:02:38.099 align:start position:0%
of your brain That's essential for the
 

00:02:38.099 --> 00:02:40.250 align:start position:0%
of your brain That's essential for the
formation<00:02:38.580><c> of</c><00:02:39.060><c> new</c><00:02:39.300><c> consciously</c><00:02:39.840><c> held</c>

00:02:40.250 --> 00:02:40.260 align:start position:0%
formation of new consciously held
 

00:02:40.260 --> 00:02:42.830 align:start position:0%
formation of new consciously held
memories<00:02:40.680><c> May</c><00:02:41.640><c> shrink</c>

00:02:42.830 --> 00:02:42.840 align:start position:0%
memories May shrink
 

00:02:42.840 --> 00:02:45.170 align:start position:0%
memories May shrink
but<00:02:43.200><c> if</c><00:02:43.319><c> you</c><00:02:43.440><c> get</c><00:02:43.620><c> up</c><00:02:43.800><c> and</c><00:02:44.040><c> move</c><00:02:44.280><c> you</c><00:02:45.060><c> can</c>

00:02:45.170 --> 00:02:45.180 align:start position:0%
but if you get up and move you can
 

00:02:45.180 --> 00:02:48.350 align:start position:0%
but if you get up and move you can
potentially<00:02:45.599><c> protect</c><00:02:46.260><c> your</c><00:02:46.440><c> hippocampus</c><00:02:47.360><c> and</c>

00:02:48.350 --> 00:02:48.360 align:start position:0%
potentially protect your hippocampus and
 

00:02:48.360 --> 00:02:52.280 align:start position:0%
potentially protect your hippocampus and
your<00:02:48.599><c> ability</c><00:02:48.840><c> to</c><00:02:49.200><c> create</c><00:02:49.440><c> new</c><00:02:49.800><c> memories</c>


```

# How to boost your brain and memory/Context Matters.en.vtt

```vtt
WEBVTT
Kind: captions
Language: en

00:00:06.740 --> 00:00:09.770 align:start position:0%
 
we<00:00:07.740><c> all</c><00:00:07.919><c> experience</c><00:00:08.460><c> walking</c><00:00:08.940><c> into</c><00:00:09.300><c> a</c><00:00:09.599><c> room</c>

00:00:09.770 --> 00:00:09.780 align:start position:0%
we all experience walking into a room
 

00:00:09.780 --> 00:00:12.110 align:start position:0%
we all experience walking into a room
only<00:00:10.620><c> to</c><00:00:10.980><c> scratch</c><00:00:11.340><c> our</c><00:00:11.519><c> heads</c><00:00:11.940><c> and</c>

00:00:12.110 --> 00:00:12.120 align:start position:0%
only to scratch our heads and
 

00:00:12.120 --> 00:00:13.730 align:start position:0%
only to scratch our heads and
dumbfounded<00:00:12.780><c> Wonder</c>

00:00:13.730 --> 00:00:13.740 align:start position:0%
dumbfounded Wonder
 

00:00:13.740 --> 00:00:15.890 align:start position:0%
dumbfounded Wonder
why<00:00:14.400><c> am</c><00:00:14.519><c> I</c><00:00:14.700><c> here</c>

00:00:15.890 --> 00:00:15.900 align:start position:0%
why am I here
 

00:00:15.900 --> 00:00:17.930 align:start position:0%
why am I here
why<00:00:16.440><c> does</c><00:00:16.619><c> this</c><00:00:16.859><c> happen</c>

00:00:17.930 --> 00:00:17.940 align:start position:0%
why does this happen
 

00:00:17.940 --> 00:00:20.090 align:start position:0%
why does this happen
let's<00:00:18.420><c> say</c><00:00:18.600><c> I'm</c><00:00:18.840><c> getting</c><00:00:19.080><c> ready</c><00:00:19.260><c> to</c><00:00:19.500><c> pay</c><00:00:19.680><c> bills</c>

00:00:20.090 --> 00:00:20.100 align:start position:0%
let's say I'm getting ready to pay bills
 

00:00:20.100 --> 00:00:22.609 align:start position:0%
let's say I'm getting ready to pay bills
in<00:00:20.279><c> my</c><00:00:20.460><c> home</c><00:00:20.640><c> office</c><00:00:20.880><c> I've</c><00:00:21.720><c> got</c><00:00:21.900><c> the</c><00:00:22.140><c> stack</c><00:00:22.439><c> of</c>

00:00:22.609 --> 00:00:22.619 align:start position:0%
in my home office I've got the stack of
 

00:00:22.619 --> 00:00:25.370 align:start position:0%
in my home office I've got the stack of
bills<00:00:23.039><c> my</c><00:00:23.400><c> checkbook</c><00:00:23.880><c> pen</c><00:00:24.300><c> envelopes</c><00:00:25.140><c> return</c>

00:00:25.370 --> 00:00:25.380 align:start position:0%
bills my checkbook pen envelopes return
 

00:00:25.380 --> 00:00:27.950 align:start position:0%
bills my checkbook pen envelopes return
address<00:00:25.800><c> labels</c><00:00:26.400><c> but</c><00:00:27.240><c> I</c><00:00:27.359><c> realize</c><00:00:27.660><c> I</c><00:00:27.840><c> don't</c>

00:00:27.950 --> 00:00:27.960 align:start position:0%
address labels but I realize I don't
 

00:00:27.960 --> 00:00:30.290 align:start position:0%
address labels but I realize I don't
have<00:00:28.080><c> any</c><00:00:28.260><c> stamps</c><00:00:28.800><c> I</c><00:00:29.580><c> think</c><00:00:29.699><c> I</c><00:00:29.820><c> left</c><00:00:29.939><c> them</c><00:00:30.119><c> in</c>

00:00:30.290 --> 00:00:30.300 align:start position:0%
have any stamps I think I left them in
 

00:00:30.300 --> 00:00:32.810 align:start position:0%
have any stamps I think I left them in
the<00:00:30.420><c> kitchen</c><00:00:30.599><c> I</c><00:00:31.439><c> walk</c><00:00:31.619><c> into</c><00:00:31.859><c> the</c><00:00:32.099><c> kitchen</c><00:00:32.279><c> and</c>

00:00:32.810 --> 00:00:32.820 align:start position:0%
the kitchen I walk into the kitchen and
 

00:00:32.820 --> 00:00:35.930 align:start position:0%
the kitchen I walk into the kitchen and
I<00:00:33.780><c> have</c><00:00:33.960><c> no</c><00:00:34.260><c> idea</c><00:00:34.620><c> why</c><00:00:34.860><c> I'm</c><00:00:35.040><c> in</c><00:00:35.219><c> there</c>

00:00:35.930 --> 00:00:35.940 align:start position:0%
I have no idea why I'm in there
 

00:00:35.940 --> 00:00:40.850 align:start position:0%
I have no idea why I'm in there
am<00:00:36.480><c> I</c><00:00:36.719><c> hungry</c><00:00:37.079><c> am</c><00:00:37.680><c> I</c><00:00:37.920><c> thirsty</c><00:00:38.660><c> no</c><00:00:39.660><c> I</c><00:00:40.320><c> go</c><00:00:40.500><c> back</c><00:00:40.680><c> to</c>

00:00:40.850 --> 00:00:40.860 align:start position:0%
am I hungry am I thirsty no I go back to
 

00:00:40.860 --> 00:00:43.069 align:start position:0%
am I hungry am I thirsty no I go back to
my<00:00:41.040><c> office</c><00:00:41.219><c> and</c><00:00:41.700><c> the</c><00:00:41.940><c> second</c><00:00:42.120><c> I</c><00:00:42.420><c> arrive</c><00:00:42.840><c> I</c>

00:00:43.069 --> 00:00:43.079 align:start position:0%
my office and the second I arrive I
 

00:00:43.079 --> 00:00:45.650 align:start position:0%
my office and the second I arrive I
remember<00:00:43.320><c> stamps</c>

00:00:45.650 --> 00:00:45.660 align:start position:0%
remember stamps
 

00:00:45.660 --> 00:00:48.770 align:start position:0%
remember stamps
what<00:00:46.260><c> happened</c><00:00:46.440><c> here</c><00:00:46.879><c> I</c><00:00:47.879><c> literally</c><00:00:48.180><c> had</c><00:00:48.539><c> the</c>

00:00:48.770 --> 00:00:48.780 align:start position:0%
what happened here I literally had the
 

00:00:48.780 --> 00:00:50.690 align:start position:0%
what happened here I literally had the
thought<00:00:48.960><c> go</c><00:00:49.559><c> get</c><00:00:49.800><c> stamps</c><00:00:50.340><c> in</c><00:00:50.399><c> the</c><00:00:50.579><c> kitchen</c>

00:00:50.690 --> 00:00:50.700 align:start position:0%
thought go get stamps in the kitchen
 

00:00:50.700 --> 00:00:53.510 align:start position:0%
thought go get stamps in the kitchen
only<00:00:51.180><c> seconds</c><00:00:51.660><c> before</c><00:00:52.260><c> I</c><00:00:52.620><c> physically</c><00:00:52.980><c> arrived</c>

00:00:53.510 --> 00:00:53.520 align:start position:0%
only seconds before I physically arrived
 

00:00:53.520 --> 00:00:54.350 align:start position:0%
only seconds before I physically arrived
there

00:00:54.350 --> 00:00:54.360 align:start position:0%
there
 

00:00:54.360 --> 00:00:57.250 align:start position:0%
there
how<00:00:54.899><c> did</c><00:00:55.079><c> this</c><00:00:55.260><c> thought</c><00:00:55.559><c> this</c><00:00:56.399><c> memory</c>

00:00:57.250 --> 00:00:57.260 align:start position:0%
how did this thought this memory
 

00:00:57.260 --> 00:01:00.410 align:start position:0%
how did this thought this memory
evaporate<00:00:58.260><c> so</c><00:00:58.680><c> quickly</c><00:00:58.980><c> from</c><00:00:59.280><c> my</c><00:00:59.520><c> mind</c>

00:01:00.410 --> 00:01:00.420 align:start position:0%
evaporate so quickly from my mind
 

00:01:00.420 --> 00:01:02.930 align:start position:0%
evaporate so quickly from my mind
and<00:01:00.960><c> why</c><00:01:01.199><c> did</c><00:01:01.379><c> my</c><00:01:01.620><c> memory</c><00:01:01.860><c> of</c><00:01:02.039><c> what</c><00:01:02.280><c> I</c><00:01:02.460><c> intended</c>

00:01:02.930 --> 00:01:02.940 align:start position:0%
and why did my memory of what I intended
 

00:01:02.940 --> 00:01:05.630 align:start position:0%
and why did my memory of what I intended
to<00:01:03.120><c> do</c><00:01:03.300><c> fail</c><00:01:03.719><c> in</c><00:01:04.019><c> the</c><00:01:04.199><c> kitchen</c><00:01:04.379><c> but</c><00:01:05.220><c> succeed</c>

00:01:05.630 --> 00:01:05.640 align:start position:0%
to do fail in the kitchen but succeed
 

00:01:05.640 --> 00:01:08.590 align:start position:0%
to do fail in the kitchen but succeed
moments<00:01:06.180><c> later</c><00:01:06.299><c> in</c><00:01:06.600><c> the</c><00:01:06.780><c> office</c>

00:01:08.590 --> 00:01:08.600 align:start position:0%
moments later in the office
 

00:01:08.600 --> 00:01:11.090 align:start position:0%
moments later in the office
the<00:01:09.600><c> biggest</c><00:01:09.780><c> reason</c><00:01:10.200><c> has</c><00:01:10.560><c> to</c><00:01:10.740><c> do</c><00:01:10.799><c> with</c>

00:01:11.090 --> 00:01:11.100 align:start position:0%
the biggest reason has to do with
 

00:01:11.100 --> 00:01:14.450 align:start position:0%
the biggest reason has to do with
context<00:01:11.960><c> memory</c><00:01:12.960><c> retrieval</c><00:01:13.560><c> is</c><00:01:13.979><c> easier</c>

00:01:14.450 --> 00:01:14.460 align:start position:0%
context memory retrieval is easier
 

00:01:14.460 --> 00:01:17.570 align:start position:0%
context memory retrieval is easier
faster<00:01:15.420><c> and</c><00:01:16.080><c> more</c><00:01:16.320><c> likely</c><00:01:16.619><c> to</c><00:01:16.920><c> be</c><00:01:17.159><c> fully</c>

00:01:17.570 --> 00:01:17.580 align:start position:0%
faster and more likely to be fully
 

00:01:17.580 --> 00:01:20.289 align:start position:0%
faster and more likely to be fully
summoned<00:01:18.060><c> when</c><00:01:18.659><c> the</c><00:01:18.900><c> context</c><00:01:19.320><c> of</c><00:01:19.619><c> recall</c>

00:01:20.289 --> 00:01:20.299 align:start position:0%
summoned when the context of recall
 

00:01:20.299 --> 00:01:23.030 align:start position:0%
summoned when the context of recall
matches<00:01:21.299><c> the</c><00:01:21.600><c> context</c><00:01:22.020><c> that</c><00:01:22.380><c> was</c><00:01:22.560><c> present</c>

00:01:23.030 --> 00:01:23.040 align:start position:0%
matches the context that was present
 

00:01:23.040 --> 00:01:25.730 align:start position:0%
matches the context that was present
when<00:01:23.520><c> the</c><00:01:23.700><c> memory</c><00:01:24.000><c> was</c><00:01:24.299><c> formed</c><00:01:24.780><c> in</c><00:01:25.619><c> the</c>

00:01:25.730 --> 00:01:25.740 align:start position:0%
when the memory was formed in the
 

00:01:25.740 --> 00:01:28.490 align:start position:0%
when the memory was formed in the
example<00:01:26.159><c> I</c><00:01:26.400><c> just</c><00:01:26.640><c> gave</c><00:01:26.939><c> the</c><00:01:27.720><c> memory</c><00:01:28.020><c> for</c><00:01:28.259><c> what</c>

00:01:28.490 --> 00:01:28.500 align:start position:0%
example I just gave the memory for what
 

00:01:28.500 --> 00:01:30.590 align:start position:0%
example I just gave the memory for what
I<00:01:28.740><c> wanted</c><00:01:28.979><c> when</c><00:01:29.759><c> you</c><00:01:29.880><c> get</c><00:01:30.060><c> to</c><00:01:30.180><c> the</c><00:01:30.420><c> kitchen</c>

00:01:30.590 --> 00:01:30.600 align:start position:0%
I wanted when you get to the kitchen
 

00:01:30.600 --> 00:01:34.090 align:start position:0%
I wanted when you get to the kitchen
find<00:01:31.259><c> stamps</c><00:01:31.979><c> was</c><00:01:32.640><c> encoded</c><00:01:33.180><c> in</c><00:01:33.360><c> my</c><00:01:33.659><c> office</c>

00:01:34.090 --> 00:01:34.100 align:start position:0%
find stamps was encoded in my office
 

00:01:34.100 --> 00:01:37.190 align:start position:0%
find stamps was encoded in my office
surrounded<00:01:35.100><c> by</c><00:01:35.460><c> a</c><00:01:35.700><c> specific</c><00:01:36.000><c> context</c><00:01:36.720><c> and</c>

00:01:37.190 --> 00:01:37.200 align:start position:0%
surrounded by a specific context and
 

00:01:37.200 --> 00:01:40.490 align:start position:0%
surrounded by a specific context and
cues<00:01:37.680><c> my</c><00:01:38.460><c> desk</c><00:01:38.820><c> the</c><00:01:39.299><c> stack</c><00:01:39.540><c> of</c><00:01:39.720><c> bills</c><00:01:40.200><c> the</c>

00:01:40.490 --> 00:01:40.500 align:start position:0%
cues my desk the stack of bills the
 

00:01:40.500 --> 00:01:42.230 align:start position:0%
cues my desk the stack of bills the
checkbook<00:01:40.920><c> and</c><00:01:41.159><c> envelopes</c>

00:01:42.230 --> 00:01:42.240 align:start position:0%
checkbook and envelopes
 

00:01:42.240 --> 00:01:44.810 align:start position:0%
checkbook and envelopes
when<00:01:42.780><c> I</c><00:01:42.960><c> arrived</c><00:01:43.259><c> in</c><00:01:43.439><c> the</c><00:01:43.560><c> kitchen</c><00:01:43.740><c> there</c><00:01:44.640><c> was</c>

00:01:44.810 --> 00:01:44.820 align:start position:0%
when I arrived in the kitchen there was
 

00:01:44.820 --> 00:01:46.630 align:start position:0%
when I arrived in the kitchen there was
nothing<00:01:45.119><c> to</c><00:01:45.479><c> remind</c><00:01:45.659><c> me</c><00:01:45.900><c> of</c><00:01:46.079><c> what</c><00:01:46.259><c> I</c><00:01:46.439><c> wanted</c>

00:01:46.630 --> 00:01:46.640 align:start position:0%
nothing to remind me of what I wanted
 

00:01:46.640 --> 00:01:49.550 align:start position:0%
nothing to remind me of what I wanted
the<00:01:47.640><c> refrigerator</c><00:01:48.180><c> the</c><00:01:48.720><c> stove</c><00:01:48.960><c> the</c><00:01:49.380><c> tea</c>

00:01:49.550 --> 00:01:49.560 align:start position:0%
the refrigerator the stove the tea
 

00:01:49.560 --> 00:01:52.190 align:start position:0%
the refrigerator the stove the tea
kettle<00:01:50.040><c> there</c><00:01:50.880><c> were</c><00:01:51.000><c> no</c><00:01:51.180><c> cues</c><00:01:51.659><c> in</c><00:01:51.840><c> the</c><00:01:52.020><c> kitchen</c>

00:01:52.190 --> 00:01:52.200 align:start position:0%
kettle there were no cues in the kitchen
 

00:01:52.200 --> 00:01:54.770 align:start position:0%
kettle there were no cues in the kitchen
other<00:01:53.040><c> than</c><00:01:53.340><c> the</c><00:01:53.520><c> stamps</c><00:01:54.000><c> which</c><00:01:54.119><c> I</c><00:01:54.360><c> didn't</c><00:01:54.479><c> see</c>

00:01:54.770 --> 00:01:54.780 align:start position:0%
other than the stamps which I didn't see
 

00:01:54.780 --> 00:01:57.350 align:start position:0%
other than the stamps which I didn't see
to<00:01:55.560><c> trigger</c><00:01:55.920><c> the</c><00:01:56.159><c> memory</c><00:01:56.460><c> of</c><00:01:56.640><c> what</c><00:01:56.880><c> I</c><00:01:57.000><c> needed</c>

00:01:57.350 --> 00:01:57.360 align:start position:0%
to trigger the memory of what I needed
 

00:01:57.360 --> 00:02:00.230 align:start position:0%
to trigger the memory of what I needed
and<00:01:58.079><c> what's</c><00:01:58.320><c> more</c><00:01:58.560><c> these</c><00:01:59.520><c> kitchen</c><00:01:59.640><c> cues</c>

00:02:00.230 --> 00:02:00.240 align:start position:0%
and what's more these kitchen cues
 

00:02:00.240 --> 00:02:03.350 align:start position:0%
and what's more these kitchen cues
actually<00:02:00.780><c> misdirected</c><00:02:01.680><c> the</c><00:02:01.860><c> hunt</c><00:02:02.180><c> sending</c><00:02:03.180><c> me</c>

00:02:03.350 --> 00:02:03.360 align:start position:0%
actually misdirected the hunt sending me
 

00:02:03.360 --> 00:02:05.270 align:start position:0%
actually misdirected the hunt sending me
down<00:02:03.659><c> neural</c><00:02:04.079><c> Pathways</c><00:02:04.619><c> in</c><00:02:04.799><c> my</c><00:02:04.979><c> brain</c>

00:02:05.270 --> 00:02:05.280 align:start position:0%
down neural Pathways in my brain
 

00:02:05.280 --> 00:02:08.529 align:start position:0%
down neural Pathways in my brain
associated<00:02:06.180><c> with</c><00:02:06.540><c> meals</c><00:02:07.079><c> or</c><00:02:07.560><c> a</c><00:02:07.680><c> cup</c><00:02:07.799><c> of</c><00:02:07.979><c> tea</c>

00:02:08.529 --> 00:02:08.539 align:start position:0%
associated with meals or a cup of tea
 

00:02:08.539 --> 00:02:11.390 align:start position:0%
associated with meals or a cup of tea
neural<00:02:09.539><c> circuits</c><00:02:10.080><c> that</c><00:02:10.259><c> would</c><00:02:10.619><c> not</c><00:02:10.920><c> lead</c><00:02:11.160><c> to</c>

00:02:11.390 --> 00:02:11.400 align:start position:0%
neural circuits that would not lead to
 

00:02:11.400 --> 00:02:12.650 align:start position:0%
neural circuits that would not lead to
stamps

00:02:12.650 --> 00:02:12.660 align:start position:0%
stamps
 

00:02:12.660 --> 00:02:15.250 align:start position:0%
stamps
the<00:02:13.379><c> context</c><00:02:13.680><c> of</c><00:02:13.920><c> the</c><00:02:14.160><c> kitchen</c><00:02:14.280><c> instead</c>

00:02:15.250 --> 00:02:15.260 align:start position:0%
the context of the kitchen instead
 

00:02:15.260 --> 00:02:17.449 align:start position:0%
the context of the kitchen instead
interfered<00:02:16.260><c> with</c><00:02:16.500><c> my</c><00:02:16.739><c> ability</c><00:02:17.040><c> to</c><00:02:17.340><c> remember</c>

00:02:17.449 --> 00:02:17.459 align:start position:0%
interfered with my ability to remember
 

00:02:17.459 --> 00:02:19.430 align:start position:0%
interfered with my ability to remember
what<00:02:17.819><c> I</c><00:02:18.000><c> went</c><00:02:18.120><c> in</c><00:02:18.300><c> there</c><00:02:18.480><c> for</c>

00:02:19.430 --> 00:02:19.440 align:start position:0%
what I went in there for
 

00:02:19.440 --> 00:02:21.830 align:start position:0%
what I went in there for
as<00:02:19.920><c> soon</c><00:02:20.099><c> as</c><00:02:20.220><c> I</c><00:02:20.400><c> returned</c><00:02:20.700><c> to</c><00:02:20.760><c> my</c><00:02:21.060><c> office</c><00:02:21.180><c> I</c><00:02:21.720><c> was</c>

00:02:21.830 --> 00:02:21.840 align:start position:0%
as soon as I returned to my office I was
 

00:02:21.840 --> 00:02:23.510 align:start position:0%
as soon as I returned to my office I was
looking<00:02:22.020><c> at</c><00:02:22.319><c> all</c><00:02:22.680><c> the</c><00:02:22.800><c> cues</c><00:02:23.160><c> that</c><00:02:23.340><c> were</c>

00:02:23.510 --> 00:02:23.520 align:start position:0%
looking at all the cues that were
 

00:02:23.520 --> 00:02:26.210 align:start position:0%
looking at all the cues that were
present<00:02:23.819><c> when</c><00:02:24.060><c> I</c><00:02:24.180><c> created</c><00:02:24.540><c> the</c><00:02:24.900><c> intention</c><00:02:25.260><c> and</c>

00:02:26.210 --> 00:02:26.220 align:start position:0%
present when I created the intention and
 

00:02:26.220 --> 00:02:28.850 align:start position:0%
present when I created the intention and
retrieval<00:02:26.760><c> was</c><00:02:27.120><c> now</c><00:02:27.420><c> effortless</c><00:02:28.260><c> and</c>

00:02:28.850 --> 00:02:28.860 align:start position:0%
retrieval was now effortless and
 

00:02:28.860 --> 00:02:29.930 align:start position:0%
retrieval was now effortless and
immediate

00:02:29.930 --> 00:02:29.940 align:start position:0%
immediate
 

00:02:29.940 --> 00:02:32.510 align:start position:0%
immediate
so<00:02:30.420><c> the</c><00:02:30.660><c> next</c><00:02:30.840><c> time</c><00:02:31.260><c> you</c><00:02:31.560><c> walk</c><00:02:31.800><c> into</c><00:02:31.980><c> a</c><00:02:32.340><c> room</c>

00:02:32.510 --> 00:02:32.520 align:start position:0%
so the next time you walk into a room
 

00:02:32.520 --> 00:02:34.910 align:start position:0%
so the next time you walk into a room
and<00:02:33.120><c> cannot</c><00:02:33.540><c> for</c><00:02:33.780><c> the</c><00:02:33.959><c> life</c><00:02:34.200><c> of</c><00:02:34.440><c> you</c><00:02:34.560><c> remember</c>

00:02:34.910 --> 00:02:34.920 align:start position:0%
and cannot for the life of you remember
 

00:02:34.920 --> 00:02:38.390 align:start position:0%
and cannot for the life of you remember
why<00:02:35.459><c> you're</c><00:02:35.640><c> in</c><00:02:35.879><c> there</c><00:02:36.060><c> don't</c><00:02:36.840><c> panic</c><00:02:37.440><c> what</c>

00:02:38.390 --> 00:02:38.400 align:start position:0%
why you're in there don't panic what
 

00:02:38.400 --> 00:02:40.910 align:start position:0%
why you're in there don't panic what
you're<00:02:38.640><c> experiencing</c><00:02:39.420><c> is</c><00:02:39.720><c> normal</c>

00:02:40.910 --> 00:02:40.920 align:start position:0%
you're experiencing is normal
 

00:02:40.920 --> 00:02:43.070 align:start position:0%
you're experiencing is normal
go<00:02:41.519><c> back</c><00:02:41.700><c> to</c><00:02:41.879><c> the</c><00:02:42.060><c> room</c><00:02:42.180><c> you</c><00:02:42.420><c> were</c><00:02:42.599><c> just</c><00:02:42.840><c> in</c>

00:02:43.070 --> 00:02:43.080 align:start position:0%
go back to the room you were just in
 

00:02:43.080 --> 00:02:45.290 align:start position:0%
go back to the room you were just in
either<00:02:43.680><c> physically</c><00:02:44.220><c> or</c><00:02:44.459><c> in</c><00:02:44.640><c> your</c><00:02:44.819><c> mind's</c><00:02:45.180><c> eye</c>

00:02:45.290 --> 00:02:45.300 align:start position:0%
either physically or in your mind's eye
 

00:02:45.300 --> 00:02:48.350 align:start position:0%
either physically or in your mind's eye
and<00:02:45.720><c> look</c><00:02:45.900><c> around</c><00:02:46.459><c> the</c><00:02:47.459><c> context</c><00:02:47.879><c> should</c>

00:02:48.350 --> 00:02:48.360 align:start position:0%
and look around the context should
 

00:02:48.360 --> 00:02:52.400 align:start position:0%
and look around the context should
deliver<00:02:48.599><c> the</c><00:02:48.959><c> memory</c><00:02:49.319><c> of</c><00:02:49.860><c> what</c><00:02:50.099><c> you</c><00:02:50.220><c> wanted</c>


```

# How to boost your brain and memory/Episodic Memory.en.vtt

```vtt
WEBVTT
Kind: captions
Language: en

00:00:05.819 --> 00:00:08.690 align:start position:0%
 
there<00:00:06.779><c> is</c><00:00:07.020><c> more</c><00:00:07.259><c> to</c><00:00:07.500><c> being</c><00:00:07.680><c> smart</c><00:00:08.040><c> than</c><00:00:08.400><c> simply</c>

00:00:08.690 --> 00:00:08.700 align:start position:0%
there is more to being smart than simply
 

00:00:08.700 --> 00:00:11.450 align:start position:0%
there is more to being smart than simply
remembering<00:00:09.300><c> information</c><00:00:09.980><c> in</c><00:00:10.980><c> addition</c><00:00:11.219><c> to</c>

00:00:11.450 --> 00:00:11.460 align:start position:0%
remembering information in addition to
 

00:00:11.460 --> 00:00:13.490 align:start position:0%
remembering information in addition to
the<00:00:11.639><c> stuff</c><00:00:11.820><c> you</c><00:00:12.120><c> know</c><00:00:12.300><c> there</c><00:00:12.960><c> is</c><00:00:13.139><c> the</c><00:00:13.259><c> stuff</c>

00:00:13.490 --> 00:00:13.500 align:start position:0%
the stuff you know there is the stuff
 

00:00:13.500 --> 00:00:16.189 align:start position:0%
the stuff you know there is the stuff
that<00:00:13.860><c> happened</c><00:00:14.219><c> and</c><00:00:15.179><c> it's</c><00:00:15.299><c> the</c><00:00:15.540><c> integration</c>

00:00:16.189 --> 00:00:16.199 align:start position:0%
that happened and it's the integration
 

00:00:16.199 --> 00:00:18.650 align:start position:0%
that happened and it's the integration
of<00:00:16.560><c> the</c><00:00:16.740><c> information</c><00:00:16.920><c> you</c><00:00:17.520><c> know</c><00:00:17.760><c> with</c><00:00:18.359><c> the</c>

00:00:18.650 --> 00:00:18.660 align:start position:0%
of the information you know with the
 

00:00:18.660 --> 00:00:21.109 align:start position:0%
of the information you know with the
experiences<00:00:19.440><c> you've</c><00:00:19.859><c> lived</c><00:00:20.220><c> that</c><00:00:20.699><c> makes</c><00:00:20.880><c> you</c>

00:00:21.109 --> 00:00:21.119 align:start position:0%
experiences you've lived that makes you
 

00:00:21.119 --> 00:00:22.189 align:start position:0%
experiences you've lived that makes you
wise

00:00:22.189 --> 00:00:22.199 align:start position:0%
wise
 

00:00:22.199 --> 00:00:24.650 align:start position:0%
wise
now<00:00:22.980><c> we'll</c><00:00:23.460><c> focus</c><00:00:23.760><c> on</c><00:00:23.939><c> the</c><00:00:24.180><c> stuff</c><00:00:24.359><c> that</c>

00:00:24.650 --> 00:00:24.660 align:start position:0%
now we'll focus on the stuff that
 

00:00:24.660 --> 00:00:28.429 align:start position:0%
now we'll focus on the stuff that
happened<00:00:24.980><c> your</c><00:00:25.980><c> episodic</c><00:00:26.699><c> memory</c>

00:00:28.429 --> 00:00:28.439 align:start position:0%
happened your episodic memory
 

00:00:28.439 --> 00:00:31.669 align:start position:0%
happened your episodic memory
this<00:00:29.039><c> is</c><00:00:29.160><c> the</c><00:00:29.400><c> history</c><00:00:29.640><c> of</c><00:00:30.000><c> you</c><00:00:30.380><c> remembered</c><00:00:31.380><c> by</c>

00:00:31.669 --> 00:00:31.679 align:start position:0%
this is the history of you remembered by
 

00:00:31.679 --> 00:00:34.729 align:start position:0%
this is the history of you remembered by
you<00:00:32.180><c> these</c><00:00:33.180><c> memories</c><00:00:33.540><c> are</c><00:00:33.899><c> attached</c><00:00:34.260><c> to</c><00:00:34.440><c> a</c>

00:00:34.729 --> 00:00:34.739 align:start position:0%
you these memories are attached to a
 

00:00:34.739 --> 00:00:38.510 align:start position:0%
you these memories are attached to a
place<00:00:34.920><c> and</c><00:00:35.219><c> time</c><00:00:35.460><c> some</c><00:00:36.420><c> experiences</c><00:00:37.079><c> say</c><00:00:38.040><c> the</c>

00:00:38.510 --> 00:00:38.520 align:start position:0%
place and time some experiences say the
 

00:00:38.520 --> 00:00:40.510 align:start position:0%
place and time some experiences say the
first<00:00:38.640><c> dance</c><00:00:38.880><c> at</c><00:00:39.180><c> your</c><00:00:39.420><c> wedding</c><00:00:39.600><c> stick</c>

00:00:40.510 --> 00:00:40.520 align:start position:0%
first dance at your wedding stick
 

00:00:40.520 --> 00:00:44.569 align:start position:0%
first dance at your wedding stick
lasting<00:00:41.520><c> a</c><00:00:41.700><c> lifetime</c><00:00:42.320><c> whereas</c><00:00:43.320><c> others</c><00:00:43.920><c> like</c>

00:00:44.569 --> 00:00:44.579 align:start position:0%
lasting a lifetime whereas others like
 

00:00:44.579 --> 00:00:46.970 align:start position:0%
lasting a lifetime whereas others like
what<00:00:44.760><c> you</c><00:00:44.820><c> had</c><00:00:45.000><c> for</c><00:00:45.180><c> dinner</c><00:00:45.420><c> last</c><00:00:45.780><c> Monday</c><00:00:46.140><c> or</c>

00:00:46.970 --> 00:00:46.980 align:start position:0%
what you had for dinner last Monday or
 

00:00:46.980 --> 00:00:50.090 align:start position:0%
what you had for dinner last Monday or
yesterday's<00:00:47.520><c> commute</c><00:00:48.000><c> slip</c><00:00:48.960><c> away</c><00:00:49.100><c> totally</c>

00:00:50.090 --> 00:00:50.100 align:start position:0%
yesterday's commute slip away totally
 

00:00:50.100 --> 00:00:53.270 align:start position:0%
yesterday's commute slip away totally
unmemorable<00:00:51.360><c> can</c><00:00:51.960><c> you</c><00:00:52.140><c> recognize</c><00:00:52.620><c> what</c><00:00:53.100><c> all</c>

00:00:53.270 --> 00:00:53.280 align:start position:0%
unmemorable can you recognize what all
 

00:00:53.280 --> 00:00:55.369 align:start position:0%
unmemorable can you recognize what all
of<00:00:53.399><c> your</c><00:00:53.579><c> forgotten</c><00:00:54.120><c> life</c><00:00:54.360><c> experiences</c><00:00:55.020><c> have</c>

00:00:55.369 --> 00:00:55.379 align:start position:0%
of your forgotten life experiences have
 

00:00:55.379 --> 00:00:56.750 align:start position:0%
of your forgotten life experiences have
in<00:00:55.620><c> common</c>

00:00:56.750 --> 00:00:56.760 align:start position:0%
in common
 

00:00:56.760 --> 00:00:59.990 align:start position:0%
in common
they<00:00:57.360><c> are</c><00:00:57.539><c> routine</c><00:00:58.020><c> we</c><00:00:58.860><c> do</c><00:00:59.039><c> these</c><00:00:59.340><c> things</c><00:00:59.520><c> all</c>

00:00:59.990 --> 00:01:00.000 align:start position:0%
they are routine we do these things all
 

00:01:00.000 --> 00:01:01.250 align:start position:0%
they are routine we do these things all
the<00:01:00.239><c> time</c>

00:01:01.250 --> 00:01:01.260 align:start position:0%
the time
 

00:01:01.260 --> 00:01:03.590 align:start position:0%
the time
part<00:01:01.739><c> of</c><00:01:01.920><c> the</c><00:01:02.100><c> reason</c><00:01:02.280><c> I</c><00:01:02.760><c> won't</c><00:01:02.879><c> remember</c><00:01:03.180><c> the</c>

00:01:03.590 --> 00:01:03.600 align:start position:0%
part of the reason I won't remember the
 

00:01:03.600 --> 00:01:05.750 align:start position:0%
part of the reason I won't remember the
experience<00:01:03.960><c> of</c><00:01:04.379><c> washing</c><00:01:04.979><c> my</c><00:01:05.220><c> hair</c><00:01:05.400><c> this</c>

00:01:05.750 --> 00:01:05.760 align:start position:0%
experience of washing my hair this
 

00:01:05.760 --> 00:01:08.690 align:start position:0%
experience of washing my hair this
morning<00:01:05.880><c> has</c><00:01:06.600><c> to</c><00:01:06.720><c> do</c><00:01:06.840><c> with</c><00:01:07.080><c> habituation</c><00:01:07.799><c> we</c>

00:01:08.690 --> 00:01:08.700 align:start position:0%
morning has to do with habituation we
 

00:01:08.700 --> 00:01:11.030 align:start position:0%
morning has to do with habituation we
learn<00:01:08.880><c> to</c><00:01:09.180><c> ignore</c><00:01:09.540><c> what</c><00:01:09.840><c> is</c><00:01:10.020><c> familiar</c><00:01:10.439><c> and</c><00:01:10.860><c> of</c>

00:01:11.030 --> 00:01:11.040 align:start position:0%
learn to ignore what is familiar and of
 

00:01:11.040 --> 00:01:12.770 align:start position:0%
learn to ignore what is familiar and of
no<00:01:11.280><c> consequence</c>

00:01:12.770 --> 00:01:12.780 align:start position:0%
no consequence
 

00:01:12.780 --> 00:01:15.710 align:start position:0%
no consequence
and<00:01:13.200><c> we</c><00:01:13.380><c> can't</c><00:01:13.500><c> remember</c><00:01:13.799><c> what</c><00:01:14.280><c> we</c><00:01:14.460><c> ignore</c><00:01:14.820><c> we</c>

00:01:15.710 --> 00:01:15.720 align:start position:0%
and we can't remember what we ignore we
 

00:01:15.720 --> 00:01:17.870 align:start position:0%
and we can't remember what we ignore we
can<00:01:15.960><c> only</c><00:01:16.200><c> remember</c><00:01:16.560><c> what</c><00:01:17.220><c> we</c><00:01:17.340><c> pay</c><00:01:17.520><c> attention</c>

00:01:17.870 --> 00:01:17.880 align:start position:0%
can only remember what we pay attention
 

00:01:17.880 --> 00:01:19.250 align:start position:0%
can only remember what we pay attention
to

00:01:19.250 --> 00:01:19.260 align:start position:0%
to
 

00:01:19.260 --> 00:01:22.010 align:start position:0%
to
let's<00:01:19.979><c> say</c><00:01:20.220><c> every</c><00:01:20.820><c> morning</c><00:01:21.119><c> you</c><00:01:21.479><c> drink</c><00:01:21.659><c> coffee</c>

00:01:22.010 --> 00:01:22.020 align:start position:0%
let's say every morning you drink coffee
 

00:01:22.020 --> 00:01:24.950 align:start position:0%
let's say every morning you drink coffee
eat<00:01:22.740><c> a</c><00:01:22.920><c> sesame</c><00:01:23.220><c> bagel</c><00:01:23.640><c> with</c><00:01:23.759><c> cream</c><00:01:24.000><c> cheese</c><00:01:24.299><c> and</c>

00:01:24.950 --> 00:01:24.960 align:start position:0%
eat a sesame bagel with cream cheese and
 

00:01:24.960 --> 00:01:27.649 align:start position:0%
eat a sesame bagel with cream cheese and
read<00:01:25.140><c> the</c><00:01:25.320><c> newspaper</c><00:01:25.860><c> at</c><00:01:25.979><c> your</c><00:01:26.159><c> kitchen</c><00:01:26.280><c> table</c>

00:01:27.649 --> 00:01:27.659 align:start position:0%
read the newspaper at your kitchen table
 

00:01:27.659 --> 00:01:30.289 align:start position:0%
read the newspaper at your kitchen table
you<00:01:28.200><c> do</c><00:01:28.380><c> this</c><00:01:28.560><c> every</c><00:01:28.799><c> morning</c><00:01:29.060><c> week</c><00:01:30.060><c> after</c>

00:01:30.289 --> 00:01:30.299 align:start position:0%
you do this every morning week after
 

00:01:30.299 --> 00:01:32.210 align:start position:0%
you do this every morning week after
week<00:01:30.780><c> after</c><00:01:31.200><c> week</c>

00:01:32.210 --> 00:01:32.220 align:start position:0%
week after week
 

00:01:32.220 --> 00:01:34.730 align:start position:0%
week after week
you<00:01:32.820><c> probably</c><00:01:33.000><c> have</c><00:01:33.360><c> no</c><00:01:33.659><c> distinct</c><00:01:34.020><c> memory</c><00:01:34.380><c> of</c>

00:01:34.730 --> 00:01:34.740 align:start position:0%
you probably have no distinct memory of
 

00:01:34.740 --> 00:01:36.770 align:start position:0%
you probably have no distinct memory of
any<00:01:35.040><c> particular</c><00:01:35.460><c> morning</c><00:01:35.820><c> because</c><00:01:36.479><c> they're</c>

00:01:36.770 --> 00:01:36.780 align:start position:0%
any particular morning because they're
 

00:01:36.780 --> 00:01:38.810 align:start position:0%
any particular morning because they're
all<00:01:36.960><c> pretty</c><00:01:37.200><c> much</c><00:01:37.380><c> the</c><00:01:37.680><c> same</c>

00:01:38.810 --> 00:01:38.820 align:start position:0%
all pretty much the same
 

00:01:38.820 --> 00:01:41.510 align:start position:0%
all pretty much the same
now<00:01:39.540><c> let's</c><00:01:40.140><c> imagine</c><00:01:40.320><c> that</c><00:01:40.740><c> you</c><00:01:40.920><c> walk</c><00:01:41.100><c> into</c><00:01:41.280><c> the</c>

00:01:41.510 --> 00:01:41.520 align:start position:0%
now let's imagine that you walk into the
 

00:01:41.520 --> 00:01:44.569 align:start position:0%
now let's imagine that you walk into the
kitchen<00:01:41.640><c> this</c><00:01:42.000><c> morning</c><00:01:42.180><c> and</c><00:01:42.960><c> Elton</c><00:01:43.500><c> John</c><00:01:43.920><c> is</c>

00:01:44.569 --> 00:01:44.579 align:start position:0%
kitchen this morning and Elton John is
 

00:01:44.579 --> 00:01:47.810 align:start position:0%
kitchen this morning and Elton John is
cooking<00:01:44.939><c> pancakes</c><00:01:45.600><c> and</c><00:01:46.020><c> singing</c><00:01:46.439><c> cold</c><00:01:46.680><c> heart</c>

00:01:47.810 --> 00:01:47.820 align:start position:0%
cooking pancakes and singing cold heart
 

00:01:47.820 --> 00:01:51.170 align:start position:0%
cooking pancakes and singing cold heart
whoa<00:01:48.540><c> that</c><00:01:49.200><c> that</c><00:01:49.320><c> never</c><00:01:49.560><c> happened</c><00:01:49.860><c> before</c>

00:01:51.170 --> 00:01:51.180 align:start position:0%
whoa that that never happened before
 

00:01:51.180 --> 00:01:53.870 align:start position:0%
whoa that that never happened before
the<00:01:51.720><c> surprise</c><00:01:52.140><c> Factor</c><00:01:52.619><c> alone</c><00:01:52.860><c> is</c><00:01:53.460><c> enough</c><00:01:53.579><c> to</c>

00:01:53.870 --> 00:01:53.880 align:start position:0%
the surprise Factor alone is enough to
 

00:01:53.880 --> 00:01:55.370 align:start position:0%
the surprise Factor alone is enough to
kick<00:01:54.060><c> this</c><00:01:54.360><c> particular</c><00:01:54.720><c> morning</c><00:01:55.020><c> into</c>

00:01:55.370 --> 00:01:55.380 align:start position:0%
kick this particular morning into
 

00:01:55.380 --> 00:01:58.069 align:start position:0%
kick this particular morning into
memorable<00:01:55.860><c> for</c><00:01:56.220><c> life</c><00:01:56.579><c> but</c><00:01:57.360><c> you'll</c><00:01:57.720><c> also</c>

00:01:58.069 --> 00:01:58.079 align:start position:0%
memorable for life but you'll also
 

00:01:58.079 --> 00:02:00.710 align:start position:0%
memorable for life but you'll also
probably<00:01:58.320><c> tell</c><00:01:58.799><c> everyone</c><00:01:59.100><c> you</c><00:01:59.460><c> know</c><00:01:59.720><c> relaying</c>

00:02:00.710 --> 00:02:00.720 align:start position:0%
probably tell everyone you know relaying
 

00:02:00.720 --> 00:02:03.050 align:start position:0%
probably tell everyone you know relaying
the<00:02:00.840><c> story</c><00:02:01.140><c> over</c><00:02:01.560><c> and</c><00:02:01.920><c> over</c>

00:02:03.050 --> 00:02:03.060 align:start position:0%
the story over and over
 

00:02:03.060 --> 00:02:05.510 align:start position:0%
the story over and over
and<00:02:03.659><c> with</c><00:02:03.899><c> every</c><00:02:04.140><c> retelling</c><00:02:04.799><c> you</c><00:02:05.399><c> are</c>

00:02:05.510 --> 00:02:05.520 align:start position:0%
and with every retelling you are
 

00:02:05.520 --> 00:02:08.330 align:start position:0%
and with every retelling you are
reactivating<00:02:06.240><c> the</c><00:02:06.540><c> memory</c><00:02:07.160><c> reinforcing</c><00:02:08.160><c> the</c>

00:02:08.330 --> 00:02:08.340 align:start position:0%
reactivating the memory reinforcing the
 

00:02:08.340 --> 00:02:10.609 align:start position:0%
reactivating the memory reinforcing the
neural<00:02:08.700><c> Pathways</c><00:02:09.300><c> that</c><00:02:09.479><c> encode</c><00:02:09.840><c> the</c><00:02:10.140><c> details</c>

00:02:10.609 --> 00:02:10.619 align:start position:0%
neural Pathways that encode the details
 

00:02:10.619 --> 00:02:12.949 align:start position:0%
neural Pathways that encode the details
of<00:02:10.800><c> what</c><00:02:11.039><c> you</c><00:02:11.220><c> experienced</c><00:02:11.940><c> making</c><00:02:12.720><c> the</c>

00:02:12.949 --> 00:02:12.959 align:start position:0%
of what you experienced making the
 

00:02:12.959 --> 00:02:15.589 align:start position:0%
of what you experienced making the
memory<00:02:13.319><c> stronger</c><00:02:13.860><c> but</c><00:02:14.760><c> if</c><00:02:15.000><c> Elton</c><00:02:15.360><c> John</c>

00:02:15.589 --> 00:02:15.599 align:start position:0%
memory stronger but if Elton John
 

00:02:15.599 --> 00:02:17.830 align:start position:0%
memory stronger but if Elton John
continues<00:02:16.500><c> to</c><00:02:16.680><c> join</c><00:02:16.980><c> you</c><00:02:17.099><c> every</c><00:02:17.400><c> morning</c>

00:02:17.830 --> 00:02:17.840 align:start position:0%
continues to join you every morning
 

00:02:17.840 --> 00:02:20.809 align:start position:0%
continues to join you every morning
seeing<00:02:18.840><c> him</c><00:02:18.959><c> is</c><00:02:19.200><c> no</c><00:02:19.440><c> longer</c><00:02:19.680><c> a</c><00:02:19.920><c> big</c><00:02:20.040><c> deal</c>

00:02:20.809 --> 00:02:20.819 align:start position:0%
seeing him is no longer a big deal
 

00:02:20.819 --> 00:02:22.850 align:start position:0%
seeing him is no longer a big deal
you'll<00:02:21.360><c> continue</c><00:02:21.599><c> to</c><00:02:21.959><c> remember</c><00:02:22.080><c> that</c><00:02:22.560><c> first</c>

00:02:22.850 --> 00:02:22.860 align:start position:0%
you'll continue to remember that first
 

00:02:22.860 --> 00:02:25.190 align:start position:0%
you'll continue to remember that first
time<00:02:23.220><c> but</c><00:02:23.879><c> you</c><00:02:24.000><c> won't</c><00:02:24.180><c> remember</c><00:02:24.420><c> the</c><00:02:24.840><c> details</c>

00:02:25.190 --> 00:02:25.200 align:start position:0%
time but you won't remember the details
 

00:02:25.200 --> 00:02:28.010 align:start position:0%
time but you won't remember the details
of<00:02:25.379><c> the</c><00:02:25.620><c> 10th</c><00:02:25.920><c> or</c><00:02:26.160><c> the</c><00:02:26.220><c> 150th</c><00:02:27.180><c> because</c><00:02:27.599><c> you've</c>

00:02:28.010 --> 00:02:28.020 align:start position:0%
of the 10th or the 150th because you've
 

00:02:28.020 --> 00:02:30.410 align:start position:0%
of the 10th or the 150th because you've
habituated<00:02:28.680><c> to</c><00:02:28.920><c> this</c><00:02:29.160><c> occurrence</c>

00:02:30.410 --> 00:02:30.420 align:start position:0%
habituated to this occurrence
 

00:02:30.420 --> 00:02:32.930 align:start position:0%
habituated to this occurrence
it<00:02:31.020><c> has</c><00:02:31.140><c> become</c><00:02:31.440><c> morning</c><00:02:31.739><c> coffee</c><00:02:32.099><c> and</c><00:02:32.459><c> a</c><00:02:32.580><c> bagel</c>

00:02:32.930 --> 00:02:32.940 align:start position:0%
it has become morning coffee and a bagel
 

00:02:32.940 --> 00:02:37.430 align:start position:0%
it has become morning coffee and a bagel
the<00:02:33.599><c> usual</c><00:02:33.959><c> no</c><00:02:34.800><c> big</c><00:02:34.920><c> deal</c><00:02:35.580><c> and</c><00:02:36.180><c> no</c><00:02:36.420><c> big</c><00:02:36.599><c> deal</c><00:02:36.840><c> is</c>

00:02:37.430 --> 00:02:37.440 align:start position:0%
the usual no big deal and no big deal is
 

00:02:37.440 --> 00:02:40.130 align:start position:0%
the usual no big deal and no big deal is
readily<00:02:37.920><c> forgotten</c><00:02:38.819><c> but</c><00:02:39.300><c> your</c><00:02:39.540><c> episodic</c>

00:02:40.130 --> 00:02:40.140 align:start position:0%
readily forgotten but your episodic
 

00:02:40.140 --> 00:02:43.369 align:start position:0%
readily forgotten but your episodic
memories<00:02:40.500><c> that</c><00:02:41.040><c> are</c><00:02:41.220><c> memorable</c><00:02:41.959><c> are</c><00:02:42.959><c> often</c>

00:02:43.369 --> 00:02:43.379 align:start position:0%
memories that are memorable are often
 

00:02:43.379 --> 00:02:46.190 align:start position:0%
memories that are memorable are often
incomplete<00:02:44.220><c> why</c>

00:02:46.190 --> 00:02:46.200 align:start position:0%
incomplete why
 

00:02:46.200 --> 00:02:48.770 align:start position:0%
incomplete why
to<00:02:46.680><c> begin</c><00:02:46.800><c> with</c><00:02:47.160><c> since</c><00:02:47.760><c> we</c><00:02:48.060><c> can't</c><00:02:48.239><c> notice</c>

00:02:48.770 --> 00:02:48.780 align:start position:0%
to begin with since we can't notice
 

00:02:48.780 --> 00:02:51.350 align:start position:0%
to begin with since we can't notice
everything<00:02:49.140><c> we</c><00:02:49.980><c> can</c><00:02:50.220><c> only</c><00:02:50.459><c> remember</c><00:02:50.819><c> certain</c>

00:02:51.350 --> 00:02:51.360 align:start position:0%
everything we can only remember certain
 

00:02:51.360 --> 00:02:53.630 align:start position:0%
everything we can only remember certain
slices<00:02:51.959><c> of</c><00:02:52.319><c> what</c><00:02:52.560><c> happened</c>

00:02:53.630 --> 00:02:53.640 align:start position:0%
slices of what happened
 

00:02:53.640 --> 00:02:55.970 align:start position:0%
slices of what happened
these<00:02:54.180><c> slices</c><00:02:54.420><c> will</c><00:02:54.780><c> contain</c><00:02:55.140><c> only</c><00:02:55.680><c> the</c>

00:02:55.970 --> 00:02:55.980 align:start position:0%
these slices will contain only the
 

00:02:55.980 --> 00:02:57.890 align:start position:0%
these slices will contain only the
details<00:02:56.459><c> that</c><00:02:56.760><c> captured</c><00:02:57.180><c> our</c><00:02:57.420><c> individual</c>

00:02:57.890 --> 00:02:57.900 align:start position:0%
details that captured our individual
 

00:02:57.900 --> 00:03:01.610 align:start position:0%
details that captured our individual
interests<00:02:59.040><c> in</c><00:02:59.580><c> my</c><00:02:59.760><c> breakfast</c><00:03:00.000><c> example</c><00:03:00.720><c> I</c>

00:03:01.610 --> 00:03:01.620 align:start position:0%
interests in my breakfast example I
 

00:03:01.620 --> 00:03:03.470 align:start position:0%
interests in my breakfast example I
might<00:03:01.739><c> remember</c><00:03:01.920><c> that</c><00:03:02.220><c> Elton</c><00:03:02.580><c> John</c><00:03:02.760><c> wore</c><00:03:03.239><c> a</c>

00:03:03.470 --> 00:03:03.480 align:start position:0%
might remember that Elton John wore a
 

00:03:03.480 --> 00:03:06.229 align:start position:0%
might remember that Elton John wore a
green<00:03:03.599><c> apron</c><00:03:04.140><c> but</c><00:03:04.860><c> my</c><00:03:05.220><c> son</c><00:03:05.400><c> might</c><00:03:05.700><c> have</c><00:03:05.940><c> no</c>

00:03:06.229 --> 00:03:06.239 align:start position:0%
green apron but my son might have no
 

00:03:06.239 --> 00:03:09.290 align:start position:0%
green apron but my son might have no
recollection<00:03:06.660><c> of</c><00:03:06.959><c> any</c><00:03:07.140><c> apron</c><00:03:07.760><c> instead</c><00:03:08.760><c> my</c><00:03:09.180><c> son</c>

00:03:09.290 --> 00:03:09.300 align:start position:0%
recollection of any apron instead my son
 

00:03:09.300 --> 00:03:10.910 align:start position:0%
recollection of any apron instead my son
might<00:03:09.599><c> remember</c><00:03:09.780><c> that</c><00:03:10.080><c> Elton</c><00:03:10.440><c> John</c><00:03:10.620><c> made</c>

00:03:10.910 --> 00:03:10.920 align:start position:0%
might remember that Elton John made
 

00:03:10.920 --> 00:03:13.009 align:start position:0%
might remember that Elton John made
chocolate<00:03:11.220><c> chip</c><00:03:11.580><c> pancakes</c><00:03:12.120><c> because</c><00:03:12.659><c> those</c>

00:03:13.009 --> 00:03:13.019 align:start position:0%
chocolate chip pancakes because those
 

00:03:13.019 --> 00:03:15.589 align:start position:0%
chocolate chip pancakes because those
are<00:03:13.260><c> his</c><00:03:13.440><c> favorite</c><00:03:13.680><c> while</c><00:03:14.640><c> I</c><00:03:14.940><c> might</c><00:03:15.120><c> have</c><00:03:15.300><c> no</c>

00:03:15.589 --> 00:03:15.599 align:start position:0%
are his favorite while I might have no
 

00:03:15.599 --> 00:03:17.270 align:start position:0%
are his favorite while I might have no
memory<00:03:15.900><c> of</c><00:03:16.080><c> what</c><00:03:16.260><c> kind</c><00:03:16.379><c> of</c><00:03:16.500><c> Pancakes</c><00:03:16.860><c> he</c><00:03:17.099><c> made</c>

00:03:17.270 --> 00:03:17.280 align:start position:0%
memory of what kind of Pancakes he made
 

00:03:17.280 --> 00:03:19.970 align:start position:0%
memory of what kind of Pancakes he made
because<00:03:17.580><c> I</c><00:03:17.760><c> never</c><00:03:17.940><c> ate</c><00:03:18.239><c> them</c><00:03:18.440><c> similarly</c><00:03:19.440><c> what</c>

00:03:19.970 --> 00:03:19.980 align:start position:0%
because I never ate them similarly what
 

00:03:19.980 --> 00:03:23.210 align:start position:0%
because I never ate them similarly what
a<00:03:20.159><c> Democrat</c><00:03:20.519><c> remembers</c><00:03:21.060><c> of</c><00:03:21.239><c> January</c><00:03:21.780><c> 6</c><00:03:22.220><c> 2021</c>

00:03:23.210 --> 00:03:23.220 align:start position:0%
a Democrat remembers of January 6 2021
 

00:03:23.220 --> 00:03:25.550 align:start position:0%
a Democrat remembers of January 6 2021
will<00:03:24.000><c> be</c><00:03:24.239><c> different</c><00:03:24.540><c> from</c><00:03:25.019><c> what</c><00:03:25.260><c> a</c><00:03:25.379><c> trump</c>

00:03:25.550 --> 00:03:25.560 align:start position:0%
will be different from what a trump
 

00:03:25.560 --> 00:03:28.009 align:start position:0%
will be different from what a trump
supporter<00:03:26.099><c> remembers</c><00:03:26.640><c> and</c><00:03:27.480><c> neither</c><00:03:27.780><c> the</c>

00:03:28.009 --> 00:03:28.019 align:start position:0%
supporter remembers and neither the
 

00:03:28.019 --> 00:03:29.990 align:start position:0%
supporter remembers and neither the
memory<00:03:28.260><c> of</c><00:03:28.500><c> the</c><00:03:28.680><c> Democrat</c><00:03:29.099><c> nor</c><00:03:29.580><c> the</c><00:03:29.819><c> Trump</c>

00:03:29.990 --> 00:03:30.000 align:start position:0%
memory of the Democrat nor the Trump
 

00:03:30.000 --> 00:03:32.170 align:start position:0%
memory of the Democrat nor the Trump
supporter<00:03:30.540><c> will</c><00:03:30.959><c> contain</c><00:03:31.379><c> the</c><00:03:31.680><c> full</c><00:03:31.860><c> picture</c>

00:03:32.170 --> 00:03:32.180 align:start position:0%
supporter will contain the full picture
 

00:03:32.180 --> 00:03:35.030 align:start position:0%
supporter will contain the full picture
the<00:03:33.180><c> whole</c><00:03:33.300><c> truth</c><00:03:33.659><c> so</c><00:03:33.900><c> to</c><00:03:34.080><c> speak</c>

00:03:35.030 --> 00:03:35.040 align:start position:0%
the whole truth so to speak
 

00:03:35.040 --> 00:03:38.089 align:start position:0%
the whole truth so to speak
so<00:03:35.580><c> from</c><00:03:35.879><c> the</c><00:03:36.060><c> get-go</c><00:03:36.540><c> our</c><00:03:37.140><c> episodic</c><00:03:37.739><c> memories</c>

00:03:38.089 --> 00:03:38.099 align:start position:0%
so from the get-go our episodic memories
 

00:03:38.099 --> 00:03:40.009 align:start position:0%
so from the get-go our episodic memories
are<00:03:38.519><c> incomplete</c>

00:03:40.009 --> 00:03:40.019 align:start position:0%
are incomplete
 

00:03:40.019 --> 00:03:42.110 align:start position:0%
are incomplete
well<00:03:40.680><c> you</c><00:03:40.920><c> might</c><00:03:41.099><c> then</c><00:03:41.340><c> think</c><00:03:41.580><c> that</c><00:03:41.819><c> whatever</c>

00:03:42.110 --> 00:03:42.120 align:start position:0%
well you might then think that whatever
 

00:03:42.120 --> 00:03:44.570 align:start position:0%
well you might then think that whatever
details<00:03:42.780><c> you</c><00:03:43.019><c> noticed</c><00:03:43.500><c> and</c><00:03:43.739><c> captured</c><00:03:44.159><c> into</c><00:03:44.340><c> a</c>

00:03:44.570 --> 00:03:44.580 align:start position:0%
details you noticed and captured into a
 

00:03:44.580 --> 00:03:47.270 align:start position:0%
details you noticed and captured into a
memory<00:03:44.879><c> would</c><00:03:45.360><c> at</c><00:03:45.540><c> least</c><00:03:45.659><c> be</c><00:03:45.959><c> accurate</c>

00:03:47.270 --> 00:03:47.280 align:start position:0%
memory would at least be accurate
 

00:03:47.280 --> 00:03:48.710 align:start position:0%
memory would at least be accurate
not<00:03:47.819><c> at</c><00:03:48.000><c> all</c>

00:03:48.710 --> 00:03:48.720 align:start position:0%
not at all
 

00:03:48.720 --> 00:03:50.869 align:start position:0%
not at all
when<00:03:49.200><c> we</c><00:03:49.440><c> retrieve</c><00:03:49.980><c> a</c><00:03:50.159><c> memory</c><00:03:50.459><c> of</c><00:03:50.640><c> something</c>

00:03:50.869 --> 00:03:50.879 align:start position:0%
when we retrieve a memory of something
 

00:03:50.879 --> 00:03:53.089 align:start position:0%
when we retrieve a memory of something
that<00:03:51.239><c> happened</c><00:03:51.480><c> we</c><00:03:52.200><c> aren't</c><00:03:52.379><c> playing</c><00:03:52.799><c> a</c>

00:03:53.089 --> 00:03:53.099 align:start position:0%
that happened we aren't playing a
 

00:03:53.099 --> 00:03:56.930 align:start position:0%
that happened we aren't playing a
videotape<00:03:53.640><c> we're</c><00:03:54.560><c> reconstructing</c><00:03:55.560><c> the</c><00:03:55.920><c> story</c>

00:03:56.930 --> 00:03:56.940 align:start position:0%
videotape we're reconstructing the story
 

00:03:56.940 --> 00:03:59.869 align:start position:0%
videotape we're reconstructing the story
we<00:03:57.420><c> omit</c><00:03:57.840><c> bits</c><00:03:58.319><c> reinterpret</c><00:03:59.040><c> parts</c><00:03:59.400><c> and</c>

00:03:59.869 --> 00:03:59.879 align:start position:0%
we omit bits reinterpret parts and
 

00:03:59.879 --> 00:04:01.430 align:start position:0%
we omit bits reinterpret parts and
distort<00:04:00.239><c> others</c><00:04:00.720><c> in</c><00:04:00.900><c> light</c><00:04:01.080><c> of</c><00:04:01.260><c> new</c>

00:04:01.430 --> 00:04:01.440 align:start position:0%
distort others in light of new
 

00:04:01.440 --> 00:04:04.070 align:start position:0%
distort others in light of new
information<00:04:02.060><c> context</c><00:04:03.060><c> and</c><00:04:03.360><c> perspective</c><00:04:03.780><c> that</c>

00:04:04.070 --> 00:04:04.080 align:start position:0%
information context and perspective that
 

00:04:04.080 --> 00:04:06.289 align:start position:0%
information context and perspective that
are<00:04:04.200><c> available</c><00:04:04.379><c> now</c><00:04:05.099><c> but</c><00:04:05.819><c> weren't</c><00:04:06.060><c> available</c>

00:04:06.289 --> 00:04:06.299 align:start position:0%
are available now but weren't available
 

00:04:06.299 --> 00:04:08.030 align:start position:0%
are available now but weren't available
back<00:04:06.959><c> then</c>

00:04:08.030 --> 00:04:08.040 align:start position:0%
back then
 

00:04:08.040 --> 00:04:10.750 align:start position:0%
back then
we<00:04:08.760><c> frequently</c><00:04:09.239><c> invent</c><00:04:09.720><c> new</c><00:04:10.019><c> information</c>

00:04:10.750 --> 00:04:10.760 align:start position:0%
we frequently invent new information
 

00:04:10.760 --> 00:04:14.149 align:start position:0%
we frequently invent new information
often<00:04:11.760><c> inaccurate</c><00:04:12.480><c> to</c><00:04:13.080><c> fill</c><00:04:13.260><c> in</c><00:04:13.439><c> gaps</c><00:04:13.860><c> in</c><00:04:13.980><c> our</c>

00:04:14.149 --> 00:04:14.159 align:start position:0%
often inaccurate to fill in gaps in our
 

00:04:14.159 --> 00:04:16.189 align:start position:0%
often inaccurate to fill in gaps in our
memories<00:04:14.519><c> so</c><00:04:15.120><c> that</c><00:04:15.299><c> the</c><00:04:15.480><c> narrative</c><00:04:15.780><c> feels</c>

00:04:16.189 --> 00:04:16.199 align:start position:0%
memories so that the narrative feels
 

00:04:16.199 --> 00:04:18.349 align:start position:0%
memories so that the narrative feels
more<00:04:16.440><c> complete</c><00:04:16.919><c> or</c><00:04:17.160><c> pleasing</c>

00:04:18.349 --> 00:04:18.359 align:start position:0%
more complete or pleasing
 

00:04:18.359 --> 00:04:21.289 align:start position:0%
more complete or pleasing
what<00:04:18.900><c> we</c><00:04:19.079><c> remember</c><00:04:19.320><c> about</c><00:04:19.680><c> the</c><00:04:20.100><c> past</c><00:04:20.340><c> is</c><00:04:20.940><c> also</c>

00:04:21.289 --> 00:04:21.299 align:start position:0%
what we remember about the past is also
 

00:04:21.299 --> 00:04:23.469 align:start position:0%
what we remember about the past is also
influenced<00:04:21.780><c> by</c><00:04:21.959><c> how</c><00:04:22.199><c> we</c><00:04:22.380><c> feel</c><00:04:22.620><c> in</c><00:04:22.860><c> the</c><00:04:23.040><c> present</c>

00:04:23.469 --> 00:04:23.479 align:start position:0%
influenced by how we feel in the present
 

00:04:23.479 --> 00:04:26.270 align:start position:0%
influenced by how we feel in the present
our<00:04:24.479><c> opinions</c><00:04:25.020><c> and</c><00:04:25.320><c> emotional</c><00:04:25.740><c> state</c><00:04:25.919><c> today</c>

00:04:26.270 --> 00:04:26.280 align:start position:0%
our opinions and emotional state today
 

00:04:26.280 --> 00:04:28.370 align:start position:0%
our opinions and emotional state today
color<00:04:27.060><c> what</c><00:04:27.419><c> we</c><00:04:27.540><c> remember</c><00:04:27.780><c> from</c><00:04:28.139><c> what</c>

00:04:28.370 --> 00:04:28.380 align:start position:0%
color what we remember from what
 

00:04:28.380 --> 00:04:30.170 align:start position:0%
color what we remember from what
happened<00:04:28.560><c> yesterday</c>

00:04:30.170 --> 00:04:30.180 align:start position:0%
happened yesterday
 

00:04:30.180 --> 00:04:33.950 align:start position:0%
happened yesterday
so<00:04:30.840><c> in</c><00:04:31.500><c> revisiting</c><00:04:32.160><c> episodic</c><00:04:32.759><c> memories</c><00:04:33.120><c> we</c>

00:04:33.950 --> 00:04:33.960 align:start position:0%
so in revisiting episodic memories we
 

00:04:33.960 --> 00:04:35.810 align:start position:0%
so in revisiting episodic memories we
often<00:04:34.199><c> reshape</c><00:04:34.680><c> them</c>

00:04:35.810 --> 00:04:35.820 align:start position:0%
often reshape them
 

00:04:35.820 --> 00:04:38.210 align:start position:0%
often reshape them
and<00:04:36.540><c> then</c><00:04:36.720><c> something</c><00:04:37.020><c> even</c><00:04:37.380><c> more</c><00:04:37.800><c> interesting</c>

00:04:38.210 --> 00:04:38.220 align:start position:0%
and then something even more interesting
 

00:04:38.220 --> 00:04:41.150 align:start position:0%
and then something even more interesting
happens<00:04:38.600><c> we</c><00:04:39.600><c> link</c><00:04:39.780><c> together</c><00:04:40.080><c> and</c><00:04:40.620><c> restore</c>

00:04:41.150 --> 00:04:41.160 align:start position:0%
happens we link together and restore
 

00:04:41.160 --> 00:04:44.270 align:start position:0%
happens we link together and restore
this<00:04:41.940><c> changed</c><00:04:42.479><c> 2.0</c><00:04:43.199><c> version</c><00:04:43.560><c> of</c><00:04:43.800><c> the</c><00:04:43.979><c> memory</c>

00:04:44.270 --> 00:04:44.280 align:start position:0%
this changed 2.0 version of the memory
 

00:04:44.280 --> 00:04:47.390 align:start position:0%
this changed 2.0 version of the memory
and<00:04:45.000><c> not</c><00:04:45.240><c> the</c><00:04:45.540><c> original</c><00:04:45.740><c> it's</c><00:04:46.740><c> like</c><00:04:46.979><c> hitting</c>

00:04:47.390 --> 00:04:47.400 align:start position:0%
and not the original it's like hitting
 

00:04:47.400 --> 00:04:50.810 align:start position:0%
and not the original it's like hitting
save<00:04:47.639><c> in</c><00:04:47.940><c> Microsoft</c><00:04:48.360><c> Word</c><00:04:48.660><c> we</c><00:04:49.380><c> overwrite</c><00:04:49.860><c> it</c>

00:04:50.810 --> 00:04:50.820 align:start position:0%
save in Microsoft Word we overwrite it
 

00:04:50.820 --> 00:04:54.230 align:start position:0%
save in Microsoft Word we overwrite it
the<00:04:51.540><c> old</c><00:04:51.660><c> version</c><00:04:51.900><c> is</c><00:04:52.320><c> erased</c><00:04:52.979><c> and</c><00:04:53.580><c> this</c><00:04:53.940><c> new</c>

00:04:54.230 --> 00:04:54.240 align:start position:0%
the old version is erased and this new
 

00:04:54.240 --> 00:04:56.930 align:start position:0%
the old version is erased and this new
updated<00:04:54.660><c> Edition</c><00:04:55.020><c> is</c><00:04:55.860><c> the</c><00:04:56.100><c> linked</c><00:04:56.520><c> circuit</c>

00:04:56.930 --> 00:04:56.940 align:start position:0%
updated Edition is the linked circuit
 

00:04:56.940 --> 00:04:59.330 align:start position:0%
updated Edition is the linked circuit
will<00:04:57.180><c> retrieve</c><00:04:57.720><c> the</c><00:04:58.199><c> next</c><00:04:58.380><c> time</c><00:04:58.620><c> we</c><00:04:58.860><c> revisit</c>

00:04:59.330 --> 00:04:59.340 align:start position:0%
will retrieve the next time we revisit
 

00:04:59.340 --> 00:05:00.770 align:start position:0%
will retrieve the next time we revisit
that<00:04:59.520><c> memory</c>

00:05:00.770 --> 00:05:00.780 align:start position:0%
that memory
 

00:05:00.780 --> 00:05:03.170 align:start position:0%
that memory
as<00:05:01.259><c> you</c><00:05:01.380><c> might</c><00:05:01.560><c> imagine</c><00:05:01.800><c> after</c><00:05:02.639><c> several</c>

00:05:03.170 --> 00:05:03.180 align:start position:0%
as you might imagine after several
 

00:05:03.180 --> 00:05:06.230 align:start position:0%
as you might imagine after several
recalls<00:05:03.720><c> of</c><00:05:03.960><c> Any</c><00:05:04.199><c> Given</c><00:05:04.500><c> episodic</c><00:05:05.100><c> memory</c><00:05:05.460><c> it</c>

00:05:06.230 --> 00:05:06.240 align:start position:0%
recalls of Any Given episodic memory it
 

00:05:06.240 --> 00:05:08.390 align:start position:0%
recalls of Any Given episodic memory it
has<00:05:06.479><c> the</c><00:05:06.720><c> potential</c><00:05:07.080><c> to</c><00:05:07.380><c> drift</c><00:05:07.680><c> quite</c><00:05:08.100><c> a</c><00:05:08.280><c> bit</c>

00:05:08.390 --> 00:05:08.400 align:start position:0%
has the potential to drift quite a bit
 

00:05:08.400 --> 00:05:11.270 align:start position:0%
has the potential to drift quite a bit
from<00:05:09.000><c> the</c><00:05:09.180><c> original</c><00:05:09.560><c> If</c><00:05:10.560><c> you</c><00:05:10.800><c> experience</c>

00:05:11.270 --> 00:05:11.280 align:start position:0%
from the original If you experience
 

00:05:11.280 --> 00:05:13.909 align:start position:0%
from the original If you experience
something<00:05:11.699><c> highly</c><00:05:12.419><c> unexpected</c><00:05:13.199><c> and</c>

00:05:13.909 --> 00:05:13.919 align:start position:0%
something highly unexpected and
 

00:05:13.919 --> 00:05:16.310 align:start position:0%
something highly unexpected and
exceptionally<00:05:14.520><c> emotional</c><00:05:15.180><c> you</c><00:05:15.960><c> might</c><00:05:16.080><c> create</c>

00:05:16.310 --> 00:05:16.320 align:start position:0%
exceptionally emotional you might create
 

00:05:16.320 --> 00:05:19.310 align:start position:0%
exceptionally emotional you might create
what<00:05:16.740><c> is</c><00:05:16.860><c> known</c><00:05:17.100><c> as</c><00:05:17.400><c> a</c><00:05:17.699><c> flash</c><00:05:17.880><c> bulb</c><00:05:18.419><c> memory</c>

00:05:19.310 --> 00:05:19.320 align:start position:0%
what is known as a flash bulb memory
 

00:05:19.320 --> 00:05:21.650 align:start position:0%
what is known as a flash bulb memory
flash<00:05:19.919><c> bulbs</c><00:05:20.400><c> are</c><00:05:20.520><c> episodic</c><00:05:21.060><c> memories</c><00:05:21.360><c> for</c>

00:05:21.650 --> 00:05:21.660 align:start position:0%
flash bulbs are episodic memories for
 

00:05:21.660 --> 00:05:23.930 align:start position:0%
flash bulbs are episodic memories for
experiences<00:05:22.380><c> that</c><00:05:22.680><c> were</c><00:05:22.919><c> shocking</c>

00:05:23.930 --> 00:05:23.940 align:start position:0%
experiences that were shocking
 

00:05:23.940 --> 00:05:27.230 align:start position:0%
experiences that were shocking
highly<00:05:24.720><c> significant</c><00:05:25.199><c> to</c><00:05:25.440><c> you</c><00:05:25.620><c> and</c><00:05:26.220><c> evoked</c><00:05:26.820><c> big</c>

00:05:27.230 --> 00:05:27.240 align:start position:0%
highly significant to you and evoked big
 

00:05:27.240 --> 00:05:32.290 align:start position:0%
highly significant to you and evoked big
emotions<00:05:27.780><c> like</c><00:05:28.440><c> fear</c><00:05:29.100><c> rage</c><00:05:29.699><c> grief</c><00:05:30.600><c> Joy</c><00:05:31.500><c> love</c>

00:05:32.290 --> 00:05:32.300 align:start position:0%
emotions like fear rage grief Joy love
 

00:05:32.300 --> 00:05:34.550 align:start position:0%
emotions like fear rage grief Joy love
examples<00:05:33.300><c> of</c><00:05:33.539><c> these</c><00:05:33.840><c> types</c><00:05:34.080><c> of</c><00:05:34.199><c> memories</c>

00:05:34.550 --> 00:05:34.560 align:start position:0%
examples of these types of memories
 

00:05:34.560 --> 00:05:38.330 align:start position:0%
examples of these types of memories
include<00:05:35.039><c> 911</c><00:05:35.639><c> the</c><00:05:36.600><c> death</c><00:05:36.720><c> of</c><00:05:36.960><c> a</c><00:05:37.139><c> parent</c><00:05:37.380><c> the</c>

00:05:38.330 --> 00:05:38.340 align:start position:0%
include 911 the death of a parent the
 

00:05:38.340 --> 00:05:41.090 align:start position:0%
include 911 the death of a parent the
day<00:05:38.520><c> your</c><00:05:38.759><c> spouse</c><00:05:39.060><c> proposed</c><00:05:39.900><c> or</c><00:05:40.800><c> if</c><00:05:40.919><c> you're</c>

00:05:41.090 --> 00:05:41.100 align:start position:0%
day your spouse proposed or if you're
 

00:05:41.100 --> 00:05:43.730 align:start position:0%
day your spouse proposed or if you're
from<00:05:41.400><c> Boston</c><00:05:41.820><c> when</c><00:05:42.600><c> the</c><00:05:42.720><c> Red</c><00:05:42.900><c> Sox</c><00:05:43.259><c> won</c><00:05:43.500><c> the</c>

00:05:43.730 --> 00:05:43.740 align:start position:0%
from Boston when the Red Sox won the
 

00:05:43.740 --> 00:05:45.830 align:start position:0%
from Boston when the Red Sox won the
2004<00:05:44.400><c> World</c><00:05:44.759><c> Series</c>

00:05:45.830 --> 00:05:45.840 align:start position:0%
2004 World Series
 

00:05:45.840 --> 00:05:49.189 align:start position:0%
2004 World Series
but<00:05:46.440><c> even</c><00:05:46.860><c> though</c><00:05:47.160><c> they</c><00:05:47.520><c> feel</c><00:05:47.880><c> so</c><00:05:48.479><c> vividly</c><00:05:48.960><c> and</c>

00:05:49.189 --> 00:05:49.199 align:start position:0%
but even though they feel so vividly and
 

00:05:49.199 --> 00:05:52.189 align:start position:0%
but even though they feel so vividly and
confidently<00:05:49.740><c> remembered</c><00:05:50.400><c> flash</c><00:05:51.240><c> bulbs</c><00:05:51.840><c> are</c>

00:05:52.189 --> 00:05:52.199 align:start position:0%
confidently remembered flash bulbs are
 

00:05:52.199 --> 00:05:54.710 align:start position:0%
confidently remembered flash bulbs are
episodic<00:05:52.860><c> memories</c><00:05:53.340><c> and</c><00:05:54.120><c> like</c><00:05:54.360><c> other</c>

00:05:54.710 --> 00:05:54.720 align:start position:0%
episodic memories and like other
 

00:05:54.720 --> 00:05:56.870 align:start position:0%
episodic memories and like other
episodic<00:05:55.320><c> memories</c><00:05:55.680><c> they</c><00:05:56.220><c> are</c><00:05:56.460><c> also</c>

00:05:56.870 --> 00:05:56.880 align:start position:0%
episodic memories they are also
 

00:05:56.880 --> 00:05:58.310 align:start position:0%
episodic memories they are also
inaccurate

00:05:58.310 --> 00:05:58.320 align:start position:0%
inaccurate
 

00:05:58.320 --> 00:06:01.129 align:start position:0%
inaccurate
here's<00:05:59.100><c> my</c><00:05:59.400><c> favorite</c><00:05:59.639><c> example</c><00:06:00.240><c> of</c><00:06:00.720><c> how</c><00:06:00.900><c> flash</c>

00:06:01.129 --> 00:06:01.139 align:start position:0%
here's my favorite example of how flash
 

00:06:01.139 --> 00:06:03.909 align:start position:0%
here's my favorite example of how flash
build<00:06:01.440><c> memories</c><00:06:01.919><c> can</c><00:06:02.220><c> be</c><00:06:02.460><c> just</c><00:06:02.820><c> as</c><00:06:03.060><c> incomplete</c>

00:06:03.909 --> 00:06:03.919 align:start position:0%
build memories can be just as incomplete
 

00:06:03.919 --> 00:06:06.950 align:start position:0%
build memories can be just as incomplete
distorted<00:06:04.919><c> and</c><00:06:05.460><c> dead</c><00:06:05.699><c> wrong</c><00:06:05.940><c> as</c><00:06:06.479><c> ordinary</c>

00:06:06.950 --> 00:06:06.960 align:start position:0%
distorted and dead wrong as ordinary
 

00:06:06.960 --> 00:06:08.870 align:start position:0%
distorted and dead wrong as ordinary
episodic<00:06:07.560><c> memories</c>

00:06:08.870 --> 00:06:08.880 align:start position:0%
episodic memories
 

00:06:08.880 --> 00:06:12.529 align:start position:0%
episodic memories
on<00:06:09.479><c> January</c><00:06:09.840><c> 28</c><00:06:10.520><c> 1986</c><00:06:11.520><c> the</c><00:06:12.000><c> space</c><00:06:12.180><c> shuttle</c>

00:06:12.529 --> 00:06:12.539 align:start position:0%
on January 28 1986 the space shuttle
 

00:06:12.539 --> 00:06:14.390 align:start position:0%
on January 28 1986 the space shuttle
Challenger<00:06:13.080><c> exploded</c>

00:06:14.390 --> 00:06:14.400 align:start position:0%
Challenger exploded
 

00:06:14.400 --> 00:06:16.430 align:start position:0%
Challenger exploded
do<00:06:14.820><c> you</c><00:06:14.940><c> remember</c><00:06:15.120><c> the</c><00:06:15.539><c> details</c><00:06:15.900><c> of</c><00:06:16.080><c> where</c><00:06:16.259><c> you</c>

00:06:16.430 --> 00:06:16.440 align:start position:0%
do you remember the details of where you
 

00:06:16.440 --> 00:06:18.290 align:start position:0%
do you remember the details of where you
were<00:06:16.620><c> and</c><00:06:16.800><c> what</c><00:06:16.979><c> you</c><00:06:17.100><c> were</c><00:06:17.220><c> doing</c>

00:06:18.290 --> 00:06:18.300 align:start position:0%
were and what you were doing
 

00:06:18.300 --> 00:06:20.870 align:start position:0%
were and what you were doing
are<00:06:18.780><c> you</c><00:06:18.900><c> sure</c><00:06:19.139><c> you're</c><00:06:19.380><c> right</c>

00:06:20.870 --> 00:06:20.880 align:start position:0%
are you sure you're right
 

00:06:20.880 --> 00:06:23.150 align:start position:0%
are you sure you're right
24<00:06:21.360><c> hours</c><00:06:21.840><c> after</c><00:06:22.319><c> the</c><00:06:22.620><c> explosion</c>

00:06:23.150 --> 00:06:23.160 align:start position:0%
24 hours after the explosion
 

00:06:23.160 --> 00:06:24.770 align:start position:0%
24 hours after the explosion
psychologist

00:06:24.770 --> 00:06:24.780 align:start position:0%
psychologist
 

00:06:24.780 --> 00:06:27.170 align:start position:0%
psychologist
Ulrich<00:06:25.020><c> Nisar</c><00:06:25.500><c> and</c><00:06:25.680><c> Nicole</c><00:06:25.979><c> harsh</c><00:06:26.400><c> asked</c>

00:06:27.170 --> 00:06:27.180 align:start position:0%
Ulrich Nisar and Nicole harsh asked
 

00:06:27.180 --> 00:06:29.629 align:start position:0%
Ulrich Nisar and Nicole harsh asked
their<00:06:27.360><c> psychology</c><00:06:27.900><c> students</c><00:06:28.800><c> at</c><00:06:29.280><c> Emory</c>

00:06:29.629 --> 00:06:29.639 align:start position:0%
their psychology students at Emory
 

00:06:29.639 --> 00:06:31.790 align:start position:0%
their psychology students at Emory
college<00:06:30.000><c> a</c><00:06:30.840><c> series</c><00:06:30.960><c> of</c><00:06:31.259><c> questions</c><00:06:31.440><c> about</c>

00:06:31.790 --> 00:06:31.800 align:start position:0%
college a series of questions about
 

00:06:31.800 --> 00:06:35.029 align:start position:0%
college a series of questions about
where<00:06:32.160><c> they</c><00:06:32.400><c> were</c><00:06:32.639><c> and</c><00:06:33.240><c> what</c><00:06:33.479><c> they</c><00:06:33.600><c> were</c><00:06:33.720><c> doing</c>

00:06:35.029 --> 00:06:35.039 align:start position:0%
where they were and what they were doing
 

00:06:35.039 --> 00:06:37.550 align:start position:0%
where they were and what they were doing
two<00:06:35.699><c> and</c><00:06:35.819><c> a</c><00:06:35.940><c> half</c><00:06:36.000><c> years</c><00:06:36.240><c> later</c><00:06:36.479><c> they</c><00:06:37.139><c> asked</c>

00:06:37.550 --> 00:06:37.560 align:start position:0%
two and a half years later they asked
 

00:06:37.560 --> 00:06:40.070 align:start position:0%
two and a half years later they asked
these<00:06:37.919><c> same</c><00:06:38.100><c> students</c><00:06:38.580><c> the</c><00:06:39.419><c> same</c><00:06:39.660><c> questions</c>

00:06:40.070 --> 00:06:40.080 align:start position:0%
these same students the same questions
 

00:06:40.080 --> 00:06:43.430 align:start position:0%
these same students the same questions
and<00:06:40.800><c> checked</c><00:06:41.160><c> their</c><00:06:41.460><c> answers</c><00:06:41.880><c> their</c><00:06:42.840><c> episodic</c>

00:06:43.430 --> 00:06:43.440 align:start position:0%
and checked their answers their episodic
 

00:06:43.440 --> 00:06:46.930 align:start position:0%
and checked their answers their episodic
memories<00:06:44.100><c> against</c><00:06:44.819><c> their</c><00:06:45.300><c> original</c><00:06:45.479><c> memories</c>

00:06:46.930 --> 00:06:46.940 align:start position:0%
memories against their original memories
 

00:06:46.940 --> 00:06:50.029 align:start position:0%
memories against their original memories
zero<00:06:47.940><c> percent</c><00:06:48.120><c> of</c><00:06:48.479><c> them</c><00:06:48.720><c> gave</c><00:06:49.319><c> answers</c><00:06:49.740><c> that</c>

00:06:50.029 --> 00:06:50.039 align:start position:0%
zero percent of them gave answers that
 

00:06:50.039 --> 00:06:53.510 align:start position:0%
zero percent of them gave answers that
100<00:06:50.460><c> match</c><00:06:51.240><c> their</c><00:06:51.600><c> original</c><00:06:51.720><c> answers</c><00:06:52.520><c> even</c>

00:06:53.510 --> 00:06:53.520 align:start position:0%
100 match their original answers even
 

00:06:53.520 --> 00:06:55.790 align:start position:0%
100 match their original answers even
more<00:06:53.880><c> amazing</c><00:06:54.360><c> when</c><00:06:54.900><c> shown</c><00:06:55.259><c> their</c><00:06:55.560><c> original</c>

00:06:55.790 --> 00:06:55.800 align:start position:0%
more amazing when shown their original
 

00:06:55.800 --> 00:06:59.330 align:start position:0%
more amazing when shown their original
answers<00:06:56.400><c> in</c><00:06:57.240><c> their</c><00:06:57.479><c> own</c><00:06:57.660><c> handwriting</c><00:06:58.500><c> these</c>

00:06:59.330 --> 00:06:59.340 align:start position:0%
answers in their own handwriting these
 

00:06:59.340 --> 00:07:01.430 align:start position:0%
answers in their own handwriting these
students<00:06:59.699><c> still</c><00:07:00.060><c> stuck</c><00:07:00.300><c> to</c><00:07:00.539><c> the</c><00:07:00.840><c> new</c><00:07:01.020><c> updated</c>

00:07:01.430 --> 00:07:01.440 align:start position:0%
students still stuck to the new updated
 

00:07:01.440 --> 00:07:03.650 align:start position:0%
students still stuck to the new updated
version<00:07:01.800><c> of</c><00:07:02.039><c> the</c><00:07:02.220><c> memory</c><00:07:02.580><c> and</c><00:07:03.240><c> scratched</c>

00:07:03.650 --> 00:07:03.660 align:start position:0%
version of the memory and scratched
 

00:07:03.660 --> 00:07:05.450 align:start position:0%
version of the memory and scratched
their<00:07:03.780><c> heads</c><00:07:04.080><c> over</c><00:07:04.199><c> the</c><00:07:04.440><c> mismatch</c>

00:07:05.450 --> 00:07:05.460 align:start position:0%
their heads over the mismatch
 

00:07:05.460 --> 00:07:07.430 align:start position:0%
their heads over the mismatch
they<00:07:06.180><c> couldn't</c><00:07:06.419><c> make</c><00:07:06.780><c> sense</c><00:07:07.020><c> of</c><00:07:07.259><c> their</c>

00:07:07.430 --> 00:07:07.440 align:start position:0%
they couldn't make sense of their
 

00:07:07.440 --> 00:07:09.890 align:start position:0%
they couldn't make sense of their
original<00:07:07.620><c> answers</c><00:07:08.220><c> because</c><00:07:08.940><c> those</c><00:07:09.419><c> answers</c>

00:07:09.890 --> 00:07:09.900 align:start position:0%
original answers because those answers
 

00:07:09.900 --> 00:07:12.770 align:start position:0%
original answers because those answers
no<00:07:10.319><c> longer</c><00:07:10.620><c> existed</c><00:07:11.100><c> in</c><00:07:11.220><c> their</c><00:07:11.460><c> brains</c><00:07:11.880><c> their</c>

00:07:12.770 --> 00:07:12.780 align:start position:0%
no longer existed in their brains their
 

00:07:12.780 --> 00:07:15.770 align:start position:0%
no longer existed in their brains their
memories<00:07:13.199><c> were</c><00:07:13.620><c> permanently</c><00:07:14.160><c> changed</c><00:07:14.819><c> and</c>

00:07:15.770 --> 00:07:15.780 align:start position:0%
memories were permanently changed and
 

00:07:15.780 --> 00:07:17.029 align:start position:0%
memories were permanently changed and
wrong

00:07:17.029 --> 00:07:17.039 align:start position:0%
wrong
 

00:07:17.039 --> 00:07:19.370 align:start position:0%
wrong
so<00:07:17.520><c> the</c><00:07:17.819><c> next</c><00:07:18.000><c> time</c><00:07:18.360><c> you</c><00:07:18.720><c> and</c><00:07:18.900><c> your</c><00:07:19.080><c> partner</c>

00:07:19.370 --> 00:07:19.380 align:start position:0%
so the next time you and your partner
 

00:07:19.380 --> 00:07:22.070 align:start position:0%
so the next time you and your partner
disagree<00:07:20.280><c> over</c><00:07:20.460><c> the</c><00:07:20.819><c> details</c><00:07:21.360><c> of</c><00:07:21.840><c> what</c>

00:07:22.070 --> 00:07:22.080 align:start position:0%
disagree over the details of what
 

00:07:22.080 --> 00:07:23.990 align:start position:0%
disagree over the details of what
happened<00:07:22.259><c> on</c><00:07:22.560><c> that</c><00:07:22.740><c> trip</c><00:07:22.919><c> to</c><00:07:23.160><c> Disney</c><00:07:23.340><c> World</c><00:07:23.639><c> 10</c>

00:07:23.990 --> 00:07:24.000 align:start position:0%
happened on that trip to Disney World 10
 

00:07:24.000 --> 00:07:25.309 align:start position:0%
happened on that trip to Disney World 10
years<00:07:24.240><c> ago</c>

00:07:25.309 --> 00:07:25.319 align:start position:0%
years ago
 

00:07:25.319 --> 00:07:27.890 align:start position:0%
years ago
realize<00:07:26.099><c> that</c><00:07:26.460><c> both</c><00:07:26.759><c> of</c><00:07:27.000><c> your</c><00:07:27.180><c> memories</c><00:07:27.539><c> are</c>

00:07:27.890 --> 00:07:27.900 align:start position:0%
realize that both of your memories are
 

00:07:27.900 --> 00:07:30.890 align:start position:0%
realize that both of your memories are
likely<00:07:28.199><c> incomplete</c><00:07:28.979><c> and</c><00:07:29.699><c> distorted</c>

00:07:30.890 --> 00:07:30.900 align:start position:0%
likely incomplete and distorted
 

00:07:30.900 --> 00:07:33.309 align:start position:0%
likely incomplete and distorted
when<00:07:31.500><c> it</c><00:07:31.620><c> comes</c><00:07:31.860><c> to</c><00:07:32.039><c> episodic</c><00:07:32.639><c> memory</c>

00:07:33.309 --> 00:07:33.319 align:start position:0%
when it comes to episodic memory
 

00:07:33.319 --> 00:07:35.870 align:start position:0%
when it comes to episodic memory
imperfect<00:07:34.319><c> is</c><00:07:34.560><c> the</c><00:07:34.800><c> best</c><00:07:34.919><c> our</c><00:07:35.220><c> human</c><00:07:35.400><c> brains</c>

00:07:35.870 --> 00:07:35.880 align:start position:0%
imperfect is the best our human brains
 

00:07:35.880 --> 00:07:38.240 align:start position:0%
imperfect is the best our human brains
can<00:07:36.060><c> do</c>


```

# How to boost your brain and memory/How Memories Are Made.en.vtt

```vtt
WEBVTT
Kind: captions
Language: en

00:00:05.819 --> 00:00:10.310 align:start position:0%
 
our<00:00:06.779><c> human</c><00:00:07.020><c> brains</c><00:00:07.680><c> are</c><00:00:08.580><c> mind-blowing</c><00:00:09.360><c> you</c>

00:00:10.310 --> 00:00:10.320 align:start position:0%
our human brains are mind-blowing you
 

00:00:10.320 --> 00:00:13.910 align:start position:0%
our human brains are mind-blowing you
have<00:00:10.500><c> approximately</c><00:00:11.480><c> 86</c><00:00:12.480><c> billion</c><00:00:13.200><c> neurons</c><00:00:13.679><c> in</c>

00:00:13.910 --> 00:00:13.920 align:start position:0%
have approximately 86 billion neurons in
 

00:00:13.920 --> 00:00:14.930 align:start position:0%
have approximately 86 billion neurons in
your<00:00:14.099><c> head</c>

00:00:14.930 --> 00:00:14.940 align:start position:0%
your head
 

00:00:14.940 --> 00:00:17.390 align:start position:0%
your head
the<00:00:15.599><c> patterns</c><00:00:16.020><c> of</c><00:00:16.199><c> activity</c><00:00:16.619><c> among</c><00:00:17.100><c> these</c>

00:00:17.390 --> 00:00:17.400 align:start position:0%
the patterns of activity among these
 

00:00:17.400 --> 00:00:21.890 align:start position:0%
the patterns of activity among these
neurons<00:00:17.760><c> allow</c><00:00:18.720><c> us</c><00:00:18.840><c> to</c><00:00:19.199><c> feel</c><00:00:19.500><c> love</c><00:00:20.220><c> and</c><00:00:20.640><c> awe</c><00:00:21.119><c> to</c>

00:00:21.890 --> 00:00:21.900 align:start position:0%
neurons allow us to feel love and awe to
 

00:00:21.900 --> 00:00:23.990 align:start position:0%
neurons allow us to feel love and awe to
discern<00:00:22.199><c> the</c><00:00:22.500><c> difference</c><00:00:22.680><c> between</c><00:00:23.160><c> Cerulean</c>

00:00:23.990 --> 00:00:24.000 align:start position:0%
discern the difference between Cerulean
 

00:00:24.000 --> 00:00:25.790 align:start position:0%
discern the difference between Cerulean
blue<00:00:24.240><c> and</c><00:00:24.539><c> magenta</c>

00:00:25.790 --> 00:00:25.800 align:start position:0%
blue and magenta
 

00:00:25.800 --> 00:00:29.089 align:start position:0%
blue and magenta
to<00:00:26.340><c> solve</c><00:00:26.640><c> math</c><00:00:26.880><c> equations</c><00:00:27.380><c> invent</c><00:00:28.380><c> vaccines</c>

00:00:29.089 --> 00:00:29.099 align:start position:0%
to solve math equations invent vaccines
 

00:00:29.099 --> 00:00:32.810 align:start position:0%
to solve math equations invent vaccines
and<00:00:30.060><c> imagine</c><00:00:30.240><c> what</c><00:00:30.779><c> someone</c><00:00:31.019><c> else</c><00:00:31.260><c> is</c><00:00:31.500><c> feeling</c>

00:00:32.810 --> 00:00:32.820 align:start position:0%
and imagine what someone else is feeling
 

00:00:32.820 --> 00:00:35.450 align:start position:0%
and imagine what someone else is feeling
but<00:00:33.360><c> of</c><00:00:33.600><c> all</c><00:00:33.899><c> the</c><00:00:34.140><c> miraculous</c><00:00:34.680><c> Feats</c><00:00:35.219><c> your</c>

00:00:35.450 --> 00:00:35.460 align:start position:0%
but of all the miraculous Feats your
 

00:00:35.460 --> 00:00:38.690 align:start position:0%
but of all the miraculous Feats your
brain<00:00:35.700><c> performs</c><00:00:36.380><c> memory</c><00:00:37.380><c> is</c><00:00:37.800><c> King</c>

00:00:38.690 --> 00:00:38.700 align:start position:0%
brain performs memory is King
 

00:00:38.700 --> 00:00:41.530 align:start position:0%
brain performs memory is King
you<00:00:39.300><c> need</c><00:00:39.480><c> memory</c><00:00:39.899><c> to</c><00:00:40.260><c> learn</c><00:00:40.440><c> anything</c>

00:00:41.530 --> 00:00:41.540 align:start position:0%
you need memory to learn anything
 

00:00:41.540 --> 00:00:44.389 align:start position:0%
you need memory to learn anything
without<00:00:42.540><c> it</c><00:00:42.840><c> information</c><00:00:43.260><c> and</c><00:00:43.800><c> experiences</c>

00:00:44.389 --> 00:00:44.399 align:start position:0%
without it information and experiences
 

00:00:44.399 --> 00:00:46.310 align:start position:0%
without it information and experiences
can't<00:00:44.879><c> be</c><00:00:45.120><c> retained</c>

00:00:46.310 --> 00:00:46.320 align:start position:0%
can't be retained
 

00:00:46.320 --> 00:00:49.549 align:start position:0%
can't be retained
new<00:00:46.860><c> people</c><00:00:47.100><c> would</c><00:00:47.399><c> remain</c><00:00:47.760><c> strangers</c><00:00:48.559><c> you</c>

00:00:49.549 --> 00:00:49.559 align:start position:0%
new people would remain strangers you
 

00:00:49.559 --> 00:00:52.369 align:start position:0%
new people would remain strangers you
depend<00:00:49.920><c> on</c><00:00:50.219><c> memory</c><00:00:50.579><c> to</c><00:00:51.239><c> understand</c><00:00:51.539><c> what</c><00:00:52.200><c> I'm</c>

00:00:52.369 --> 00:00:52.379 align:start position:0%
depend on memory to understand what I'm
 

00:00:52.379 --> 00:00:55.369 align:start position:0%
depend on memory to understand what I'm
saying<00:00:52.920><c> to</c><00:00:53.579><c> know</c><00:00:53.760><c> where</c><00:00:54.059><c> you</c><00:00:54.300><c> live</c><00:00:54.600><c> and</c><00:00:55.079><c> to</c><00:00:55.260><c> do</c>

00:00:55.369 --> 00:00:55.379 align:start position:0%
saying to know where you live and to do
 

00:00:55.379 --> 00:00:56.569 align:start position:0%
saying to know where you live and to do
your<00:00:55.620><c> job</c>

00:00:56.569 --> 00:00:56.579 align:start position:0%
your job
 

00:00:56.579 --> 00:00:59.090 align:start position:0%
your job
you<00:00:57.000><c> need</c><00:00:57.120><c> memory</c><00:00:57.539><c> to</c><00:00:57.780><c> get</c><00:00:57.960><c> dressed</c><00:00:58.500><c> play</c>

00:00:59.090 --> 00:00:59.100 align:start position:0%
you need memory to get dressed play
 

00:00:59.100 --> 00:01:01.369 align:start position:0%
you need memory to get dressed play
tennis<00:00:59.460><c> and</c><00:00:59.820><c> drive</c><00:01:00.000><c> your</c><00:01:00.360><c> car</c>

00:01:01.369 --> 00:01:01.379 align:start position:0%
tennis and drive your car
 

00:01:01.379 --> 00:01:04.490 align:start position:0%
tennis and drive your car
you<00:01:02.160><c> use</c><00:01:02.340><c> memory</c><00:01:02.879><c> from</c><00:01:03.420><c> the</c><00:01:03.660><c> moment</c><00:01:04.019><c> you</c><00:01:04.260><c> wake</c>

00:01:04.490 --> 00:01:04.500 align:start position:0%
you use memory from the moment you wake
 

00:01:04.500 --> 00:01:07.609 align:start position:0%
you use memory from the moment you wake
up<00:01:04.680><c> until</c><00:01:05.280><c> the</c><00:01:05.640><c> moment</c><00:01:05.880><c> you</c><00:01:06.119><c> go</c><00:01:06.299><c> to</c><00:01:06.420><c> sleep</c><00:01:06.720><c> and</c>

00:01:07.609 --> 00:01:07.619 align:start position:0%
up until the moment you go to sleep and
 

00:01:07.619 --> 00:01:10.250 align:start position:0%
up until the moment you go to sleep and
even<00:01:07.860><c> then</c><00:01:08.220><c> your</c><00:01:08.820><c> memory</c><00:01:09.119><c> processes</c><00:01:09.720><c> are</c><00:01:09.960><c> busy</c>

00:01:10.250 --> 00:01:10.260 align:start position:0%
even then your memory processes are busy
 

00:01:10.260 --> 00:01:11.450 align:start position:0%
even then your memory processes are busy
at<00:01:10.439><c> work</c>

00:01:11.450 --> 00:01:11.460 align:start position:0%
at work
 

00:01:11.460 --> 00:01:14.030 align:start position:0%
at work
the<00:01:12.180><c> significant</c><00:01:12.780><c> facts</c><00:01:13.380><c> and</c><00:01:13.500><c> moments</c><00:01:13.920><c> of</c>

00:01:14.030 --> 00:01:14.040 align:start position:0%
the significant facts and moments of
 

00:01:14.040 --> 00:01:16.370 align:start position:0%
the significant facts and moments of
your<00:01:14.220><c> life</c><00:01:14.460><c> strung</c><00:01:14.939><c> together</c><00:01:15.119><c> create</c><00:01:16.020><c> your</c>

00:01:16.370 --> 00:01:16.380 align:start position:0%
your life strung together create your
 

00:01:16.380 --> 00:01:18.950 align:start position:0%
your life strung together create your
life's<00:01:16.740><c> narrative</c><00:01:17.299><c> memory</c><00:01:18.299><c> allows</c><00:01:18.720><c> you</c><00:01:18.780><c> to</c>

00:01:18.950 --> 00:01:18.960 align:start position:0%
life's narrative memory allows you to
 

00:01:18.960 --> 00:01:20.929 align:start position:0%
life's narrative memory allows you to
have<00:01:19.140><c> a</c><00:01:19.260><c> sense</c><00:01:19.439><c> of</c><00:01:19.560><c> who</c><00:01:19.740><c> you</c><00:01:19.979><c> are</c><00:01:20.220><c> and</c><00:01:20.759><c> who</c>

00:01:20.929 --> 00:01:20.939 align:start position:0%
have a sense of who you are and who
 

00:01:20.939 --> 00:01:22.749 align:start position:0%
have a sense of who you are and who
you've<00:01:21.299><c> been</c>

00:01:22.749 --> 00:01:22.759 align:start position:0%
you've been
 

00:01:22.759 --> 00:01:25.969 align:start position:0%
you've been
scientifically<00:01:23.759><c> speaking</c><00:01:24.380><c> what</c><00:01:25.380><c> even</c><00:01:25.560><c> is</c><00:01:25.799><c> a</c>

00:01:25.969 --> 00:01:25.979 align:start position:0%
scientifically speaking what even is a
 

00:01:25.979 --> 00:01:28.730 align:start position:0%
scientifically speaking what even is a
memory<00:01:26.280><c> how</c><00:01:27.180><c> were</c><00:01:27.360><c> memories</c><00:01:27.780><c> made</c><00:01:28.200><c> and</c>

00:01:28.730 --> 00:01:28.740 align:start position:0%
memory how were memories made and
 

00:01:28.740 --> 00:01:30.109 align:start position:0%
memory how were memories made and
retrieved

00:01:30.109 --> 00:01:30.119 align:start position:0%
retrieved
 

00:01:30.119 --> 00:01:32.929 align:start position:0%
retrieved
memory<00:01:30.780><c> creation</c><00:01:31.259><c> takes</c><00:01:31.920><c> place</c><00:01:32.220><c> in</c><00:01:32.700><c> four</c>

00:01:32.929 --> 00:01:32.939 align:start position:0%
memory creation takes place in four
 

00:01:32.939 --> 00:01:34.429 align:start position:0%
memory creation takes place in four
basic<00:01:33.420><c> steps</c>

00:01:34.429 --> 00:01:34.439 align:start position:0%
basic steps
 

00:01:34.439 --> 00:01:37.910 align:start position:0%
basic steps
step<00:01:34.860><c> one</c><00:01:35.240><c> your</c><00:01:36.240><c> brain</c><00:01:36.479><c> takes</c><00:01:36.780><c> in</c><00:01:37.020><c> the</c><00:01:37.380><c> sights</c>

00:01:37.910 --> 00:01:37.920 align:start position:0%
step one your brain takes in the sights
 

00:01:37.920 --> 00:01:40.969 align:start position:0%
step one your brain takes in the sights
sounds<00:01:38.280><c> smells</c><00:01:39.000><c> information</c><00:01:39.619><c> emotion</c><00:01:40.619><c> and</c>

00:01:40.969 --> 00:01:40.979 align:start position:0%
sounds smells information emotion and
 

00:01:40.979 --> 00:01:43.310 align:start position:0%
sounds smells information emotion and
meaning<00:01:41.280><c> of</c><00:01:41.939><c> what</c><00:01:42.180><c> you</c><00:01:42.360><c> perceived</c><00:01:42.900><c> and</c><00:01:43.079><c> paid</c>

00:01:43.310 --> 00:01:43.320 align:start position:0%
meaning of what you perceived and paid
 

00:01:43.320 --> 00:01:46.249 align:start position:0%
meaning of what you perceived and paid
attention<00:01:43.680><c> to</c><00:01:44.040><c> and</c><00:01:44.880><c> translates</c><00:01:45.420><c> all</c><00:01:45.900><c> of</c><00:01:46.020><c> this</c>

00:01:46.249 --> 00:01:46.259 align:start position:0%
attention to and translates all of this
 

00:01:46.259 --> 00:01:50.030 align:start position:0%
attention to and translates all of this
into<00:01:46.740><c> patterns</c><00:01:47.400><c> of</c><00:01:47.579><c> neurological</c><00:01:48.240><c> activity</c>

00:01:50.030 --> 00:01:50.040 align:start position:0%
into patterns of neurological activity
 

00:01:50.040 --> 00:01:53.929 align:start position:0%
into patterns of neurological activity
step<00:01:50.579><c> two</c><00:01:51.200><c> your</c><00:01:52.200><c> brain</c><00:01:52.439><c> then</c><00:01:52.740><c> links</c><00:01:53.520><c> all</c><00:01:53.820><c> of</c>

00:01:53.929 --> 00:01:53.939 align:start position:0%
step two your brain then links all of
 

00:01:53.939 --> 00:01:56.929 align:start position:0%
step two your brain then links all of
that<00:01:54.240><c> previously</c><00:01:54.780><c> unrelated</c><00:01:55.560><c> activity</c><00:01:56.220><c> into</c>

00:01:56.929 --> 00:01:56.939 align:start position:0%
that previously unrelated activity into
 

00:01:56.939 --> 00:01:59.030 align:start position:0%
that previously unrelated activity into
a<00:01:57.420><c> single</c><00:01:57.780><c> pattern</c><00:01:58.140><c> of</c><00:01:58.500><c> associated</c>

00:01:59.030 --> 00:01:59.040 align:start position:0%
a single pattern of associated
 

00:01:59.040 --> 00:02:02.210 align:start position:0%
a single pattern of associated
connections<00:01:59.899><c> your</c><00:02:00.899><c> brain</c><00:02:01.140><c> weaves</c><00:02:01.799><c> all</c><00:02:02.040><c> that</c>

00:02:02.210 --> 00:02:02.220 align:start position:0%
connections your brain weaves all that
 

00:02:02.220 --> 00:02:04.429 align:start position:0%
connections your brain weaves all that
information<00:02:02.520><c> together</c>

00:02:04.429 --> 00:02:04.439 align:start position:0%
information together
 

00:02:04.439 --> 00:02:08.089 align:start position:0%
information together
step<00:02:04.860><c> three</c><00:02:05.180><c> that</c><00:02:06.180><c> woven</c><00:02:06.659><c> pattern</c><00:02:07.259><c> persists</c>

00:02:08.089 --> 00:02:08.099 align:start position:0%
step three that woven pattern persists
 

00:02:08.099 --> 00:02:11.630 align:start position:0%
step three that woven pattern persists
in<00:02:08.220><c> your</c><00:02:08.399><c> brain</c><00:02:08.700><c> stored</c><00:02:09.539><c> as</c><00:02:09.780><c> a</c><00:02:09.899><c> neural</c><00:02:10.259><c> circuit</c>

00:02:11.630 --> 00:02:11.640 align:start position:0%
in your brain stored as a neural circuit
 

00:02:11.640 --> 00:02:13.010 align:start position:0%
in your brain stored as a neural circuit
step<00:02:12.060><c> four</c>

00:02:13.010 --> 00:02:13.020 align:start position:0%
step four
 

00:02:13.020 --> 00:02:15.170 align:start position:0%
step four
when<00:02:13.620><c> this</c><00:02:13.860><c> neural</c><00:02:14.280><c> circuit</c><00:02:14.700><c> is</c><00:02:14.940><c> later</c>

00:02:15.170 --> 00:02:15.180 align:start position:0%
when this neural circuit is later
 

00:02:15.180 --> 00:02:19.670 align:start position:0%
when this neural circuit is later
activated<00:02:16.160><c> tomorrow</c><00:02:17.239><c> next</c><00:02:18.239><c> month</c><00:02:18.599><c> maybe</c><00:02:19.319><c> even</c>

00:02:19.670 --> 00:02:19.680 align:start position:0%
activated tomorrow next month maybe even
 

00:02:19.680 --> 00:02:22.970 align:start position:0%
activated tomorrow next month maybe even
20<00:02:20.099><c> years</c><00:02:20.400><c> from</c><00:02:20.760><c> now</c><00:02:21.200><c> you</c><00:02:22.200><c> can</c><00:02:22.319><c> then</c><00:02:22.440><c> retrieve</c>

00:02:22.970 --> 00:02:22.980 align:start position:0%
20 years from now you can then retrieve
 

00:02:22.980 --> 00:02:24.890 align:start position:0%
20 years from now you can then retrieve
this<00:02:23.160><c> woven</c><00:02:23.520><c> information</c>

00:02:24.890 --> 00:02:24.900 align:start position:0%
this woven information
 

00:02:24.900 --> 00:02:26.630 align:start position:0%
this woven information
you<00:02:25.440><c> remember</c>

00:02:26.630 --> 00:02:26.640 align:start position:0%
you remember
 

00:02:26.640 --> 00:02:30.229 align:start position:0%
you remember
let's<00:02:27.300><c> go</c><00:02:27.540><c> back</c><00:02:27.660><c> to</c><00:02:27.900><c> Step</c><00:02:28.080><c> One</c><00:02:28.440><c> let's</c><00:02:29.400><c> say</c><00:02:29.640><c> I</c>

00:02:30.229 --> 00:02:30.239 align:start position:0%
let's go back to Step One let's say I
 

00:02:30.239 --> 00:02:32.890 align:start position:0%
let's go back to Step One let's say I
meet<00:02:30.420><c> Oprah</c><00:02:30.959><c> Winfrey</c><00:02:31.500><c> and</c><00:02:31.920><c> she</c><00:02:32.160><c> says</c><00:02:32.459><c> to</c><00:02:32.580><c> me</c>

00:02:32.890 --> 00:02:32.900 align:start position:0%
meet Oprah Winfrey and she says to me
 

00:02:32.900 --> 00:02:36.890 align:start position:0%
meet Oprah Winfrey and she says to me
Lisa<00:02:33.900><c> I</c><00:02:34.860><c> love</c><00:02:35.340><c> your</c><00:02:35.819><c> book</c>

00:02:36.890 --> 00:02:36.900 align:start position:0%
Lisa I love your book
 

00:02:36.900 --> 00:02:40.130 align:start position:0%
Lisa I love your book
the<00:02:37.620><c> sight</c><00:02:37.800><c> of</c><00:02:38.099><c> Oprah</c><00:02:38.580><c> travels</c><00:02:39.360><c> from</c><00:02:39.720><c> my</c><00:02:39.959><c> eyes</c>

00:02:40.130 --> 00:02:40.140 align:start position:0%
the sight of Oprah travels from my eyes
 

00:02:40.140 --> 00:02:42.710 align:start position:0%
the sight of Oprah travels from my eyes
to<00:02:40.560><c> the</c><00:02:40.739><c> back</c><00:02:40.980><c> of</c><00:02:41.220><c> my</c><00:02:41.519><c> brain</c><00:02:41.819><c> my</c><00:02:42.239><c> occipital</c>

00:02:42.710 --> 00:02:42.720 align:start position:0%
to the back of my brain my occipital
 

00:02:42.720 --> 00:02:45.110 align:start position:0%
to the back of my brain my occipital
lobe<00:02:43.200><c> and</c><00:02:43.739><c> is</c><00:02:43.920><c> processed</c><00:02:44.519><c> in</c><00:02:44.640><c> my</c><00:02:44.819><c> visual</c>

00:02:45.110 --> 00:02:45.120 align:start position:0%
lobe and is processed in my visual
 

00:02:45.120 --> 00:02:48.830 align:start position:0%
lobe and is processed in my visual
cortex<00:02:45.860><c> the</c><00:02:46.860><c> sound</c><00:02:47.099><c> of</c><00:02:47.340><c> Oprah's</c><00:02:47.879><c> voice</c><00:02:48.120><c> is</c>

00:02:48.830 --> 00:02:48.840 align:start position:0%
cortex the sound of Oprah's voice is
 

00:02:48.840 --> 00:02:51.650 align:start position:0%
cortex the sound of Oprah's voice is
translated<00:02:49.440><c> into</c><00:02:49.739><c> neurological</c><00:02:50.519><c> activity</c><00:02:51.120><c> in</c>

00:02:51.650 --> 00:02:51.660 align:start position:0%
translated into neurological activity in
 

00:02:51.660 --> 00:02:54.050 align:start position:0%
translated into neurological activity in
my<00:02:51.840><c> auditory</c><00:02:52.319><c> cortex</c><00:02:52.860><c> and</c><00:02:53.160><c> my</c><00:02:53.340><c> temporal</c><00:02:53.700><c> lobes</c>

00:02:54.050 --> 00:02:54.060 align:start position:0%
my auditory cortex and my temporal lobes
 

00:02:54.060 --> 00:02:56.589 align:start position:0%
my auditory cortex and my temporal lobes
not<00:02:54.540><c> far</c><00:02:54.720><c> from</c><00:02:54.900><c> my</c><00:02:55.140><c> ears</c>

00:02:56.589 --> 00:02:56.599 align:start position:0%
not far from my ears
 

00:02:56.599 --> 00:02:58.729 align:start position:0%
not far from my ears
comprehending<00:02:57.599><c> the</c><00:02:57.900><c> meaning</c><00:02:58.080><c> of</c><00:02:58.440><c> these</c>

00:02:58.729 --> 00:02:58.739 align:start position:0%
comprehending the meaning of these
 

00:02:58.739 --> 00:03:00.530 align:start position:0%
comprehending the meaning of these
sounds<00:02:58.920><c> occurs</c><00:02:59.580><c> in</c><00:02:59.760><c> a</c><00:02:59.940><c> specific</c><00:03:00.180><c> location</c>

00:03:00.530 --> 00:03:00.540 align:start position:0%
sounds occurs in a specific location
 

00:03:00.540 --> 00:03:02.750 align:start position:0%
sounds occurs in a specific location
called<00:03:01.019><c> Wernicke's</c><00:03:01.860><c> area</c>

00:03:02.750 --> 00:03:02.760 align:start position:0%
called Wernicke's area
 

00:03:02.760 --> 00:03:05.809 align:start position:0%
called Wernicke's area
how<00:03:03.239><c> meeting</c><00:03:03.540><c> Oprah</c><00:03:04.200><c> made</c><00:03:04.440><c> me</c><00:03:04.680><c> feel</c><00:03:05.160><c> is</c>

00:03:05.809 --> 00:03:05.819 align:start position:0%
how meeting Oprah made me feel is
 

00:03:05.819 --> 00:03:08.210 align:start position:0%
how meeting Oprah made me feel is
mediated<00:03:06.300><c> by</c><00:03:06.599><c> the</c><00:03:06.840><c> activity</c><00:03:07.319><c> of</c><00:03:07.560><c> neurons</c><00:03:07.920><c> in</c>

00:03:08.210 --> 00:03:08.220 align:start position:0%
mediated by the activity of neurons in
 

00:03:08.220 --> 00:03:10.790 align:start position:0%
mediated by the activity of neurons in
my<00:03:08.400><c> brain's</c><00:03:08.760><c> limbic</c><00:03:09.239><c> system</c>

00:03:10.790 --> 00:03:10.800 align:start position:0%
my brain's limbic system
 

00:03:10.800 --> 00:03:13.490 align:start position:0%
my brain's limbic system
so<00:03:11.400><c> where</c><00:03:11.819><c> would</c><00:03:12.060><c> my</c><00:03:12.420><c> memory</c><00:03:12.959><c> of</c><00:03:13.319><c> meeting</c>

00:03:13.490 --> 00:03:13.500 align:start position:0%
so where would my memory of meeting
 

00:03:13.500 --> 00:03:15.350 align:start position:0%
so where would my memory of meeting
Oprah<00:03:14.099><c> be</c><00:03:14.280><c> stored</c>

00:03:15.350 --> 00:03:15.360 align:start position:0%
Oprah be stored
 

00:03:15.360 --> 00:03:18.110 align:start position:0%
Oprah be stored
well<00:03:15.900><c> unlike</c><00:03:16.319><c> Vision</c><00:03:16.800><c> hearing</c><00:03:17.640><c> language</c>

00:03:18.110 --> 00:03:18.120 align:start position:0%
well unlike Vision hearing language
 

00:03:18.120 --> 00:03:21.410 align:start position:0%
well unlike Vision hearing language
emotion<00:03:18.959><c> there</c><00:03:19.860><c> is</c><00:03:20.040><c> no</c><00:03:20.400><c> specialized</c><00:03:21.000><c> Memory</c>

00:03:21.410 --> 00:03:21.420 align:start position:0%
emotion there is no specialized Memory
 

00:03:21.420 --> 00:03:24.470 align:start position:0%
emotion there is no specialized Memory
Center<00:03:21.739><c> there</c><00:03:22.739><c> is</c><00:03:22.860><c> no</c><00:03:23.099><c> memory</c><00:03:23.459><c> bank</c>

00:03:24.470 --> 00:03:24.480 align:start position:0%
Center there is no memory bank
 

00:03:24.480 --> 00:03:27.290 align:start position:0%
Center there is no memory bank
my<00:03:25.200><c> memory</c><00:03:25.500><c> of</c><00:03:25.800><c> meeting</c><00:03:25.980><c> Oprah</c><00:03:26.700><c> would</c><00:03:27.120><c> be</c>

00:03:27.290 --> 00:03:27.300 align:start position:0%
my memory of meeting Oprah would be
 

00:03:27.300 --> 00:03:29.330 align:start position:0%
my memory of meeting Oprah would be
stored<00:03:27.720><c> in</c><00:03:27.900><c> the</c><00:03:28.140><c> connected</c><00:03:28.620><c> pattern</c><00:03:29.159><c> of</c>

00:03:29.330 --> 00:03:29.340 align:start position:0%
stored in the connected pattern of
 

00:03:29.340 --> 00:03:31.850 align:start position:0%
stored in the connected pattern of
activity<00:03:29.819><c> between</c><00:03:30.599><c> the</c><00:03:31.019><c> parts</c><00:03:31.140><c> of</c><00:03:31.379><c> the</c><00:03:31.620><c> brain</c>

00:03:31.850 --> 00:03:31.860 align:start position:0%
activity between the parts of the brain
 

00:03:31.860 --> 00:03:34.790 align:start position:0%
activity between the parts of the brain
that<00:03:32.220><c> registered</c><00:03:32.700><c> the</c><00:03:32.819><c> initial</c><00:03:33.180><c> experience</c>

00:03:34.790 --> 00:03:34.800 align:start position:0%
that registered the initial experience
 

00:03:34.800 --> 00:03:37.550 align:start position:0%
that registered the initial experience
it<00:03:35.280><c> would</c><00:03:35.459><c> be</c><00:03:35.640><c> contained</c><00:03:36.239><c> in</c><00:03:36.480><c> this</c><00:03:36.780><c> sight</c>

00:03:37.550 --> 00:03:37.560 align:start position:0%
it would be contained in this sight
 

00:03:37.560 --> 00:03:40.070 align:start position:0%
it would be contained in this sight
sound<00:03:37.920><c> language</c><00:03:38.400><c> feeling</c><00:03:38.940><c> linked</c><00:03:39.659><c> neural</c>

00:03:40.070 --> 00:03:40.080 align:start position:0%
sound language feeling linked neural
 

00:03:40.080 --> 00:03:41.509 align:start position:0%
sound language feeling linked neural
circuit

00:03:41.509 --> 00:03:41.519 align:start position:0%
circuit
 

00:03:41.519 --> 00:03:44.809 align:start position:0%
circuit
our<00:03:42.239><c> brains</c><00:03:42.720><c> are</c><00:03:43.620><c> Limitless</c><00:03:44.159><c> in</c><00:03:44.580><c> their</c>

00:03:44.809 --> 00:03:44.819 align:start position:0%
our brains are Limitless in their
 

00:03:44.819 --> 00:03:46.729 align:start position:0%
our brains are Limitless in their
capacity<00:03:45.299><c> to</c><00:03:45.659><c> create</c><00:03:45.780><c> linked</c><00:03:46.379><c> neural</c>

00:03:46.729 --> 00:03:46.739 align:start position:0%
capacity to create linked neural
 

00:03:46.739 --> 00:03:50.930 align:start position:0%
capacity to create linked neural
circuits<00:03:47.280><c> new</c><00:03:48.000><c> memories</c><00:03:48.620><c> at</c><00:03:49.620><c> any</c><00:03:49.920><c> age</c>

00:03:50.930 --> 00:03:50.940 align:start position:0%
circuits new memories at any age
 

00:03:50.940 --> 00:03:53.210 align:start position:0%
circuits new memories at any age
and<00:03:51.360><c> our</c><00:03:51.480><c> brains</c><00:03:51.900><c> will</c><00:03:52.140><c> never</c><00:03:52.440><c> run</c><00:03:52.739><c> out</c><00:03:53.040><c> of</c>

00:03:53.210 --> 00:03:53.220 align:start position:0%
and our brains will never run out of
 

00:03:53.220 --> 00:03:56.690 align:start position:0%
and our brains will never run out of
storage<00:03:53.580><c> space</c><00:03:54.120><c> which</c><00:03:54.840><c> is</c><00:03:55.019><c> both</c><00:03:55.340><c> amazing</c><00:03:56.340><c> and</c>

00:03:56.690 --> 00:03:56.700 align:start position:0%
storage space which is both amazing and
 

00:03:56.700 --> 00:04:00.470 align:start position:0%
storage space which is both amazing and
reassuring<00:03:57.480><c> especially</c><00:03:58.440><c> as</c><00:03:58.680><c> we</c><00:03:58.860><c> grow</c><00:03:59.040><c> older</c>

00:04:00.470 --> 00:04:00.480 align:start position:0%
reassuring especially as we grow older
 

00:04:00.480 --> 00:04:03.530 align:start position:0%
reassuring especially as we grow older
so<00:04:01.200><c> how</c><00:04:01.560><c> do</c><00:04:01.739><c> our</c><00:04:01.980><c> brains</c><00:04:02.340><c> create</c><00:04:02.640><c> these</c><00:04:03.180><c> linked</c>

00:04:03.530 --> 00:04:03.540 align:start position:0%
so how do our brains create these linked
 

00:04:03.540 --> 00:04:05.570 align:start position:0%
so how do our brains create these linked
circuits<00:04:04.019><c> called</c><00:04:04.260><c> Memories</c>

00:04:05.570 --> 00:04:05.580 align:start position:0%
circuits called Memories
 

00:04:05.580 --> 00:04:08.270 align:start position:0%
circuits called Memories
the<00:04:06.299><c> information</c><00:04:06.620><c> contained</c><00:04:07.620><c> within</c><00:04:08.040><c> an</c>

00:04:08.270 --> 00:04:08.280 align:start position:0%
the information contained within an
 

00:04:08.280 --> 00:04:10.429 align:start position:0%
the information contained within an
experience<00:04:08.760><c> that</c><00:04:09.360><c> is</c><00:04:09.599><c> collected</c><00:04:10.080><c> and</c><00:04:10.260><c> paid</c>

00:04:10.429 --> 00:04:10.439 align:start position:0%
experience that is collected and paid
 

00:04:10.439 --> 00:04:13.190 align:start position:0%
experience that is collected and paid
attention<00:04:10.799><c> to</c><00:04:10.980><c> by</c><00:04:11.280><c> your</c><00:04:11.519><c> brain</c><00:04:11.840><c> the</c><00:04:12.840><c> sensory</c>

00:04:13.190 --> 00:04:13.200 align:start position:0%
attention to by your brain the sensory
 

00:04:13.200 --> 00:04:16.129 align:start position:0%
attention to by your brain the sensory
perceptions<00:04:13.799><c> the</c><00:04:14.459><c> emotion</c><00:04:15.000><c> the</c><00:04:15.659><c> who</c><00:04:15.900><c> what</c>

00:04:16.129 --> 00:04:16.139 align:start position:0%
perceptions the emotion the who what
 

00:04:16.139 --> 00:04:19.310 align:start position:0%
perceptions the emotion the who what
where<00:04:16.500><c> when</c><00:04:16.739><c> and</c><00:04:16.979><c> why</c><00:04:17.299><c> is</c><00:04:18.299><c> linked</c><00:04:18.780><c> by</c><00:04:19.019><c> a</c><00:04:19.199><c> part</c>

00:04:19.310 --> 00:04:19.320 align:start position:0%
where when and why is linked by a part
 

00:04:19.320 --> 00:04:21.890 align:start position:0%
where when and why is linked by a part
of<00:04:19.500><c> your</c><00:04:19.620><c> brain</c><00:04:19.919><c> called</c><00:04:20.220><c> the</c><00:04:20.459><c> hippocampus</c>

00:04:21.890 --> 00:04:21.900 align:start position:0%
of your brain called the hippocampus
 

00:04:21.900 --> 00:04:25.189 align:start position:0%
of your brain called the hippocampus
this<00:04:22.880><c> seahorse-shaped</c><00:04:23.880><c> structure</c><00:04:24.360><c> deep</c><00:04:24.960><c> in</c>

00:04:25.189 --> 00:04:25.199 align:start position:0%
this seahorse-shaped structure deep in
 

00:04:25.199 --> 00:04:27.170 align:start position:0%
this seahorse-shaped structure deep in
the<00:04:25.320><c> middle</c><00:04:25.440><c> of</c><00:04:25.620><c> your</c><00:04:25.860><c> brain</c><00:04:26.180><c> repeatedly</c>

00:04:27.170 --> 00:04:27.180 align:start position:0%
the middle of your brain repeatedly
 

00:04:27.180 --> 00:04:29.090 align:start position:0%
the middle of your brain repeatedly
activates<00:04:27.840><c> the</c><00:04:28.199><c> parts</c><00:04:28.380><c> of</c><00:04:28.620><c> the</c><00:04:28.860><c> brain</c>

00:04:29.090 --> 00:04:29.100 align:start position:0%
activates the parts of the brain
 

00:04:29.100 --> 00:04:31.249 align:start position:0%
activates the parts of the brain
involved<00:04:29.940><c> in</c><00:04:30.060><c> what</c><00:04:30.300><c> is</c><00:04:30.479><c> to</c><00:04:30.600><c> be</c><00:04:30.720><c> remembered</c>

00:04:31.249 --> 00:04:31.259 align:start position:0%
involved in what is to be remembered
 

00:04:31.259 --> 00:04:34.010 align:start position:0%
involved in what is to be remembered
until<00:04:31.919><c> those</c><00:04:32.340><c> parts</c><00:04:32.580><c> of</c><00:04:32.820><c> the</c><00:04:33.000><c> brain</c><00:04:33.240><c> become</c><00:04:33.720><c> a</c>

00:04:34.010 --> 00:04:34.020 align:start position:0%
until those parts of the brain become a
 

00:04:34.020 --> 00:04:36.670 align:start position:0%
until those parts of the brain become a
stable<00:04:34.460><c> connected</c><00:04:35.460><c> pattern</c><00:04:35.940><c> of</c><00:04:36.120><c> activity</c>

00:04:36.670 --> 00:04:36.680 align:start position:0%
stable connected pattern of activity
 

00:04:36.680 --> 00:04:39.409 align:start position:0%
stable connected pattern of activity
essentially<00:04:37.680><c> wiring</c><00:04:38.400><c> them</c><00:04:38.580><c> together</c><00:04:38.820><c> to</c><00:04:39.240><c> form</c>

00:04:39.409 --> 00:04:39.419 align:start position:0%
essentially wiring them together to form
 

00:04:39.419 --> 00:04:40.969 align:start position:0%
essentially wiring them together to form
a<00:04:39.660><c> new</c><00:04:39.780><c> memory</c>

00:04:40.969 --> 00:04:40.979 align:start position:0%
a new memory
 

00:04:40.979 --> 00:04:44.270 align:start position:0%
a new memory
if<00:04:41.639><c> your</c><00:04:41.820><c> hippocampus</c><00:04:42.540><c> is</c><00:04:42.780><c> damaged</c><00:04:43.380><c> your</c>

00:04:44.270 --> 00:04:44.280 align:start position:0%
if your hippocampus is damaged your
 

00:04:44.280 --> 00:04:46.610 align:start position:0%
if your hippocampus is damaged your
ability<00:04:44.580><c> to</c><00:04:45.000><c> create</c><00:04:45.120><c> new</c><00:04:45.479><c> memories</c><00:04:45.900><c> will</c><00:04:46.440><c> be</c>

00:04:46.610 --> 00:04:46.620 align:start position:0%
ability to create new memories will be
 

00:04:46.620 --> 00:04:48.010 align:start position:0%
ability to create new memories will be
impaired

00:04:48.010 --> 00:04:48.020 align:start position:0%
impaired
 

00:04:48.020 --> 00:04:50.870 align:start position:0%
impaired
Alzheimer's<00:04:49.020><c> disease</c><00:04:49.440><c> begins</c><00:04:50.100><c> its</c><00:04:50.460><c> Rampage</c>

00:04:50.870 --> 00:04:50.880 align:start position:0%
Alzheimer's disease begins its Rampage
 

00:04:50.880 --> 00:04:52.850 align:start position:0%
Alzheimer's disease begins its Rampage
in<00:04:51.240><c> the</c><00:04:51.360><c> hippocampus</c>

00:04:52.850 --> 00:04:52.860 align:start position:0%
in the hippocampus
 

00:04:52.860 --> 00:04:55.730 align:start position:0%
in the hippocampus
as<00:04:53.460><c> a</c><00:04:53.639><c> result</c><00:04:53.759><c> the</c><00:04:54.540><c> first</c><00:04:54.780><c> symptoms</c><00:04:55.080><c> of</c><00:04:55.500><c> this</c>

00:04:55.730 --> 00:04:55.740 align:start position:0%
as a result the first symptoms of this
 

00:04:55.740 --> 00:04:57.830 align:start position:0%
as a result the first symptoms of this
disease<00:04:56.100><c> are</c><00:04:56.580><c> typically</c><00:04:56.940><c> forgetting</c><00:04:57.540><c> what</c>

00:04:57.830 --> 00:04:57.840 align:start position:0%
disease are typically forgetting what
 

00:04:57.840 --> 00:05:00.469 align:start position:0%
disease are typically forgetting what
happened<00:04:58.020><c> earlier</c><00:04:58.620><c> today</c><00:04:58.979><c> and</c><00:04:59.759><c> repeating</c><00:05:00.300><c> the</c>

00:05:00.469 --> 00:05:00.479 align:start position:0%
happened earlier today and repeating the
 

00:05:00.479 --> 00:05:04.129 align:start position:0%
happened earlier today and repeating the
same<00:05:00.720><c> story</c><00:05:01.080><c> or</c><00:05:01.500><c> question</c><00:05:01.740><c> over</c><00:05:02.220><c> and</c><00:05:02.460><c> over</c>

00:05:04.129 --> 00:05:04.139 align:start position:0%
same story or question over and over
 

00:05:04.139 --> 00:05:05.689 align:start position:0%
same story or question over and over
what<00:05:04.680><c> happens</c><00:05:04.800><c> if</c><00:05:05.100><c> you</c><00:05:05.280><c> don't</c><00:05:05.400><c> have</c><00:05:05.580><c> a</c>

00:05:05.689 --> 00:05:05.699 align:start position:0%
what happens if you don't have a
 

00:05:05.699 --> 00:05:07.370 align:start position:0%
what happens if you don't have a
hippocampus<00:05:06.300><c> at</c><00:05:06.479><c> all</c>

00:05:07.370 --> 00:05:07.380 align:start position:0%
hippocampus at all
 

00:05:07.380 --> 00:05:11.629 align:start position:0%
hippocampus at all
a<00:05:08.160><c> man</c><00:05:08.340><c> named</c><00:05:08.699><c> Henry</c><00:05:09.120><c> malleason</c><00:05:09.720><c> or</c><00:05:10.500><c> HM</c><00:05:11.040><c> as</c><00:05:11.400><c> he</c>

00:05:11.629 --> 00:05:11.639 align:start position:0%
a man named Henry malleason or HM as he
 

00:05:11.639 --> 00:05:13.790 align:start position:0%
a man named Henry malleason or HM as he
is<00:05:11.759><c> called</c><00:05:12.000><c> in</c><00:05:12.180><c> the</c><00:05:12.360><c> literature</c><00:05:12.780><c> had</c><00:05:13.560><c> the</c>

00:05:13.790 --> 00:05:13.800 align:start position:0%
is called in the literature had the
 

00:05:13.800 --> 00:05:16.129 align:start position:0%
is called in the literature had the
hippocampus<00:05:14.520><c> and</c><00:05:14.820><c> surrounding</c><00:05:15.300><c> tissue</c><00:05:15.720><c> on</c>

00:05:16.129 --> 00:05:16.139 align:start position:0%
hippocampus and surrounding tissue on
 

00:05:16.139 --> 00:05:18.230 align:start position:0%
hippocampus and surrounding tissue on
both<00:05:16.380><c> sides</c><00:05:16.740><c> of</c><00:05:16.860><c> his</c><00:05:17.040><c> brain</c><00:05:17.340><c> surgically</c>

00:05:18.230 --> 00:05:18.240 align:start position:0%
both sides of his brain surgically
 

00:05:18.240 --> 00:05:20.330 align:start position:0%
both sides of his brain surgically
removed<00:05:18.780><c> in</c><00:05:19.080><c> an</c><00:05:19.259><c> attempt</c><00:05:19.500><c> to</c><00:05:19.740><c> cure</c><00:05:19.860><c> him</c><00:05:20.100><c> of</c>

00:05:20.330 --> 00:05:20.340 align:start position:0%
removed in an attempt to cure him of
 

00:05:20.340 --> 00:05:22.689 align:start position:0%
removed in an attempt to cure him of
unrelenting<00:05:21.000><c> seizures</c><00:05:21.479><c> the</c><00:05:22.380><c> surgery</c>

00:05:22.689 --> 00:05:22.699 align:start position:0%
unrelenting seizures the surgery
 

00:05:22.699 --> 00:05:25.490 align:start position:0%
unrelenting seizures the surgery
alleviated<00:05:23.699><c> Henry's</c><00:05:24.360><c> seizures</c><00:05:24.720><c> but</c><00:05:25.259><c> he</c>

00:05:25.490 --> 00:05:25.500 align:start position:0%
alleviated Henry's seizures but he
 

00:05:25.500 --> 00:05:27.550 align:start position:0%
alleviated Henry's seizures but he
tragically<00:05:26.039><c> traded</c><00:05:26.520><c> one</c><00:05:26.759><c> plague</c><00:05:27.120><c> for</c><00:05:27.300><c> another</c>

00:05:27.550 --> 00:05:27.560 align:start position:0%
tragically traded one plague for another
 

00:05:27.560 --> 00:05:31.189 align:start position:0%
tragically traded one plague for another
for<00:05:28.560><c> the</c><00:05:28.740><c> next</c><00:05:28.919><c> 55</c><00:05:29.699><c> years</c><00:05:30.000><c> until</c><00:05:30.419><c> his</c><00:05:30.720><c> death</c><00:05:30.960><c> at</c>

00:05:31.189 --> 00:05:31.199 align:start position:0%
for the next 55 years until his death at
 

00:05:31.199 --> 00:05:33.830 align:start position:0%
for the next 55 years until his death at
the<00:05:31.320><c> age</c><00:05:31.440><c> of</c><00:05:31.680><c> 82</c><00:05:32.100><c> Henry</c><00:05:33.060><c> could</c><00:05:33.360><c> no</c><00:05:33.600><c> longer</c>

00:05:33.830 --> 00:05:33.840 align:start position:0%
the age of 82 Henry could no longer
 

00:05:33.840 --> 00:05:35.990 align:start position:0%
the age of 82 Henry could no longer
consciously<00:05:34.380><c> remember</c><00:05:34.680><c> any</c><00:05:35.520><c> new</c><00:05:35.759><c> information</c>

00:05:35.990 --> 00:05:36.000 align:start position:0%
consciously remember any new information
 

00:05:36.000 --> 00:05:38.210 align:start position:0%
consciously remember any new information
or<00:05:36.539><c> experience</c><00:05:36.960><c> for</c><00:05:37.560><c> more</c><00:05:37.800><c> than</c><00:05:37.919><c> a</c><00:05:38.100><c> few</c>

00:05:38.210 --> 00:05:38.220 align:start position:0%
or experience for more than a few
 

00:05:38.220 --> 00:05:41.210 align:start position:0%
or experience for more than a few
moments<00:05:39.120><c> he</c><00:05:39.660><c> read</c><00:05:39.840><c> the</c><00:05:40.080><c> same</c><00:05:40.320><c> magazines</c><00:05:40.919><c> and</c>

00:05:41.210 --> 00:05:41.220 align:start position:0%
moments he read the same magazines and
 

00:05:41.220 --> 00:05:43.610 align:start position:0%
moments he read the same magazines and
watched<00:05:41.580><c> the</c><00:05:41.699><c> same</c><00:05:41.880><c> TV</c><00:05:42.240><c> shows</c><00:05:42.720><c> over</c><00:05:43.139><c> and</c><00:05:43.380><c> over</c>

00:05:43.610 --> 00:05:43.620 align:start position:0%
watched the same TV shows over and over
 

00:05:43.620 --> 00:05:46.310 align:start position:0%
watched the same TV shows over and over
as<00:05:44.039><c> if</c><00:05:44.220><c> he</c><00:05:44.340><c> had</c><00:05:44.520><c> never</c><00:05:44.639><c> seen</c><00:05:44.940><c> them</c><00:05:45.120><c> before</c>

00:05:46.310 --> 00:05:46.320 align:start position:0%
as if he had never seen them before
 

00:05:46.320 --> 00:05:48.350 align:start position:0%
as if he had never seen them before
he<00:05:46.740><c> greeted</c><00:05:47.100><c> the</c><00:05:47.220><c> doctors</c><00:05:47.580><c> who</c><00:05:47.880><c> studied</c><00:05:48.180><c> him</c>

00:05:48.350 --> 00:05:48.360 align:start position:0%
he greeted the doctors who studied him
 

00:05:48.360 --> 00:05:50.390 align:start position:0%
he greeted the doctors who studied him
as<00:05:48.900><c> if</c><00:05:49.080><c> meeting</c><00:05:49.259><c> them</c><00:05:49.560><c> for</c><00:05:49.800><c> the</c><00:05:49.919><c> first</c><00:05:50.100><c> time</c>

00:05:50.390 --> 00:05:50.400 align:start position:0%
as if meeting them for the first time
 

00:05:50.400 --> 00:05:52.010 align:start position:0%
as if meeting them for the first time
every<00:05:51.120><c> day</c>

00:05:52.010 --> 00:05:52.020 align:start position:0%
every day
 

00:05:52.020 --> 00:05:54.050 align:start position:0%
every day
he<00:05:52.500><c> never</c><00:05:52.620><c> recognized</c><00:05:53.280><c> them</c>

00:05:54.050 --> 00:05:54.060 align:start position:0%
he never recognized them
 

00:05:54.060 --> 00:05:56.990 align:start position:0%
he never recognized them
without<00:05:54.539><c> a</c><00:05:54.900><c> hippocampus</c><00:05:55.680><c> he</c><00:05:56.340><c> could</c><00:05:56.580><c> never</c>

00:05:56.990 --> 00:05:57.000 align:start position:0%
without a hippocampus he could never
 

00:05:57.000 --> 00:05:58.909 align:start position:0%
without a hippocampus he could never
again<00:05:57.240><c> create</c><00:05:57.660><c> a</c><00:05:58.080><c> consciously</c><00:05:58.500><c> held</c>

00:05:58.909 --> 00:05:58.919 align:start position:0%
again create a consciously held
 

00:05:58.919 --> 00:06:02.180 align:start position:0%
again create a consciously held
long-term<00:05:59.820><c> memory</c>


```

# How to boost your brain and memory/How to boost your brain and memory with Lisa Genova.en.vtt

```vtt
WEBVTT
Kind: captions
Language: en

00:00:00.000 --> 00:00:03.830 align:start position:0%
 
specific

00:00:03.830 --> 00:00:03.840 align:start position:0%
 
 

00:00:03.840 --> 00:00:07.130 align:start position:0%
 
in<00:00:04.500><c> the</c><00:00:04.620><c> past</c><00:00:04.860><c> 24</c><00:00:05.339><c> hours</c><00:00:05.819><c> did</c><00:00:06.720><c> your</c><00:00:06.899><c> brain</c>

00:00:07.130 --> 00:00:07.140 align:start position:0%
in the past 24 hours did your brain
 

00:00:07.140 --> 00:00:09.350 align:start position:0%
in the past 24 hours did your brain
forget<00:00:07.379><c> anything</c><00:00:07.980><c> that</c><00:00:08.340><c> you</c><00:00:08.580><c> expected</c><00:00:09.000><c> it</c><00:00:09.179><c> to</c>

00:00:09.350 --> 00:00:09.360 align:start position:0%
forget anything that you expected it to
 

00:00:09.360 --> 00:00:10.549 align:start position:0%
forget anything that you expected it to
remember

00:00:10.549 --> 00:00:10.559 align:start position:0%
remember
 

00:00:10.559 --> 00:00:14.209 align:start position:0%
remember
a<00:00:11.219><c> word</c><00:00:11.400><c> where</c><00:00:12.120><c> you</c><00:00:12.300><c> put</c><00:00:12.480><c> your</c><00:00:12.780><c> phone</c><00:00:13.080><c> to</c><00:00:13.980><c> send</c>

00:00:14.209 --> 00:00:14.219 align:start position:0%
a word where you put your phone to send
 

00:00:14.219 --> 00:00:17.630 align:start position:0%
a word where you put your phone to send
an<00:00:14.460><c> email</c><00:00:14.900><c> an</c><00:00:15.900><c> online</c><00:00:16.139><c> password</c>

00:00:17.630 --> 00:00:17.640 align:start position:0%
an email an online password
 

00:00:17.640 --> 00:00:19.730 align:start position:0%
an email an online password
to<00:00:18.119><c> buy</c><00:00:18.300><c> toothpaste</c>

00:00:19.730 --> 00:00:19.740 align:start position:0%
to buy toothpaste
 

00:00:19.740 --> 00:00:22.670 align:start position:0%
to buy toothpaste
why<00:00:20.220><c> you</c><00:00:20.460><c> walked</c><00:00:20.699><c> into</c><00:00:20.820><c> a</c><00:00:21.180><c> room</c>

00:00:22.670 --> 00:00:22.680 align:start position:0%
why you walked into a room
 

00:00:22.680 --> 00:00:24.650 align:start position:0%
why you walked into a room
in<00:00:23.160><c> each</c><00:00:23.400><c> of</c><00:00:23.520><c> these</c><00:00:23.699><c> moments</c><00:00:24.119><c> how</c><00:00:24.300><c> did</c><00:00:24.480><c> you</c>

00:00:24.650 --> 00:00:24.660 align:start position:0%
in each of these moments how did you
 

00:00:24.660 --> 00:00:25.670 align:start position:0%
in each of these moments how did you
feel

00:00:25.670 --> 00:00:25.680 align:start position:0%
feel
 

00:00:25.680 --> 00:00:28.210 align:start position:0%
feel
worried<00:00:26.660><c> afraid</c>

00:00:28.210 --> 00:00:28.220 align:start position:0%
worried afraid
 

00:00:28.220 --> 00:00:31.910 align:start position:0%
worried afraid
embarrassed<00:00:29.480><c> ashamed</c><00:00:30.480><c> did</c><00:00:31.439><c> you</c><00:00:31.560><c> judge</c>

00:00:31.910 --> 00:00:31.920 align:start position:0%
embarrassed ashamed did you judge
 

00:00:31.920 --> 00:00:33.110 align:start position:0%
embarrassed ashamed did you judge
yourself

00:00:33.110 --> 00:00:33.120 align:start position:0%
yourself
 

00:00:33.120 --> 00:00:35.569 align:start position:0%
yourself
did<00:00:33.719><c> your</c><00:00:33.960><c> inner</c><00:00:34.320><c> voice</c><00:00:34.440><c> say</c><00:00:34.800><c> something</c><00:00:35.100><c> like</c>

00:00:35.569 --> 00:00:35.579 align:start position:0%
did your inner voice say something like
 

00:00:35.579 --> 00:00:39.290 align:start position:0%
did your inner voice say something like
ah<00:00:36.480><c> I</c><00:00:37.020><c> have</c><00:00:37.200><c> such</c><00:00:37.440><c> a</c><00:00:37.620><c> terrible</c><00:00:37.920><c> memory</c>

00:00:39.290 --> 00:00:39.300 align:start position:0%
ah I have such a terrible memory
 

00:00:39.300 --> 00:00:41.750 align:start position:0%
ah I have such a terrible memory
I'm<00:00:39.840><c> betting</c><00:00:40.140><c> many</c><00:00:40.379><c> of</c><00:00:40.620><c> you</c><00:00:40.739><c> carry</c><00:00:41.160><c> this</c><00:00:41.399><c> false</c>

00:00:41.750 --> 00:00:41.760 align:start position:0%
I'm betting many of you carry this false
 

00:00:41.760 --> 00:00:43.610 align:start position:0%
I'm betting many of you carry this false
belief<00:00:42.059><c> that</c><00:00:42.360><c> memory</c><00:00:42.780><c> is</c><00:00:42.899><c> supposed</c><00:00:43.140><c> to</c><00:00:43.379><c> be</c>

00:00:43.610 --> 00:00:43.620 align:start position:0%
belief that memory is supposed to be
 

00:00:43.620 --> 00:00:45.650 align:start position:0%
belief that memory is supposed to be
perfect<00:00:43.980><c> that</c><00:00:44.879><c> we're</c><00:00:45.059><c> supposed</c><00:00:45.239><c> to</c><00:00:45.420><c> remember</c>

00:00:45.650 --> 00:00:45.660 align:start position:0%
perfect that we're supposed to remember
 

00:00:45.660 --> 00:00:48.229 align:start position:0%
perfect that we're supposed to remember
everything<00:00:46.520><c> and</c><00:00:47.520><c> so</c><00:00:47.700><c> when</c><00:00:47.879><c> you</c><00:00:48.000><c> forget</c>

00:00:48.229 --> 00:00:48.239 align:start position:0%
everything and so when you forget
 

00:00:48.239 --> 00:00:50.750 align:start position:0%
everything and so when you forget
anything<00:00:48.960><c> you</c><00:00:49.860><c> think</c><00:00:50.039><c> it's</c><00:00:50.219><c> a</c><00:00:50.399><c> sign</c><00:00:50.579><c> of</c>

00:00:50.750 --> 00:00:50.760 align:start position:0%
anything you think it's a sign of
 

00:00:50.760 --> 00:00:53.510 align:start position:0%
anything you think it's a sign of
weakness<00:00:51.320><c> aging</c><00:00:52.320><c> or</c><00:00:52.800><c> maybe</c><00:00:52.980><c> even</c><00:00:53.280><c> the</c>

00:00:53.510 --> 00:00:53.520 align:start position:0%
weakness aging or maybe even the
 

00:00:53.520 --> 00:00:55.670 align:start position:0%
weakness aging or maybe even the
beginning<00:00:53.640><c> of</c><00:00:54.000><c> Alzheimer's</c>

00:00:55.670 --> 00:00:55.680 align:start position:0%
beginning of Alzheimer's
 

00:00:55.680 --> 00:00:58.250 align:start position:0%
beginning of Alzheimer's
you<00:00:56.219><c> think</c><00:00:56.460><c> something</c><00:00:57.239><c> must</c><00:00:57.539><c> be</c><00:00:57.719><c> wrong</c><00:00:57.960><c> with</c>

00:00:58.250 --> 00:00:58.260 align:start position:0%
you think something must be wrong with
 

00:00:58.260 --> 00:00:59.270 align:start position:0%
you think something must be wrong with
me

00:00:59.270 --> 00:00:59.280 align:start position:0%
me
 

00:00:59.280 --> 00:01:01.729 align:start position:0%
me
but<00:00:59.760><c> here's</c><00:01:00.120><c> what</c><00:01:00.239><c> I</c><00:01:00.420><c> want</c><00:01:00.539><c> you</c><00:01:00.660><c> to</c><00:01:00.840><c> know</c><00:01:01.020><c> our</c>

00:01:01.729 --> 00:01:01.739 align:start position:0%
but here's what I want you to know our
 

00:01:01.739 --> 00:01:03.830 align:start position:0%
but here's what I want you to know our
brains<00:01:02.100><c> are</c><00:01:02.280><c> not</c><00:01:02.520><c> designed</c><00:01:03.180><c> to</c><00:01:03.660><c> remember</c>

00:01:03.830 --> 00:01:03.840 align:start position:0%
brains are not designed to remember
 

00:01:03.840 --> 00:01:07.310 align:start position:0%
brains are not designed to remember
people's<00:01:04.440><c> names</c><00:01:04.739><c> to</c><00:01:05.519><c> do</c><00:01:05.700><c> something</c><00:01:05.939><c> later</c><00:01:06.420><c> or</c>

00:01:07.310 --> 00:01:07.320 align:start position:0%
people's names to do something later or
 

00:01:07.320 --> 00:01:09.950 align:start position:0%
people's names to do something later or
to<00:01:07.560><c> catalog</c><00:01:08.040><c> everything</c><00:01:08.520><c> we</c><00:01:08.880><c> encounter</c>

00:01:09.950 --> 00:01:09.960 align:start position:0%
to catalog everything we encounter
 

00:01:09.960 --> 00:01:12.289 align:start position:0%
to catalog everything we encounter
these<00:01:10.680><c> imperfections</c><00:01:11.400><c> are</c><00:01:11.700><c> simply</c><00:01:12.000><c> the</c>

00:01:12.289 --> 00:01:12.299 align:start position:0%
these imperfections are simply the
 

00:01:12.299 --> 00:01:13.789 align:start position:0%
these imperfections are simply the
factory<00:01:12.540><c> settings</c>

00:01:13.789 --> 00:01:13.799 align:start position:0%
factory settings
 

00:01:13.799 --> 00:01:15.950 align:start position:0%
factory settings
there's<00:01:14.460><c> a</c><00:01:14.760><c> reason</c><00:01:15.000><c> that</c><00:01:15.360><c> you</c><00:01:15.540><c> can</c><00:01:15.659><c> remember</c>

00:01:15.950 --> 00:01:15.960 align:start position:0%
there's a reason that you can remember
 

00:01:15.960 --> 00:01:18.609 align:start position:0%
there's a reason that you can remember
every<00:01:16.680><c> word</c><00:01:16.979><c> to</c><00:01:17.280><c> Hey</c><00:01:17.460><c> Jude</c><00:01:17.820><c> by</c><00:01:18.000><c> the</c><00:01:18.180><c> Beatles</c>

00:01:18.609 --> 00:01:18.619 align:start position:0%
every word to Hey Jude by the Beatles
 

00:01:18.619 --> 00:01:21.530 align:start position:0%
every word to Hey Jude by the Beatles
and<00:01:19.619><c> can</c><00:01:19.920><c> forget</c><00:01:20.159><c> why</c><00:01:20.640><c> you</c><00:01:20.820><c> walked</c><00:01:21.060><c> into</c><00:01:21.180><c> your</c>

00:01:21.530 --> 00:01:21.540 align:start position:0%
and can forget why you walked into your
 

00:01:21.540 --> 00:01:23.630 align:start position:0%
and can forget why you walked into your
living<00:01:21.659><c> room</c><00:01:22.040><c> or</c><00:01:23.040><c> that</c><00:01:23.159><c> you</c><00:01:23.400><c> can</c><00:01:23.460><c> still</c>

00:01:23.630 --> 00:01:23.640 align:start position:0%
living room or that you can still
 

00:01:23.640 --> 00:01:25.550 align:start position:0%
living room or that you can still
remember<00:01:23.880><c> the</c><00:01:24.299><c> Hamlet</c><00:01:24.659><c> Soliloquy</c><00:01:25.259><c> you</c>

00:01:25.550 --> 00:01:25.560 align:start position:0%
remember the Hamlet Soliloquy you
 

00:01:25.560 --> 00:01:28.429 align:start position:0%
remember the Hamlet Soliloquy you
memorized<00:01:26.100><c> in</c><00:01:26.280><c> 10th</c><00:01:26.700><c> Grade</c><00:01:26.840><c> but</c><00:01:27.840><c> forget</c><00:01:28.020><c> what</c>

00:01:28.429 --> 00:01:28.439 align:start position:0%
memorized in 10th Grade but forget what
 

00:01:28.439 --> 00:01:31.310 align:start position:0%
memorized in 10th Grade but forget what
your<00:01:28.560><c> spouse</c><00:01:28.860><c> told</c><00:01:29.159><c> you</c><00:01:29.400><c> five</c><00:01:29.820><c> minutes</c><00:01:30.119><c> ago</c>

00:01:31.310 --> 00:01:31.320 align:start position:0%
your spouse told you five minutes ago
 

00:01:31.320 --> 00:01:33.469 align:start position:0%
your spouse told you five minutes ago
I<00:01:31.740><c> want</c><00:01:31.860><c> to</c><00:01:32.040><c> help</c><00:01:32.159><c> you</c><00:01:32.340><c> develop</c><00:01:32.820><c> a</c><00:01:33.060><c> healthier</c>

00:01:33.469 --> 00:01:33.479 align:start position:0%
I want to help you develop a healthier
 

00:01:33.479 --> 00:01:35.450 align:start position:0%
I want to help you develop a healthier
relationship<00:01:34.020><c> with</c><00:01:34.380><c> your</c><00:01:34.560><c> memory</c>

00:01:35.450 --> 00:01:35.460 align:start position:0%
relationship with your memory
 

00:01:35.460 --> 00:01:37.789 align:start position:0%
relationship with your memory
I'm<00:01:35.939><c> going</c><00:01:36.119><c> to</c><00:01:36.240><c> show</c><00:01:36.479><c> you</c><00:01:36.600><c> how</c><00:01:37.200><c> our</c><00:01:37.380><c> brains</c>

00:01:37.789 --> 00:01:37.799 align:start position:0%
I'm going to show you how our brains
 

00:01:37.799 --> 00:01:39.230 align:start position:0%
I'm going to show you how our brains
remember

00:01:39.230 --> 00:01:39.240 align:start position:0%
remember
 

00:01:39.240 --> 00:01:41.450 align:start position:0%
remember
you'll<00:01:39.780><c> learn</c><00:01:40.020><c> tools</c><00:01:40.500><c> and</c><00:01:40.680><c> hacks</c><00:01:41.040><c> to</c>

00:01:41.450 --> 00:01:41.460 align:start position:0%
you'll learn tools and hacks to
 

00:01:41.460 --> 00:01:43.609 align:start position:0%
you'll learn tools and hacks to
strengthen<00:01:41.880><c> memory</c><00:01:42.299><c> creation</c><00:01:42.780><c> and</c><00:01:43.079><c> retrieval</c>

00:01:43.609 --> 00:01:43.619 align:start position:0%
strengthen memory creation and retrieval
 

00:01:43.619 --> 00:01:46.850 align:start position:0%
strengthen memory creation and retrieval
and<00:01:44.220><c> tips</c><00:01:44.520><c> to</c><00:01:44.820><c> improve</c><00:01:45.240><c> your</c><00:01:45.540><c> brain</c><00:01:45.720><c> health</c><00:01:45.960><c> at</c>

00:01:46.850 --> 00:01:46.860 align:start position:0%
and tips to improve your brain health at
 

00:01:46.860 --> 00:01:48.289 align:start position:0%
and tips to improve your brain health at
any<00:01:47.100><c> age</c>

00:01:48.289 --> 00:01:48.299 align:start position:0%
any age
 

00:01:48.299 --> 00:01:50.450 align:start position:0%
any age
and<00:01:48.840><c> I</c><00:01:49.020><c> want</c><00:01:49.140><c> to</c><00:01:49.259><c> help</c><00:01:49.439><c> you</c><00:01:49.680><c> shatter</c><00:01:50.100><c> this</c>

00:01:50.450 --> 00:01:50.460 align:start position:0%
and I want to help you shatter this
 

00:01:50.460 --> 00:01:52.069 align:start position:0%
and I want to help you shatter this
false<00:01:50.820><c> belief</c><00:01:51.119><c> that</c><00:01:51.299><c> your</c><00:01:51.540><c> brain</c><00:01:51.659><c> is</c><00:01:51.840><c> supposed</c>

00:01:52.069 --> 00:01:52.079 align:start position:0%
false belief that your brain is supposed
 

00:01:52.079 --> 00:01:53.810 align:start position:0%
false belief that your brain is supposed
to<00:01:52.259><c> remember</c><00:01:52.500><c> everything</c>

00:01:53.810 --> 00:01:53.820 align:start position:0%
to remember everything
 

00:01:53.820 --> 00:01:57.050 align:start position:0%
to remember everything
you'll<00:01:54.360><c> learn</c><00:01:54.600><c> why</c><00:01:55.079><c> we</c><00:01:55.380><c> forget</c><00:01:55.640><c> and</c><00:01:56.640><c> that</c><00:01:56.820><c> most</c>

00:01:57.050 --> 00:01:57.060 align:start position:0%
you'll learn why we forget and that most
 

00:01:57.060 --> 00:01:59.690 align:start position:0%
you'll learn why we forget and that most
of<00:01:57.240><c> what</c><00:01:57.360><c> we</c><00:01:57.540><c> forget</c><00:01:57.720><c> every</c><00:01:58.200><c> day</c><00:01:58.439><c> is</c><00:01:59.280><c> actually</c>

00:01:59.690 --> 00:01:59.700 align:start position:0%
of what we forget every day is actually
 

00:01:59.700 --> 00:02:02.330 align:start position:0%
of what we forget every day is actually
a<00:02:00.060><c> normal</c><00:02:00.240><c> part</c><00:02:00.659><c> of</c><00:02:00.960><c> Being</c><00:02:01.200><c> Human</c>

00:02:02.330 --> 00:02:02.340 align:start position:0%
a normal part of Being Human
 

00:02:02.340 --> 00:02:05.389 align:start position:0%
a normal part of Being Human
I'm<00:02:02.759><c> Lisa</c><00:02:03.119><c> Genova</c><00:02:03.720><c> welcome</c><00:02:04.560><c> to</c><00:02:04.799><c> how</c><00:02:05.040><c> to</c><00:02:05.219><c> boost</c>

00:02:05.389 --> 00:02:05.399 align:start position:0%
I'm Lisa Genova welcome to how to boost
 

00:02:05.399 --> 00:02:08.840 align:start position:0%
I'm Lisa Genova welcome to how to boost
your<00:02:05.700><c> brain</c><00:02:06.060><c> and</c><00:02:06.479><c> memory</c>


```

# How to boost your brain and memory/Make It Personal.en.vtt

```vtt
WEBVTT
Kind: captions
Language: en

00:00:06.440 --> 00:00:09.169 align:start position:0%
 
self-centeredness<00:00:07.440><c> is</c><00:00:08.340><c> not</c><00:00:08.639><c> a</c><00:00:08.880><c> positive</c>

00:00:09.169 --> 00:00:09.179 align:start position:0%
self-centeredness is not a positive
 

00:00:09.179 --> 00:00:12.410 align:start position:0%
self-centeredness is not a positive
quality<00:00:09.660><c> to</c><00:00:09.960><c> possess</c><00:00:10.700><c> except</c><00:00:11.700><c> when</c><00:00:12.000><c> it</c><00:00:12.179><c> comes</c>

00:00:12.410 --> 00:00:12.420 align:start position:0%
quality to possess except when it comes
 

00:00:12.420 --> 00:00:15.829 align:start position:0%
quality to possess except when it comes
to<00:00:12.660><c> memory</c><00:00:13.500><c> you</c><00:00:14.099><c> remember</c><00:00:14.280><c> more</c><00:00:14.940><c> when</c><00:00:15.660><c> it's</c>

00:00:15.829 --> 00:00:15.839 align:start position:0%
to memory you remember more when it's
 

00:00:15.839 --> 00:00:17.330 align:start position:0%
to memory you remember more when it's
about<00:00:16.020><c> you</c>

00:00:17.330 --> 00:00:17.340 align:start position:0%
about you
 

00:00:17.340 --> 00:00:20.630 align:start position:0%
about you
attach<00:00:18.060><c> your</c><00:00:18.480><c> personal</c><00:00:18.720><c> opinions</c><00:00:19.640><c> stories</c>

00:00:20.630 --> 00:00:20.640 align:start position:0%
attach your personal opinions stories
 

00:00:20.640 --> 00:00:23.450 align:start position:0%
attach your personal opinions stories
and<00:00:21.119><c> history</c><00:00:21.480><c> to</c><00:00:22.320><c> whatever</c><00:00:22.619><c> you're</c><00:00:23.039><c> learning</c>

00:00:23.450 --> 00:00:23.460 align:start position:0%
and history to whatever you're learning
 

00:00:23.460 --> 00:00:26.630 align:start position:0%
and history to whatever you're learning
and<00:00:24.119><c> you'll</c><00:00:24.359><c> be</c><00:00:24.539><c> more</c><00:00:24.840><c> likely</c><00:00:25.140><c> to</c><00:00:25.320><c> remember</c><00:00:25.500><c> it</c>

00:00:26.630 --> 00:00:26.640 align:start position:0%
and you'll be more likely to remember it
 

00:00:26.640 --> 00:00:29.870 align:start position:0%
and you'll be more likely to remember it
for<00:00:27.180><c> example</c><00:00:27.539><c> let's</c><00:00:28.260><c> say</c><00:00:28.439><c> I'm</c><00:00:28.680><c> at</c><00:00:28.859><c> a</c><00:00:29.039><c> party</c><00:00:29.160><c> and</c>

00:00:29.870 --> 00:00:29.880 align:start position:0%
for example let's say I'm at a party and
 

00:00:29.880 --> 00:00:31.970 align:start position:0%
for example let's say I'm at a party and
I<00:00:30.000><c> meet</c><00:00:30.180><c> a</c><00:00:30.359><c> man</c><00:00:30.480><c> who</c><00:00:30.779><c> introduces</c><00:00:31.260><c> himself</c><00:00:31.619><c> as</c>

00:00:31.970 --> 00:00:31.980 align:start position:0%
I meet a man who introduces himself as
 

00:00:31.980 --> 00:00:35.090 align:start position:0%
I meet a man who introduces himself as
Antonio<00:00:32.540><c> this</c><00:00:33.540><c> name</c><00:00:33.719><c> by</c><00:00:34.079><c> itself</c><00:00:34.440><c> is</c><00:00:34.860><c> an</c>

00:00:35.090 --> 00:00:35.100 align:start position:0%
Antonio this name by itself is an
 

00:00:35.100 --> 00:00:37.750 align:start position:0%
Antonio this name by itself is an
abstract<00:00:35.460><c> concept</c><00:00:36.559><c> one-dimensional</c>

00:00:37.750 --> 00:00:37.760 align:start position:0%
abstract concept one-dimensional
 

00:00:37.760 --> 00:00:41.750 align:start position:0%
abstract concept one-dimensional
impersonal<00:00:38.760><c> and</c><00:00:39.660><c> therefore</c><00:00:40.079><c> not</c><00:00:40.559><c> memorable</c>

00:00:41.750 --> 00:00:41.760 align:start position:0%
impersonal and therefore not memorable
 

00:00:41.760 --> 00:00:44.750 align:start position:0%
impersonal and therefore not memorable
if<00:00:42.300><c> I</c><00:00:42.540><c> do</c><00:00:42.660><c> nothing</c><00:00:42.960><c> my</c><00:00:43.800><c> brain</c><00:00:44.040><c> is</c><00:00:44.219><c> likely</c><00:00:44.579><c> to</c>

00:00:44.750 --> 00:00:44.760 align:start position:0%
if I do nothing my brain is likely to
 

00:00:44.760 --> 00:00:47.630 align:start position:0%
if I do nothing my brain is likely to
forget<00:00:44.940><c> his</c><00:00:45.360><c> name</c><00:00:45.600><c> but</c><00:00:46.440><c> if</c><00:00:46.620><c> I</c><00:00:46.860><c> can</c><00:00:47.040><c> link</c><00:00:47.280><c> his</c>

00:00:47.630 --> 00:00:47.640 align:start position:0%
forget his name but if I can link his
 

00:00:47.640 --> 00:00:50.990 align:start position:0%
forget his name but if I can link his
name<00:00:47.879><c> to</c><00:00:48.480><c> some</c><00:00:48.780><c> personal</c><00:00:49.079><c> associations</c><00:00:50.039><c> I'll</c>

00:00:50.990 --> 00:00:51.000 align:start position:0%
name to some personal associations I'll
 

00:00:51.000 --> 00:00:53.150 align:start position:0%
name to some personal associations I'll
strengthen<00:00:51.539><c> the</c><00:00:51.780><c> formation</c><00:00:52.200><c> and</c><00:00:52.620><c> retrieval</c>

00:00:53.150 --> 00:00:53.160 align:start position:0%
strengthen the formation and retrieval
 

00:00:53.160 --> 00:00:54.770 align:start position:0%
strengthen the formation and retrieval
of<00:00:53.340><c> this</c><00:00:53.520><c> memory</c>

00:00:54.770 --> 00:00:54.780 align:start position:0%
of this memory
 

00:00:54.780 --> 00:00:57.590 align:start position:0%
of this memory
one<00:00:55.320><c> of</c><00:00:55.500><c> my</c><00:00:55.739><c> favorite</c><00:00:56.120><c> neuroscientists</c><00:00:57.120><c> is</c>

00:00:57.590 --> 00:00:57.600 align:start position:0%
one of my favorite neuroscientists is
 

00:00:57.600 --> 00:01:00.110 align:start position:0%
one of my favorite neuroscientists is
Antonio<00:00:57.899><c> dimasio</c>

00:01:00.110 --> 00:01:00.120 align:start position:0%
Antonio dimasio
 

00:01:00.120 --> 00:01:02.450 align:start position:0%
Antonio dimasio
one<00:01:00.660><c> of</c><00:01:00.780><c> my</c><00:01:01.020><c> father's</c><00:01:01.440><c> favorite</c><00:01:01.680><c> movies</c><00:01:02.039><c> is</c>

00:01:02.450 --> 00:01:02.460 align:start position:0%
one of my father's favorite movies is
 

00:01:02.460 --> 00:01:06.230 align:start position:0%
one of my father's favorite movies is
Zorro<00:01:03.000><c> starring</c><00:01:03.840><c> Antonio</c><00:01:04.260><c> Banderas</c>

00:01:06.230 --> 00:01:06.240 align:start position:0%
Zorro starring Antonio Banderas
 

00:01:06.240 --> 00:01:09.170 align:start position:0%
Zorro starring Antonio Banderas
I<00:01:06.659><c> can</c><00:01:06.840><c> quickly</c><00:01:07.140><c> picture</c><00:01:07.500><c> this</c><00:01:08.040><c> guy</c><00:01:08.340><c> in</c><00:01:09.000><c> a</c>

00:01:09.170 --> 00:01:09.180 align:start position:0%
I can quickly picture this guy in a
 

00:01:09.180 --> 00:01:12.230 align:start position:0%
I can quickly picture this guy in a
black<00:01:09.420><c> hat</c><00:01:09.720><c> and</c><00:01:09.960><c> mask</c><00:01:10.280><c> reading</c><00:01:11.280><c> a</c><00:01:11.460><c> copy</c><00:01:11.820><c> of</c>

00:01:12.230 --> 00:01:12.240 align:start position:0%
black hat and mask reading a copy of
 

00:01:12.240 --> 00:01:15.649 align:start position:0%
black hat and mask reading a copy of
Descartes<00:01:12.900><c> error</c><00:01:13.799><c> I've</c><00:01:14.400><c> made</c><00:01:14.640><c> Antonio's</c><00:01:15.479><c> name</c>

00:01:15.649 --> 00:01:15.659 align:start position:0%
Descartes error I've made Antonio's name
 

00:01:15.659 --> 00:01:20.840 align:start position:0%
Descartes error I've made Antonio's name
about<00:01:15.960><c> me</c><00:01:16.560><c> and</c><00:01:17.340><c> so</c><00:01:17.580><c> now</c><00:01:17.880><c> I'll</c><00:01:18.240><c> remember</c><00:01:18.479><c> it</c>


```

# How to boost your brain and memory/Manage Stress.en.vtt

```vtt
WEBVTT
Kind: captions
Language: en

00:00:05.839 --> 00:00:09.589 align:start position:0%
 
the<00:00:06.839><c> human</c><00:00:07.020><c> stress</c><00:00:07.620><c> response</c><00:00:08.360><c> mobilizes</c><00:00:09.360><c> the</c>

00:00:09.589 --> 00:00:09.599 align:start position:0%
the human stress response mobilizes the
 

00:00:09.599 --> 00:00:11.509 align:start position:0%
the human stress response mobilizes the
brain<00:00:09.780><c> and</c><00:00:09.960><c> body</c><00:00:10.139><c> to</c><00:00:10.500><c> react</c><00:00:10.800><c> to</c><00:00:10.980><c> an</c><00:00:11.219><c> immediate</c>

00:00:11.509 --> 00:00:11.519 align:start position:0%
brain and body to react to an immediate
 

00:00:11.519 --> 00:00:14.089 align:start position:0%
brain and body to react to an immediate
threat<00:00:11.820><c> or</c><00:00:12.000><c> Challenge</c><00:00:12.300><c> and</c><00:00:13.139><c> it</c><00:00:13.320><c> isn't</c><00:00:13.620><c> bad</c><00:00:13.799><c> for</c>

00:00:14.089 --> 00:00:14.099 align:start position:0%
threat or Challenge and it isn't bad for
 

00:00:14.099 --> 00:00:16.430 align:start position:0%
threat or Challenge and it isn't bad for
you<00:00:14.219><c> you</c><00:00:15.120><c> actually</c><00:00:15.360><c> need</c><00:00:15.839><c> the</c><00:00:16.080><c> stress</c>

00:00:16.430 --> 00:00:16.440 align:start position:0%
you you actually need the stress
 

00:00:16.440 --> 00:00:19.670 align:start position:0%
you you actually need the stress
response<00:00:16.859><c> to</c><00:00:17.160><c> function</c><00:00:17.400><c> normally</c><00:00:17.880><c> every</c><00:00:18.300><c> day</c>

00:00:19.670 --> 00:00:19.680 align:start position:0%
response to function normally every day
 

00:00:19.680 --> 00:00:22.189 align:start position:0%
response to function normally every day
to<00:00:20.100><c> lead</c><00:00:20.220><c> today's</c><00:00:20.520><c> Zoom</c><00:00:21.000><c> meeting</c><00:00:21.240><c> or</c><00:00:21.779><c> hit</c><00:00:21.960><c> the</c>

00:00:22.189 --> 00:00:22.199 align:start position:0%
to lead today's Zoom meeting or hit the
 

00:00:22.199 --> 00:00:23.450 align:start position:0%
to lead today's Zoom meeting or hit the
brakes<00:00:22.439><c> when</c><00:00:22.680><c> the</c><00:00:22.859><c> car</c><00:00:22.920><c> in</c><00:00:23.160><c> front</c><00:00:23.279><c> of</c><00:00:23.400><c> you</c>

00:00:23.450 --> 00:00:23.460 align:start position:0%
brakes when the car in front of you
 

00:00:23.460 --> 00:00:25.730 align:start position:0%
brakes when the car in front of you
unexpectedly<00:00:24.300><c> stops</c>

00:00:25.730 --> 00:00:25.740 align:start position:0%
unexpectedly stops
 

00:00:25.740 --> 00:00:29.089 align:start position:0%
unexpectedly stops
but<00:00:26.340><c> chronic</c><00:00:26.880><c> psychological</c><00:00:27.720><c> stress</c><00:00:28.260><c> can</c><00:00:28.859><c> be</c>

00:00:29.089 --> 00:00:29.099 align:start position:0%
but chronic psychological stress can be
 

00:00:29.099 --> 00:00:31.150 align:start position:0%
but chronic psychological stress can be
damaging<00:00:29.580><c> to</c><00:00:29.820><c> your</c><00:00:30.119><c> brain</c><00:00:30.420><c> and</c><00:00:30.660><c> memory</c>

00:00:31.150 --> 00:00:31.160 align:start position:0%
damaging to your brain and memory
 

00:00:31.160 --> 00:00:33.950 align:start position:0%
damaging to your brain and memory
chronic<00:00:32.160><c> stress</c><00:00:32.520><c> inhibits</c><00:00:33.180><c> your</c><00:00:33.360><c> prefrontal</c>

00:00:33.950 --> 00:00:33.960 align:start position:0%
chronic stress inhibits your prefrontal
 

00:00:33.960 --> 00:00:37.250 align:start position:0%
chronic stress inhibits your prefrontal
cortex<00:00:34.520><c> impairing</c><00:00:35.520><c> your</c><00:00:35.700><c> ability</c><00:00:36.000><c> to</c><00:00:36.360><c> think</c>

00:00:37.250 --> 00:00:37.260 align:start position:0%
cortex impairing your ability to think
 

00:00:37.260 --> 00:00:40.150 align:start position:0%
cortex impairing your ability to think
under<00:00:37.980><c> acute</c><00:00:38.399><c> stress</c><00:00:38.880><c> this</c><00:00:39.540><c> is</c><00:00:39.719><c> helpful</c>

00:00:40.150 --> 00:00:40.160 align:start position:0%
under acute stress this is helpful
 

00:00:40.160 --> 00:00:43.310 align:start position:0%
under acute stress this is helpful
allowing<00:00:41.160><c> you</c><00:00:41.280><c> to</c><00:00:41.520><c> react</c><00:00:41.820><c> immediately</c><00:00:42.420><c> which</c>

00:00:43.310 --> 00:00:43.320 align:start position:0%
allowing you to react immediately which
 

00:00:43.320 --> 00:00:45.290 align:start position:0%
allowing you to react immediately which
is<00:00:43.500><c> great</c><00:00:43.739><c> if</c><00:00:44.040><c> you</c><00:00:44.160><c> have</c><00:00:44.280><c> to</c><00:00:44.399><c> run</c><00:00:44.579><c> away</c><00:00:44.820><c> from</c><00:00:45.120><c> a</c>

00:00:45.290 --> 00:00:45.300 align:start position:0%
is great if you have to run away from a
 

00:00:45.300 --> 00:00:48.529 align:start position:0%
is great if you have to run away from a
lion<00:00:45.480><c> right</c><00:00:46.079><c> this</c><00:00:46.379><c> second</c><00:00:46.700><c> but</c><00:00:47.700><c> under</c><00:00:47.940><c> chronic</c>

00:00:48.529 --> 00:00:48.539 align:start position:0%
lion right this second but under chronic
 

00:00:48.539 --> 00:00:50.450 align:start position:0%
lion right this second but under chronic
stress<00:00:48.960><c> you're</c><00:00:49.260><c> going</c><00:00:49.440><c> to</c><00:00:49.559><c> feel</c><00:00:49.739><c> cognitively</c>

00:00:50.450 --> 00:00:50.460 align:start position:0%
stress you're going to feel cognitively
 

00:00:50.460 --> 00:00:52.670 align:start position:0%
stress you're going to feel cognitively
foggy<00:00:51.059><c> you're</c><00:00:51.899><c> going</c><00:00:52.079><c> to</c><00:00:52.200><c> have</c><00:00:52.379><c> trouble</c>

00:00:52.670 --> 00:00:52.680 align:start position:0%
foggy you're going to have trouble
 

00:00:52.680 --> 00:00:55.310 align:start position:0%
foggy you're going to have trouble
creating<00:00:53.280><c> new</c><00:00:53.700><c> memories</c><00:00:54.180><c> and</c><00:00:54.780><c> retrieving</c>

00:00:55.310 --> 00:00:55.320 align:start position:0%
creating new memories and retrieving
 

00:00:55.320 --> 00:00:57.229 align:start position:0%
creating new memories and retrieving
what<00:00:55.620><c> you</c><00:00:55.800><c> already</c><00:00:55.980><c> know</c>

00:00:57.229 --> 00:00:57.239 align:start position:0%
what you already know
 

00:00:57.239 --> 00:01:00.170 align:start position:0%
what you already know
you<00:00:57.780><c> could</c><00:00:57.899><c> also</c><00:00:58.260><c> start</c><00:00:58.500><c> losing</c><00:00:59.039><c> neurons</c><00:00:59.579><c> in</c>

00:01:00.170 --> 00:01:00.180 align:start position:0%
you could also start losing neurons in
 

00:01:00.180 --> 00:01:01.869 align:start position:0%
you could also start losing neurons in
your<00:01:00.300><c> hippocampus</c>

00:01:01.869 --> 00:01:01.879 align:start position:0%
your hippocampus
 

00:01:01.879 --> 00:01:04.490 align:start position:0%
your hippocampus
neurogenesis<00:01:02.879><c> which</c><00:01:03.480><c> is</c><00:01:03.600><c> the</c><00:01:03.840><c> growth</c><00:01:04.080><c> of</c><00:01:04.260><c> new</c>

00:01:04.490 --> 00:01:04.500 align:start position:0%
neurogenesis which is the growth of new
 

00:01:04.500 --> 00:01:07.609 align:start position:0%
neurogenesis which is the growth of new
neurons<00:01:04.920><c> occurs</c><00:01:05.820><c> throughout</c><00:01:06.299><c> your</c><00:01:06.720><c> life</c><00:01:07.020><c> in</c>

00:01:07.609 --> 00:01:07.619 align:start position:0%
neurons occurs throughout your life in
 

00:01:07.619 --> 00:01:09.050 align:start position:0%
neurons occurs throughout your life in
your<00:01:07.740><c> hippocampus</c>

00:01:09.050 --> 00:01:09.060 align:start position:0%
your hippocampus
 

00:01:09.060 --> 00:01:12.350 align:start position:0%
your hippocampus
but<00:01:09.780><c> chronic</c><00:01:10.260><c> stress</c><00:01:10.799><c> inhibits</c><00:01:11.520><c> neurogenesis</c>

00:01:12.350 --> 00:01:12.360 align:start position:0%
but chronic stress inhibits neurogenesis
 

00:01:12.360 --> 00:01:15.289 align:start position:0%
but chronic stress inhibits neurogenesis
in<00:01:12.540><c> the</c><00:01:12.659><c> hippocampus</c><00:01:13.380><c> which</c><00:01:14.159><c> if</c><00:01:14.640><c> unchecked</c>

00:01:15.289 --> 00:01:15.299 align:start position:0%
in the hippocampus which if unchecked
 

00:01:15.299 --> 00:01:18.469 align:start position:0%
in the hippocampus which if unchecked
can<00:01:15.720><c> lead</c><00:01:15.900><c> to</c><00:01:16.200><c> a</c><00:01:16.560><c> smaller</c><00:01:16.860><c> hippocampus</c>

00:01:18.469 --> 00:01:18.479 align:start position:0%
can lead to a smaller hippocampus
 

00:01:18.479 --> 00:01:20.990 align:start position:0%
can lead to a smaller hippocampus
smaller<00:01:19.200><c> hippocampus</c><00:01:19.860><c> means</c><00:01:20.159><c> fewer</c><00:01:20.580><c> neurons</c>

00:01:20.990 --> 00:01:21.000 align:start position:0%
smaller hippocampus means fewer neurons
 

00:01:21.000 --> 00:01:23.749 align:start position:0%
smaller hippocampus means fewer neurons
available<00:01:21.360><c> to</c><00:01:21.720><c> do</c><00:01:21.840><c> the</c><00:01:22.080><c> job</c><00:01:22.380><c> of</c><00:01:23.040><c> creating</c><00:01:23.400><c> new</c>

00:01:23.749 --> 00:01:23.759 align:start position:0%
available to do the job of creating new
 

00:01:23.759 --> 00:01:25.070 align:start position:0%
available to do the job of creating new
memories

00:01:25.070 --> 00:01:25.080 align:start position:0%
memories
 

00:01:25.080 --> 00:01:27.289 align:start position:0%
memories
chronic<00:01:25.680><c> stress</c><00:01:26.040><c> also</c><00:01:26.520><c> seems</c><00:01:26.820><c> to</c><00:01:26.880><c> make</c><00:01:27.000><c> our</c>

00:01:27.289 --> 00:01:27.299 align:start position:0%
chronic stress also seems to make our
 

00:01:27.299 --> 00:01:29.210 align:start position:0%
chronic stress also seems to make our
brains<00:01:27.600><c> more</c><00:01:27.840><c> vulnerable</c><00:01:28.259><c> to</c><00:01:28.560><c> Alzheimer's</c>

00:01:29.210 --> 00:01:29.220 align:start position:0%
brains more vulnerable to Alzheimer's
 

00:01:29.220 --> 00:01:30.830 align:start position:0%
brains more vulnerable to Alzheimer's
disease

00:01:30.830 --> 00:01:30.840 align:start position:0%
disease
 

00:01:30.840 --> 00:01:33.950 align:start position:0%
disease
but<00:01:31.259><c> the</c><00:01:31.500><c> world</c><00:01:31.619><c> we</c><00:01:31.979><c> live</c><00:01:32.280><c> in</c><00:01:32.460><c> is</c><00:01:33.180><c> relentlessly</c>

00:01:33.950 --> 00:01:33.960 align:start position:0%
but the world we live in is relentlessly
 

00:01:33.960 --> 00:01:37.010 align:start position:0%
but the world we live in is relentlessly
stressful<00:01:34.560><c> so</c><00:01:35.520><c> what</c><00:01:35.700><c> can</c><00:01:35.820><c> we</c><00:01:36.000><c> do</c>

00:01:37.010 --> 00:01:37.020 align:start position:0%
stressful so what can we do
 

00:01:37.020 --> 00:01:39.530 align:start position:0%
stressful so what can we do
while<00:01:37.619><c> we</c><00:01:37.920><c> can't</c><00:01:38.159><c> necessarily</c><00:01:38.880><c> extricate</c>

00:01:39.530 --> 00:01:39.540 align:start position:0%
while we can't necessarily extricate
 

00:01:39.540 --> 00:01:41.210 align:start position:0%
while we can't necessarily extricate
ourselves<00:01:39.840><c> from</c><00:01:40.140><c> the</c><00:01:40.259><c> stressful</c><00:01:40.619><c> world</c><00:01:40.860><c> we</c>

00:01:41.210 --> 00:01:41.220 align:start position:0%
ourselves from the stressful world we
 

00:01:41.220 --> 00:01:43.670 align:start position:0%
ourselves from the stressful world we
live<00:01:41.400><c> in</c><00:01:41.579><c> we</c><00:01:42.420><c> can</c><00:01:42.600><c> dramatically</c><00:01:43.200><c> influence</c>

00:01:43.670 --> 00:01:43.680 align:start position:0%
live in we can dramatically influence
 

00:01:43.680 --> 00:01:46.670 align:start position:0%
live in we can dramatically influence
our<00:01:43.979><c> brain's</c><00:01:44.340><c> response</c><00:01:44.820><c> to</c><00:01:45.119><c> it</c><00:01:45.680><c> yoga</c>

00:01:46.670 --> 00:01:46.680 align:start position:0%
our brain's response to it yoga
 

00:01:46.680 --> 00:01:50.149 align:start position:0%
our brain's response to it yoga
meditation<00:01:47.659><c> breathing</c><00:01:48.659><c> exercises</c><00:01:49.439><c> and</c>

00:01:50.149 --> 00:01:50.159 align:start position:0%
meditation breathing exercises and
 

00:01:50.159 --> 00:01:52.429 align:start position:0%
meditation breathing exercises and
practices<00:01:50.579><c> in</c><00:01:50.880><c> mindfulness</c><00:01:51.420><c> have</c><00:01:52.020><c> been</c><00:01:52.200><c> shown</c>

00:01:52.429 --> 00:01:52.439 align:start position:0%
practices in mindfulness have been shown
 

00:01:52.439 --> 00:01:54.350 align:start position:0%
practices in mindfulness have been shown
to<00:01:52.680><c> protect</c><00:01:53.159><c> against</c><00:01:53.460><c> stress-induced</c>

00:01:54.350 --> 00:01:54.360 align:start position:0%
to protect against stress-induced
 

00:01:54.360 --> 00:01:56.870 align:start position:0%
to protect against stress-induced
Amnesia<00:01:54.960><c> by</c><00:01:55.500><c> reducing</c><00:01:55.979><c> chronically</c><00:01:56.460><c> elevated</c>

00:01:56.870 --> 00:01:56.880 align:start position:0%
Amnesia by reducing chronically elevated
 

00:01:56.880 --> 00:02:00.469 align:start position:0%
Amnesia by reducing chronically elevated
blood<00:01:57.299><c> pressure</c><00:01:57.799><c> inflammation</c><00:01:58.939><c> anxiety</c><00:01:59.939><c> and</c>

00:02:00.469 --> 00:02:00.479 align:start position:0%
blood pressure inflammation anxiety and
 

00:02:00.479 --> 00:02:02.630 align:start position:0%
blood pressure inflammation anxiety and
cortisol<00:02:00.960><c> levels</c>

00:02:02.630 --> 00:02:02.640 align:start position:0%
cortisol levels
 

00:02:02.640 --> 00:02:04.969 align:start position:0%
cortisol levels
meditation<00:02:03.540><c> has</c><00:02:03.960><c> also</c><00:02:04.200><c> been</c><00:02:04.380><c> shown</c><00:02:04.619><c> to</c>

00:02:04.969 --> 00:02:04.979 align:start position:0%
meditation has also been shown to
 

00:02:04.979 --> 00:02:08.270 align:start position:0%
meditation has also been shown to
enhance<00:02:05.600><c> neurogenesis</c><00:02:06.600><c> in</c><00:02:06.899><c> your</c><00:02:07.020><c> hippocampus</c>

00:02:08.270 --> 00:02:08.280 align:start position:0%
enhance neurogenesis in your hippocampus
 

00:02:08.280 --> 00:02:10.850 align:start position:0%
enhance neurogenesis in your hippocampus
if<00:02:08.880><c> chronic</c><00:02:09.300><c> stresses</c><00:02:09.780><c> the</c><00:02:10.080><c> evil</c><00:02:10.440><c> villain</c>

00:02:10.850 --> 00:02:10.860 align:start position:0%
if chronic stresses the evil villain
 

00:02:10.860 --> 00:02:13.010 align:start position:0%
if chronic stresses the evil villain
shrinking<00:02:11.459><c> your</c><00:02:11.580><c> hippocampus</c><00:02:12.300><c> then</c>

00:02:13.010 --> 00:02:13.020 align:start position:0%
shrinking your hippocampus then
 

00:02:13.020 --> 00:02:16.670 align:start position:0%
shrinking your hippocampus then
meditation<00:02:13.560><c> is</c><00:02:13.920><c> the</c><00:02:14.220><c> superhero</c><00:02:14.940><c> saving</c><00:02:15.420><c> it</c>

00:02:16.670 --> 00:02:16.680 align:start position:0%
meditation is the superhero saving it
 

00:02:16.680 --> 00:02:19.670 align:start position:0%
meditation is the superhero saving it
in<00:02:17.280><c> one</c><00:02:17.459><c> study</c><00:02:17.819><c> part</c><00:02:18.480><c> of</c><00:02:18.660><c> the</c><00:02:18.780><c> hippocampus</c><00:02:19.500><c> in</c>

00:02:19.670 --> 00:02:19.680 align:start position:0%
in one study part of the hippocampus in
 

00:02:19.680 --> 00:02:21.229 align:start position:0%
in one study part of the hippocampus in
the<00:02:19.860><c> brains</c><00:02:20.220><c> of</c><00:02:20.340><c> people</c><00:02:20.580><c> who</c><00:02:21.000><c> practice</c>

00:02:21.229 --> 00:02:21.239 align:start position:0%
the brains of people who practice
 

00:02:21.239 --> 00:02:23.570 align:start position:0%
the brains of people who practice
mindfulness<00:02:21.959><c> for</c><00:02:22.319><c> eight</c><00:02:22.560><c> weeks</c><00:02:22.920><c> with</c>

00:02:23.570 --> 00:02:23.580 align:start position:0%
mindfulness for eight weeks with
 

00:02:23.580 --> 00:02:25.970 align:start position:0%
mindfulness for eight weeks with
significantly<00:02:24.300><c> bigger</c><00:02:24.959><c> than</c><00:02:25.379><c> it</c><00:02:25.560><c> was</c><00:02:25.739><c> before</c>

00:02:25.970 --> 00:02:25.980 align:start position:0%
significantly bigger than it was before
 

00:02:25.980 --> 00:02:29.110 align:start position:0%
significantly bigger than it was before
these<00:02:26.400><c> people</c><00:02:26.520><c> began</c><00:02:27.000><c> this</c><00:02:27.300><c> daily</c><00:02:27.540><c> practice</c>

00:02:29.110 --> 00:02:29.120 align:start position:0%
these people began this daily practice
 

00:02:29.120 --> 00:02:31.670 align:start position:0%
these people began this daily practice
age-matched<00:02:30.120><c> folks</c><00:02:30.540><c> who</c><00:02:31.020><c> did</c><00:02:31.200><c> not</c><00:02:31.379><c> practice</c>

00:02:31.670 --> 00:02:31.680 align:start position:0%
age-matched folks who did not practice
 

00:02:31.680 --> 00:02:34.610 align:start position:0%
age-matched folks who did not practice
mindfulness<00:02:32.459><c> at</c><00:02:32.700><c> all</c><00:02:32.879><c> showed</c><00:02:33.840><c> no</c><00:02:34.140><c> change</c><00:02:34.379><c> in</c>

00:02:34.610 --> 00:02:34.620 align:start position:0%
mindfulness at all showed no change in
 

00:02:34.620 --> 00:02:36.710 align:start position:0%
mindfulness at all showed no change in
the<00:02:34.800><c> size</c><00:02:34.920><c> of</c><00:02:35.160><c> their</c><00:02:35.340><c> hippocampus</c>

00:02:36.710 --> 00:02:36.720 align:start position:0%
the size of their hippocampus
 

00:02:36.720 --> 00:02:39.229 align:start position:0%
the size of their hippocampus
similar<00:02:37.620><c> results</c><00:02:37.860><c> have</c><00:02:38.340><c> been</c><00:02:38.520><c> found</c><00:02:38.760><c> in</c><00:02:39.000><c> those</c>

00:02:39.229 --> 00:02:39.239 align:start position:0%
similar results have been found in those
 

00:02:39.239 --> 00:02:41.750 align:start position:0%
similar results have been found in those
who<00:02:39.540><c> regularly</c><00:02:40.140><c> exercise</c>

00:02:41.750 --> 00:02:41.760 align:start position:0%
who regularly exercise
 

00:02:41.760 --> 00:02:45.229 align:start position:0%
who regularly exercise
if<00:02:42.360><c> meditation</c><00:02:42.840><c> is</c><00:02:43.260><c> a</c><00:02:43.500><c> superhero</c><00:02:44.239><c> exercise</c>

00:02:45.229 --> 00:02:45.239 align:start position:0%
if meditation is a superhero exercise
 

00:02:45.239 --> 00:02:48.610 align:start position:0%
if meditation is a superhero exercise
also<00:02:46.200><c> deserves</c><00:02:46.680><c> a</c><00:02:46.860><c> cape</c><00:02:47.220><c> one</c><00:02:48.060><c> last</c><00:02:48.239><c> note</c>

00:02:48.610 --> 00:02:48.620 align:start position:0%
also deserves a cape one last note
 

00:02:48.620 --> 00:02:52.190 align:start position:0%
also deserves a cape one last note
social<00:02:49.620><c> isolation</c><00:02:50.340><c> is</c><00:02:50.940><c> a</c><00:02:51.120><c> known</c><00:02:51.300><c> risk</c><00:02:51.780><c> factor</c>

00:02:52.190 --> 00:02:52.200 align:start position:0%
social isolation is a known risk factor
 

00:02:52.200 --> 00:02:55.190 align:start position:0%
social isolation is a known risk factor
for<00:02:52.379><c> Alzheimer's</c><00:02:53.180><c> possibly</c><00:02:54.180><c> by</c><00:02:54.480><c> way</c><00:02:54.720><c> of</c><00:02:54.900><c> being</c>

00:02:55.190 --> 00:02:55.200 align:start position:0%
for Alzheimer's possibly by way of being
 

00:02:55.200 --> 00:02:57.949 align:start position:0%
for Alzheimer's possibly by way of being
a<00:02:55.500><c> chronic</c><00:02:55.739><c> psychological</c><00:02:56.400><c> stressor</c>

00:02:57.949 --> 00:02:57.959 align:start position:0%
a chronic psychological stressor
 

00:02:57.959 --> 00:03:00.589 align:start position:0%
a chronic psychological stressor
staying<00:02:58.620><c> socially</c><00:02:58.980><c> connected</c><00:02:59.519><c> with</c><00:03:00.239><c> family</c>

00:03:00.589 --> 00:03:00.599 align:start position:0%
staying socially connected with family
 

00:03:00.599 --> 00:03:03.650 align:start position:0%
staying socially connected with family
and<00:03:00.900><c> friends</c><00:03:01.140><c> can</c><00:03:01.860><c> alleviate</c><00:03:02.459><c> the</c><00:03:02.760><c> stress</c><00:03:03.180><c> and</c>

00:03:03.650 --> 00:03:03.660 align:start position:0%
and friends can alleviate the stress and
 

00:03:03.660 --> 00:03:07.879 align:start position:0%
and friends can alleviate the stress and
reduce<00:03:03.840><c> your</c><00:03:04.200><c> risk</c><00:03:04.500><c> of</c><00:03:04.680><c> developing</c><00:03:05.220><c> dementia</c>


```

# How to boost your brain and memory/Memory Palace.en.vtt

```vtt
WEBVTT
Kind: captions
Language: en

00:00:06.379 --> 00:00:09.530 align:start position:0%
 
as<00:00:07.379><c> humans</c><00:00:07.799><c> evolved</c><00:00:08.340><c> it</c><00:00:08.940><c> was</c><00:00:09.120><c> pretty</c>

00:00:09.530 --> 00:00:09.540 align:start position:0%
as humans evolved it was pretty
 

00:00:09.540 --> 00:00:12.169 align:start position:0%
as humans evolved it was pretty
essential<00:00:10.019><c> for</c><00:00:10.380><c> survival</c><00:00:10.860><c> to</c><00:00:11.639><c> pay</c><00:00:11.820><c> attention</c>

00:00:12.169 --> 00:00:12.179 align:start position:0%
essential for survival to pay attention
 

00:00:12.179 --> 00:00:14.509 align:start position:0%
essential for survival to pay attention
to<00:00:12.540><c> and</c><00:00:13.080><c> remember</c><00:00:13.380><c> where</c><00:00:13.920><c> the</c><00:00:14.099><c> food</c><00:00:14.219><c> was</c>

00:00:14.509 --> 00:00:14.519 align:start position:0%
to and remember where the food was
 

00:00:14.519 --> 00:00:17.689 align:start position:0%
to and remember where the food was
located<00:00:14.839><c> where</c><00:00:15.839><c> to</c><00:00:16.020><c> find</c><00:00:16.199><c> safety</c><00:00:16.800><c> and</c><00:00:17.400><c> where</c>

00:00:17.689 --> 00:00:17.699 align:start position:0%
located where to find safety and where
 

00:00:17.699 --> 00:00:20.330 align:start position:0%
located where to find safety and where
the<00:00:17.940><c> Predators</c><00:00:18.300><c> lurked</c><00:00:18.859><c> your</c><00:00:19.859><c> modern</c><00:00:20.039><c> day</c>

00:00:20.330 --> 00:00:20.340 align:start position:0%
the Predators lurked your modern day
 

00:00:20.340 --> 00:00:22.370 align:start position:0%
the Predators lurked your modern day
brain<00:00:20.760><c> has</c><00:00:21.060><c> evolved</c><00:00:21.600><c> to</c><00:00:21.779><c> be</c><00:00:21.960><c> able</c><00:00:22.140><c> to</c>

00:00:22.370 --> 00:00:22.380 align:start position:0%
brain has evolved to be able to
 

00:00:22.380 --> 00:00:25.429 align:start position:0%
brain has evolved to be able to
visualize<00:00:23.039><c> and</c><00:00:23.640><c> remember</c><00:00:24.000><c> where</c><00:00:24.960><c> things</c><00:00:25.199><c> are</c>

00:00:25.429 --> 00:00:25.439 align:start position:0%
visualize and remember where things are
 

00:00:25.439 --> 00:00:28.550 align:start position:0%
visualize and remember where things are
located<00:00:25.800><c> in</c><00:00:26.340><c> space</c><00:00:26.640><c> and</c><00:00:27.420><c> so</c><00:00:27.599><c> you</c><00:00:27.840><c> can</c><00:00:28.019><c> tap</c><00:00:28.320><c> into</c>

00:00:28.550 --> 00:00:28.560 align:start position:0%
located in space and so you can tap into
 

00:00:28.560 --> 00:00:30.950 align:start position:0%
located in space and so you can tap into
your<00:00:28.920><c> brain's</c><00:00:29.340><c> innate</c><00:00:29.760><c> affinity</c><00:00:30.240><c> for</c>

00:00:30.950 --> 00:00:30.960 align:start position:0%
your brain's innate affinity for
 

00:00:30.960 --> 00:00:32.690 align:start position:0%
your brain's innate affinity for
remembering<00:00:31.439><c> where</c><00:00:31.800><c> something</c><00:00:32.040><c> is</c><00:00:32.399><c> located</c>

00:00:32.690 --> 00:00:32.700 align:start position:0%
remembering where something is located
 

00:00:32.700 --> 00:00:35.270 align:start position:0%
remembering where something is located
to<00:00:33.660><c> enhance</c><00:00:34.079><c> your</c><00:00:34.380><c> memory</c>

00:00:35.270 --> 00:00:35.280 align:start position:0%
to enhance your memory
 

00:00:35.280 --> 00:00:38.150 align:start position:0%
to enhance your memory
for<00:00:35.940><c> example</c><00:00:36.300><c> let's</c><00:00:37.200><c> say</c><00:00:37.380><c> I</c><00:00:37.620><c> want</c><00:00:37.800><c> to</c><00:00:37.920><c> remember</c>

00:00:38.150 --> 00:00:38.160 align:start position:0%
for example let's say I want to remember
 

00:00:38.160 --> 00:00:40.729 align:start position:0%
for example let's say I want to remember
to<00:00:38.399><c> call</c><00:00:38.640><c> my</c><00:00:38.880><c> mother</c><00:00:39.059><c> and</c><00:00:39.660><c> to</c><00:00:39.840><c> buy</c><00:00:40.020><c> toothpaste</c>

00:00:40.729 --> 00:00:40.739 align:start position:0%
to call my mother and to buy toothpaste
 

00:00:40.739 --> 00:00:43.369 align:start position:0%
to call my mother and to buy toothpaste
I<00:00:41.579><c> can</c><00:00:41.760><c> use</c><00:00:42.000><c> a</c><00:00:42.239><c> technique</c><00:00:42.540><c> called</c><00:00:42.899><c> Memory</c>

00:00:43.369 --> 00:00:43.379 align:start position:0%
I can use a technique called Memory
 

00:00:43.379 --> 00:00:46.069 align:start position:0%
I can use a technique called Memory
Palace<00:00:43.980><c> and</c><00:00:44.700><c> designate</c><00:00:45.180><c> a</c><00:00:45.360><c> set</c><00:00:45.540><c> of</c><00:00:45.719><c> familiar</c>

00:00:46.069 --> 00:00:46.079 align:start position:0%
Palace and designate a set of familiar
 

00:00:46.079 --> 00:00:48.350 align:start position:0%
Palace and designate a set of familiar
locations<00:00:46.620><c> in</c><00:00:46.800><c> my</c><00:00:46.980><c> house</c><00:00:47.100><c> as</c><00:00:47.399><c> placeholders</c><00:00:48.120><c> in</c>

00:00:48.350 --> 00:00:48.360 align:start position:0%
locations in my house as placeholders in
 

00:00:48.360 --> 00:00:50.750 align:start position:0%
locations in my house as placeholders in
my<00:00:48.539><c> mind's</c><00:00:48.960><c> eye</c><00:00:49.140><c> to</c><00:00:49.800><c> put</c><00:00:49.920><c> things</c><00:00:50.160><c> I</c><00:00:50.399><c> want</c><00:00:50.579><c> to</c>

00:00:50.750 --> 00:00:50.760 align:start position:0%
my mind's eye to put things I want to
 

00:00:50.760 --> 00:00:51.830 align:start position:0%
my mind's eye to put things I want to
remember

00:00:51.830 --> 00:00:51.840 align:start position:0%
remember
 

00:00:51.840 --> 00:00:54.049 align:start position:0%
remember
let's<00:00:52.320><c> say</c><00:00:52.559><c> two</c><00:00:52.860><c> of</c><00:00:53.039><c> my</c><00:00:53.219><c> locations</c><00:00:53.700><c> are</c><00:00:53.879><c> the</c>

00:00:54.049 --> 00:00:54.059 align:start position:0%
let's say two of my locations are the
 

00:00:54.059 --> 00:00:56.569 align:start position:0%
let's say two of my locations are the
front<00:00:54.239><c> doorstep</c><00:00:54.780><c> and</c><00:00:55.260><c> my</c><00:00:55.440><c> kitchen</c><00:00:55.620><c> sink</c>

00:00:56.569 --> 00:00:56.579 align:start position:0%
front doorstep and my kitchen sink
 

00:00:56.579 --> 00:00:58.430 align:start position:0%
front doorstep and my kitchen sink
I<00:00:57.000><c> can</c><00:00:57.120><c> place</c><00:00:57.300><c> an</c><00:00:57.539><c> image</c><00:00:57.840><c> of</c><00:00:58.020><c> my</c><00:00:58.260><c> mother</c>

00:00:58.430 --> 00:00:58.440 align:start position:0%
I can place an image of my mother
 

00:00:58.440 --> 00:01:00.889 align:start position:0%
I can place an image of my mother
sitting<00:00:59.280><c> on</c><00:00:59.399><c> my</c><00:00:59.579><c> front</c><00:00:59.699><c> doorstep</c><00:01:00.300><c> she's</c>

00:01:00.889 --> 00:01:00.899 align:start position:0%
sitting on my front doorstep she's
 

00:01:00.899 --> 00:01:02.689 align:start position:0%
sitting on my front doorstep she's
holding<00:01:01.320><c> a</c><00:01:01.559><c> mustard</c><00:01:01.800><c> yellow</c><00:01:01.980><c> kitchen</c><00:01:02.340><c> wall</c>

00:01:02.689 --> 00:01:02.699 align:start position:0%
holding a mustard yellow kitchen wall
 

00:01:02.699 --> 00:01:05.390 align:start position:0%
holding a mustard yellow kitchen wall
phone<00:01:03.000><c> with</c><00:01:03.539><c> a</c><00:01:03.719><c> long</c><00:01:03.840><c> spiral</c><00:01:04.379><c> cord</c>

00:01:05.390 --> 00:01:05.400 align:start position:0%
phone with a long spiral cord
 

00:01:05.400 --> 00:01:07.550 align:start position:0%
phone with a long spiral cord
then<00:01:06.000><c> I</c><00:01:06.240><c> can</c><00:01:06.360><c> picture</c><00:01:06.540><c> Julia</c><00:01:07.080><c> Roberts</c>

00:01:07.550 --> 00:01:07.560 align:start position:0%
then I can picture Julia Roberts
 

00:01:07.560 --> 00:01:09.890 align:start position:0%
then I can picture Julia Roberts
standing<00:01:08.040><c> at</c><00:01:08.220><c> my</c><00:01:08.400><c> kitchen</c><00:01:08.520><c> sink</c><00:01:08.880><c> brushing</c><00:01:09.720><c> her</c>

00:01:09.890 --> 00:01:09.900 align:start position:0%
standing at my kitchen sink brushing her
 

00:01:09.900 --> 00:01:13.190 align:start position:0%
standing at my kitchen sink brushing her
teeth<00:01:10.159><c> again</c><00:01:11.159><c> your</c><00:01:12.000><c> brain</c><00:01:12.240><c> remembers</c><00:01:12.720><c> what</c><00:01:13.020><c> is</c>

00:01:13.190 --> 00:01:13.200 align:start position:0%
teeth again your brain remembers what is
 

00:01:13.200 --> 00:01:16.070 align:start position:0%
teeth again your brain remembers what is
Meaningful<00:01:13.820><c> emotional</c><00:01:14.820><c> surprising</c><00:01:15.600><c> and</c><00:01:15.900><c> new</c>

00:01:16.070 --> 00:01:16.080 align:start position:0%
Meaningful emotional surprising and new
 

00:01:16.080 --> 00:01:19.789 align:start position:0%
Meaningful emotional surprising and new
so<00:01:17.040><c> choose</c><00:01:17.460><c> images</c><00:01:17.760><c> that</c><00:01:18.360><c> are</c><00:01:18.540><c> personal</c><00:01:18.799><c> weird</c>

00:01:19.789 --> 00:01:19.799 align:start position:0%
so choose images that are personal weird
 

00:01:19.799 --> 00:01:22.670 align:start position:0%
so choose images that are personal weird
or<00:01:20.220><c> that</c><00:01:20.340><c> make</c><00:01:20.580><c> you</c><00:01:20.759><c> feel</c><00:01:21.119><c> something</c><00:01:21.680><c> later</c>

00:01:22.670 --> 00:01:22.680 align:start position:0%
or that make you feel something later
 

00:01:22.680 --> 00:01:24.410 align:start position:0%
or that make you feel something later
what<00:01:23.159><c> I</c><00:01:23.340><c> want</c><00:01:23.460><c> to</c><00:01:23.640><c> remember</c><00:01:23.759><c> if</c><00:01:24.240><c> there's</c>

00:01:24.410 --> 00:01:24.420 align:start position:0%
what I want to remember if there's
 

00:01:24.420 --> 00:01:26.570 align:start position:0%
what I want to remember if there's
anything<00:01:24.659><c> else</c><00:01:24.960><c> I</c><00:01:25.140><c> need</c><00:01:25.259><c> to</c><00:01:25.380><c> do</c><00:01:25.560><c> today</c><00:01:25.740><c> I</c><00:01:26.460><c> can</c>

00:01:26.570 --> 00:01:26.580 align:start position:0%
anything else I need to do today I can
 

00:01:26.580 --> 00:01:29.390 align:start position:0%
anything else I need to do today I can
check<00:01:26.759><c> my</c><00:01:27.119><c> locations</c><00:01:27.840><c> when</c><00:01:28.680><c> I</c><00:01:28.860><c> picture</c><00:01:29.040><c> my</c>

00:01:29.390 --> 00:01:29.400 align:start position:0%
check my locations when I picture my
 

00:01:29.400 --> 00:01:31.429 align:start position:0%
check my locations when I picture my
front<00:01:29.580><c> doorstep</c><00:01:30.119><c> I'll</c><00:01:30.780><c> see</c><00:01:31.020><c> my</c><00:01:31.320><c> mother</c>

00:01:31.429 --> 00:01:31.439 align:start position:0%
front doorstep I'll see my mother
 

00:01:31.439 --> 00:01:32.929 align:start position:0%
front doorstep I'll see my mother
sitting<00:01:31.920><c> there</c><00:01:32.100><c> with</c><00:01:32.280><c> the</c><00:01:32.460><c> mustard</c><00:01:32.759><c> yellow</c>

00:01:32.929 --> 00:01:32.939 align:start position:0%
sitting there with the mustard yellow
 

00:01:32.939 --> 00:01:36.109 align:start position:0%
sitting there with the mustard yellow
phone<00:01:33.439><c> Gotta</c><00:01:34.439><c> call</c><00:01:34.560><c> my</c><00:01:34.740><c> mom</c>

00:01:36.109 --> 00:01:36.119 align:start position:0%
phone Gotta call my mom
 

00:01:36.119 --> 00:01:38.630 align:start position:0%
phone Gotta call my mom
and<00:01:36.600><c> when</c><00:01:36.780><c> I</c><00:01:36.900><c> imagine</c><00:01:37.079><c> the</c><00:01:37.439><c> kitchen</c><00:01:37.619><c> sink</c><00:01:37.979><c> I'll</c>

00:01:38.630 --> 00:01:38.640 align:start position:0%
and when I imagine the kitchen sink I'll
 

00:01:38.640 --> 00:01:40.850 align:start position:0%
and when I imagine the kitchen sink I'll
see<00:01:38.820><c> Julia</c><00:01:39.240><c> Roberts</c><00:01:39.720><c> smiling</c><00:01:40.200><c> at</c><00:01:40.380><c> me</c><00:01:40.500><c> while</c>

00:01:40.850 --> 00:01:40.860 align:start position:0%
see Julia Roberts smiling at me while
 

00:01:40.860 --> 00:01:42.469 align:start position:0%
see Julia Roberts smiling at me while
she's<00:01:41.040><c> brushing</c><00:01:41.520><c> her</c><00:01:41.700><c> teeth</c><00:01:41.880><c> and</c><00:01:42.360><c> I'll</c>

00:01:42.469 --> 00:01:42.479 align:start position:0%
she's brushing her teeth and I'll
 

00:01:42.479 --> 00:01:46.340 align:start position:0%
she's brushing her teeth and I'll
remember<00:01:42.720><c> that</c><00:01:43.020><c> I</c><00:01:43.140><c> need</c><00:01:43.259><c> to</c><00:01:43.500><c> buy</c><00:01:43.619><c> toothpaste</c>


```

# How to boost your brain and memory/merged_subtitles.txt

```txt
Kind: captions
Language: en
 
stories<00:00:08.040><c> anything</c><00:00:08.700><c> we</c><00:00:09.059><c> can</c><00:00:09.240><c> visualize</c><00:00:09.840><c> and</c>
stories anything we can visualize and
 
stories anything we can visualize and
emotion<00:00:11.219><c> are</c><00:00:11.700><c> all</c><00:00:12.000><c> elements</c><00:00:12.480><c> that</c><00:00:12.719><c> can</c><00:00:12.900><c> help</c>
emotion are all elements that can help
 
emotion are all elements that can help
us<00:00:13.200><c> remember</c><00:00:13.620><c> because</c><00:00:14.400><c> we</c><00:00:14.759><c> can't</c><00:00:14.880><c> help</c><00:00:15.179><c> but</c>
us remember because we can't help but
 
us remember because we can't help but
attach<00:00:15.780><c> meaning</c><00:00:16.199><c> to</c><00:00:16.740><c> what</c><00:00:16.920><c> we</c><00:00:17.100><c> can</c><00:00:17.220><c> imagine</c>
attach meaning to what we can imagine
 
attach meaning to what we can imagine
and<00:00:17.880><c> feel</c>
and feel
 
and feel
here's<00:00:19.320><c> an</c><00:00:19.440><c> example</c>
here's an example
 
here's an example
most<00:00:21.060><c> of</c><00:00:21.180><c> us</c><00:00:21.300><c> have</c><00:00:21.539><c> trouble</c><00:00:21.840><c> remembering</c>
most of us have trouble remembering
 
most of us have trouble remembering
people's<00:00:22.859><c> names</c><00:00:23.359><c> this</c><00:00:24.359><c> is</c><00:00:24.539><c> normal</c><00:00:24.980><c> because</c><00:00:25.980><c> a</c>
people's names this is normal because a
 
people's names this is normal because a
person's<00:00:26.760><c> name</c><00:00:26.939><c> is</c><00:00:27.119><c> a</c><00:00:27.359><c> proper</c><00:00:27.660><c> noun</c><00:00:27.960><c> an</c>
person's name is a proper noun an
 
person's name is a proper noun an
abstract<00:00:29.099><c> concept</c><00:00:29.640><c> not</c><00:00:30.060><c> associated</c><00:00:30.539><c> with</c>
abstract concept not associated with
 
abstract concept not associated with
anything<00:00:31.140><c> to</c><00:00:32.040><c> our</c><00:00:32.279><c> brains</c><00:00:32.759><c> this</c><00:00:33.420><c> word</c><00:00:33.660><c> is</c>
anything to our brains this word is
 
anything to our brains this word is
essentially<00:00:34.260><c> meaningless</c><00:00:34.860><c> and</c><00:00:35.760><c> our</c><00:00:35.940><c> brains</c>
essentially meaningless and our brains
 
essentially meaningless and our brains
have<00:00:36.480><c> a</c><00:00:36.719><c> hard</c><00:00:36.899><c> time</c><00:00:37.200><c> remembering</c><00:00:37.920><c> what</c><00:00:38.460><c> is</c>
have a hard time remembering what is
 
have a hard time remembering what is
meaningless
meaningless
 
meaningless
so<00:00:40.320><c> whenever</c><00:00:40.739><c> you</c><00:00:41.100><c> can</c><00:00:41.540><c> add</c><00:00:42.540><c> meaning</c>
so whenever you can add meaning
 
so whenever you can add meaning
let's<00:00:44.280><c> say</c><00:00:44.460><c> you</c><00:00:44.700><c> meet</c><00:00:44.879><c> a</c><00:00:45.059><c> man</c><00:00:45.180><c> named</c><00:00:45.540><c> Mr</c>
let's say you meet a man named Mr
 
let's say you meet a man named Mr
Silverman<00:00:46.500><c> and</c><00:00:47.100><c> you</c><00:00:47.280><c> want</c><00:00:47.399><c> to</c><00:00:47.579><c> remember</c><00:00:47.700><c> his</c>
Silverman and you want to remember his
 
Silverman and you want to remember his
name
name
 
name
in<00:00:49.559><c> addition</c><00:00:49.800><c> to</c><00:00:50.160><c> repeating</c><00:00:50.700><c> Mr</c><00:00:50.940><c> Silverman's</c>
in addition to repeating Mr Silverman's
 
in addition to repeating Mr Silverman's
name<00:00:51.960><c> which</c><00:00:52.559><c> helps</c><00:00:52.920><c> us</c><00:00:53.039><c> remember</c><00:00:53.300><c> we</c><00:00:54.300><c> can</c><00:00:54.480><c> take</c>
name which helps us remember we can take
 
name which helps us remember we can take
this<00:00:55.079><c> proper</c><00:00:55.559><c> noun</c><00:00:55.739><c> and</c><00:00:56.460><c> attach</c><00:00:56.879><c> meaning</c><00:00:57.300><c> to</c>
this proper noun and attach meaning to
 
this proper noun and attach meaning to
it
it
 
it
for<00:00:59.039><c> example</c>
for example
 
for example
let's<00:01:00.600><c> say</c><00:01:00.780><c> you</c><00:01:01.079><c> recently</c><00:01:01.440><c> watched</c><00:01:01.920><c> the</c>
let's say you recently watched the
 
let's say you recently watched the
doubles<00:01:02.460><c> luge</c><00:01:02.879><c> competition</c><00:01:03.359><c> on</c><00:01:03.780><c> TV</c><00:01:04.280><c> you</c><00:01:05.280><c> can</c>
doubles luge competition on TV you can
 
doubles luge competition on TV you can
imagine<00:01:05.760><c> Mr</c><00:01:06.659><c> Silverman</c><00:01:07.320><c> holding</c><00:01:08.280><c> a</c><00:01:08.580><c> silver</c>
imagine Mr Silverman holding a silver
 
imagine Mr Silverman holding a silver
trophy<00:01:09.540><c> for</c><00:01:09.960><c> coming</c><00:01:10.200><c> in</c><00:01:10.560><c> second</c><00:01:10.799><c> place</c><00:01:11.159><c> in</c><00:01:11.520><c> the</c>
trophy for coming in second place in the
 
trophy for coming in second place in the
doubles<00:01:12.000><c> luge</c><00:01:12.900><c> now</c><00:01:13.680><c> you've</c><00:01:14.100><c> linked</c><00:01:14.460><c> his</c><00:01:14.640><c> name</c>
doubles luge now you've linked his name
 
doubles luge now you've linked his name
a<00:01:15.900><c> meaningless</c><00:01:16.320><c> word</c><00:01:16.740><c> to</c><00:01:17.580><c> a</c><00:01:17.760><c> network</c><00:01:17.939><c> of</c>
a meaningless word to a network of
 
a meaningless word to a network of
already<00:01:18.840><c> established</c><00:01:19.799><c> highly</c><00:01:20.520><c> accessible</c>
already established highly accessible
 
already established highly accessible
neural<00:01:21.840><c> connections</c><00:01:22.619><c> that</c><00:01:23.100><c> have</c><00:01:23.280><c> meaning</c><00:01:23.520><c> to</c>
neural connections that have meaning to
 
neural connections that have meaning to
you<00:01:24.200><c> you've</c><00:01:25.200><c> now</c><00:01:25.380><c> made</c><00:01:25.680><c> the</c><00:01:25.979><c> memory</c><00:01:26.280><c> of</c><00:01:26.460><c> his</c>
you you've now made the memory of his
 
you you've now made the memory of his
name<00:01:26.880><c> much</c><00:01:27.600><c> easier</c><00:01:28.020><c> to</c><00:01:28.259><c> activate</c><00:01:28.580><c> and</c>
name much easier to activate and
 
name much easier to activate and
therefore<00:01:29.939><c> remember</c>
therefore remember
 
therefore remember
here's<00:01:32.220><c> one</c><00:01:32.400><c> more</c><00:01:32.520><c> example</c><00:01:32.939><c> this</c><00:01:33.659><c> just</c>
here's one more example this just
 
here's one more example this just
happened<00:01:34.080><c> to</c><00:01:34.320><c> me</c><00:01:34.560><c> I</c><00:01:35.400><c> had</c><00:01:35.520><c> a</c><00:01:35.700><c> tight</c><00:01:35.880><c> connection</c>
happened to me I had a tight connection
 
happened to me I had a tight connection
at<00:01:36.540><c> O'Hare</c><00:01:36.900><c> Airport</c><00:01:37.200><c> in</c><00:01:37.560><c> Chicago</c><00:01:37.799><c> and</c><00:01:38.759><c> knew</c><00:01:39.000><c> I</c>
at O'Hare Airport in Chicago and knew I
 
at O'Hare Airport in Chicago and knew I
was<00:01:39.299><c> going</c><00:01:39.420><c> to</c><00:01:39.540><c> have</c><00:01:39.659><c> to</c><00:01:39.840><c> run</c><00:01:40.140><c> I</c><00:01:41.040><c> checked</c><00:01:41.460><c> my</c>
was going to have to run I checked my
 
was going to have to run I checked my
phone<00:01:41.820><c> and</c><00:01:42.240><c> read</c><00:01:42.420><c> that</c><00:01:42.659><c> my</c><00:01:42.960><c> connecting</c><00:01:43.320><c> gate</c>
phone and read that my connecting gate
 
phone and read that my connecting gate
was<00:01:43.860><c> K10</c>
was K10
 
was K10
I<00:01:45.780><c> wanted</c><00:01:45.960><c> to</c><00:01:46.200><c> remember</c><00:01:46.380><c> this</c><00:01:46.860><c> accurately</c><00:01:47.400><c> and</c>
I wanted to remember this accurately and
 
I wanted to remember this accurately and
without<00:01:47.939><c> needing</c><00:01:48.360><c> to</c><00:01:48.479><c> stop</c><00:01:48.659><c> to</c><00:01:48.900><c> look</c><00:01:49.020><c> at</c><00:01:49.200><c> my</c>
without needing to stop to look at my
 
without needing to stop to look at my
phone<00:01:49.500><c> again</c><00:01:49.799><c> so</c><00:01:50.520><c> I</c><00:01:50.759><c> added</c><00:01:51.119><c> meaning</c><00:01:51.420><c> to</c><00:01:52.020><c> this</c>
phone again so I added meaning to this
 
phone again so I added meaning to this
meaningless<00:01:52.860><c> gate</c><00:01:53.280><c> number</c><00:01:53.479><c> I</c><00:01:54.479><c> imagined</c><00:01:55.020><c> my</c>
meaningless gate number I imagined my
 
meaningless gate number I imagined my
dog<00:01:55.439><c> peanut</c><00:01:56.040><c> wearing</c><00:01:56.759><c> a</c><00:01:57.000><c> party</c><00:01:57.180><c> hat</c><00:01:57.479><c> with</c><00:01:58.020><c> his</c>
dog peanut wearing a party hat with his
 
dog peanut wearing a party hat with his
paw<00:01:58.560><c> carrying</c><00:01:59.100><c> an</c><00:01:59.340><c> invitation</c><00:01:59.759><c> for</c><00:02:00.060><c> peanut</c>
paw carrying an invitation for peanut
 
paw carrying an invitation for peanut
and<00:02:00.899><c> guest</c>
and guest
 
and guest
K9<00:02:02.759><c> plus</c><00:02:03.420><c> one</c><00:02:03.780><c> equals</c><00:02:04.740><c> K10</c>
K9 plus one equals K10
 
K9 plus one equals K10
the<00:02:06.780><c> image</c><00:02:07.020><c> was</c><00:02:07.320><c> silly</c><00:02:07.979><c> and</c><00:02:08.340><c> unusual</c>
the image was silly and unusual
 
the image was silly and unusual
emotional<00:02:10.080><c> because</c><00:02:10.319><c> I</c><00:02:10.619><c> love</c><00:02:10.739><c> my</c><00:02:11.039><c> dog</c><00:02:11.400><c> and</c><00:02:12.120><c> I</c>
emotional because I love my dog and I
 
emotional because I love my dog and I
could<00:02:12.420><c> picture</c><00:02:12.660><c> it</c><00:02:13.020><c> and</c><00:02:13.920><c> it</c><00:02:14.099><c> totally</c><00:02:14.400><c> worked</c><00:02:14.760><c> I</c>
could picture it and it totally worked I
 
could picture it and it totally worked I
ran<00:02:15.540><c> without</c><00:02:15.840><c> stopping</c><00:02:16.560><c> to</c><00:02:16.680><c> the</c><00:02:16.920><c> correct</c><00:02:17.220><c> gate</c>
ran without stopping to the correct gate
 
ran without stopping to the correct gate
and<00:02:18.060><c> made</c><00:02:18.300><c> my</c><00:02:18.480><c> flight</c>
Kind: captions
Language: en
 
as<00:00:06.960><c> a</c><00:00:07.140><c> rule</c><00:00:07.440><c> of</c><00:00:07.500><c> thumb</c><00:00:07.740><c> anything</c><00:00:08.580><c> that</c><00:00:08.940><c> is</c><00:00:09.059><c> good</c>
as a rule of thumb anything that is good
 
as a rule of thumb anything that is good
for<00:00:09.420><c> your</c><00:00:09.660><c> heart</c><00:00:09.780><c> is</c><00:00:10.440><c> good</c><00:00:10.679><c> for</c><00:00:10.860><c> your</c><00:00:11.099><c> brain</c>
for your heart is good for your brain
 
for your heart is good for your brain
and<00:00:11.639><c> memory</c><00:00:12.000><c> and</c><00:00:12.960><c> for</c><00:00:13.200><c> preventing</c>
and memory and for preventing
 
and memory and for preventing
Alzheimer's<00:00:14.880><c> many</c><00:00:15.599><c> Studies</c><00:00:16.020><c> have</c><00:00:16.260><c> now</c>
Alzheimer's many Studies have now
 
Alzheimer's many Studies have now
clearly<00:00:16.859><c> demonstrated</c><00:00:17.520><c> that</c><00:00:17.940><c> eating</c><00:00:18.300><c> foods</c>
clearly demonstrated that eating foods
 
clearly demonstrated that eating foods
from<00:00:18.960><c> the</c><00:00:19.140><c> Mediterranean</c><00:00:19.800><c> or</c><00:00:20.220><c> the</c><00:00:20.400><c> Mind</c><00:00:20.580><c> diet</c>
from the Mediterranean or the Mind diet
 
from the Mediterranean or the Mind diet
is<00:00:21.660><c> associated</c><00:00:22.199><c> with</c><00:00:22.619><c> a</c><00:00:22.920><c> significantly</c>
is associated with a significantly
 
is associated with a significantly
reduced<00:00:24.600><c> risk</c><00:00:25.080><c> of</c><00:00:25.560><c> developing</c><00:00:25.980><c> Alzheimer's</c>
reduced risk of developing Alzheimer's
 
reduced risk of developing Alzheimer's
disease
disease
 
disease
now<00:00:28.199><c> if</c><00:00:28.320><c> I</c><00:00:28.619><c> told</c><00:00:28.800><c> you</c><00:00:28.980><c> that</c><00:00:29.220><c> the</c><00:00:29.460><c> U.S</c><00:00:29.760><c> Food</c><00:00:29.939><c> and</c>
now if I told you that the U.S Food and
 
now if I told you that the U.S Food and
Drug<00:00:30.359><c> Administration</c><00:00:30.960><c> just</c><00:00:31.500><c> approved</c><00:00:31.980><c> a</c><00:00:32.279><c> safe</c>
Drug Administration just approved a safe
 
Drug Administration just approved a safe
medication<00:00:33.120><c> that</c><00:00:33.780><c> reduces</c><00:00:34.260><c> your</c><00:00:34.500><c> risk</c><00:00:34.739><c> of</c>
medication that reduces your risk of
 
medication that reduces your risk of
Alzheimer's
Alzheimer's
 
Alzheimer's
you'd<00:00:36.840><c> all</c><00:00:36.960><c> take</c><00:00:37.200><c> it</c>
you'd all take it
 
you'd all take it
both<00:00:38.700><c> the</c><00:00:39.000><c> Mediterranean</c><00:00:39.600><c> and</c><00:00:40.440><c> the</c><00:00:40.620><c> mine</c>
both the Mediterranean and the mine
 
both the Mediterranean and the mine
diets<00:00:41.399><c> include</c><00:00:42.120><c> green</c><00:00:42.780><c> leafy</c><00:00:43.260><c> vegetables</c>
diets include green leafy vegetables
 
diets include green leafy vegetables
brightly<00:00:44.940><c> colored</c><00:00:45.360><c> fruits</c><00:00:45.840><c> and</c><00:00:45.960><c> veggies</c>
brightly colored fruits and veggies
 
brightly colored fruits and veggies
think<00:00:47.160><c> eating</c><00:00:47.640><c> the</c><00:00:47.820><c> colors</c><00:00:48.120><c> of</c><00:00:48.239><c> the</c><00:00:48.480><c> rainbow</c>
think eating the colors of the rainbow
 
think eating the colors of the rainbow
nuts<00:00:50.460><c> beans</c><00:00:51.059><c> olive</c><00:00:51.539><c> oil</c><00:00:51.840><c> and</c><00:00:52.379><c> fish</c><00:00:52.820><c> especially</c>
nuts beans olive oil and fish especially
 
nuts beans olive oil and fish especially
fish<00:00:54.120><c> like</c><00:00:54.420><c> salmon</c><00:00:54.899><c> that</c><00:00:55.199><c> are</c><00:00:55.260><c> rich</c><00:00:55.440><c> in</c>
fish like salmon that are rich in
 
fish like salmon that are rich in
omega-3<00:00:56.160><c> fatty</c><00:00:56.699><c> acids</c><00:00:57.180><c> which</c><00:00:57.600><c> our</c><00:00:57.719><c> bodies</c>
omega-3 fatty acids which our bodies
 
omega-3 fatty acids which our bodies
don't<00:00:58.320><c> make</c><00:00:58.500><c> on</c><00:00:58.739><c> their</c><00:00:58.920><c> own</c>
don't make on their own
 
don't make on their own
this<00:01:00.600><c> diet</c><00:01:01.020><c> isn't</c><00:01:01.980><c> about</c><00:01:02.219><c> deprivation</c><00:01:03.260><c> try</c>
this diet isn't about deprivation try
 
this diet isn't about deprivation try
thinking<00:01:04.680><c> of</c><00:01:04.799><c> it</c><00:01:04.979><c> this</c><00:01:05.159><c> way</c>
thinking of it this way
 
thinking of it this way
every<00:01:06.659><c> time</c><00:01:06.900><c> you</c><00:01:07.200><c> add</c><00:01:07.439><c> these</c><00:01:07.740><c> foods</c><00:01:08.040><c> to</c><00:01:08.280><c> your</c>
every time you add these foods to your
 
every time you add these foods to your
meals<00:01:08.939><c> and</c><00:01:09.180><c> snacks</c><00:01:09.659><c> you're</c><00:01:10.380><c> supporting</c><00:01:10.860><c> the</c>
meals and snacks you're supporting the
 
meals and snacks you're supporting the
health<00:01:11.280><c> of</c><00:01:11.580><c> your</c><00:01:11.939><c> brain</c><00:01:12.240><c> and</c><00:01:13.080><c> your</c><00:01:13.320><c> ability</c><00:01:13.560><c> to</c>
health of your brain and your ability to
 
health of your brain and your ability to
remember
remember
 
remember
as<00:01:15.780><c> you</c><00:01:16.020><c> probably</c><00:01:16.260><c> already</c><00:01:16.799><c> know</c><00:01:17.479><c> exercise</c><00:01:18.479><c> is</c>
as you probably already know exercise is
 
as you probably already know exercise is
good<00:01:19.619><c> for</c><00:01:19.860><c> the</c><00:01:20.040><c> heart</c><00:01:20.240><c> and</c><00:01:21.240><c> in</c><00:01:21.600><c> addition</c><00:01:21.900><c> it</c>
good for the heart and in addition it
 
good for the heart and in addition it
might<00:01:22.920><c> be</c><00:01:23.220><c> the</c><00:01:23.520><c> most</c><00:01:23.700><c> powerfully</c><00:01:24.360><c> beneficial</c>
might be the most powerfully beneficial
 
might be the most powerfully beneficial
thing<00:01:25.320><c> we</c><00:01:25.619><c> can</c><00:01:25.799><c> do</c><00:01:26.040><c> for</c><00:01:26.640><c> the</c><00:01:26.820><c> health</c><00:01:27.000><c> of</c><00:01:27.240><c> our</c>
thing we can do for the health of our
 
thing we can do for the health of our
brains
brains
 
brains
it<00:01:29.159><c> helps</c><00:01:29.460><c> us</c><00:01:29.580><c> sleep</c><00:01:29.820><c> better</c><00:01:30.259><c> reduces</c><00:01:31.259><c> stress</c>
it helps us sleep better reduces stress
 
it helps us sleep better reduces stress
improves<00:01:33.000><c> heart</c><00:01:33.360><c> health</c><00:01:33.600><c> and</c><00:01:34.500><c> lowers</c><00:01:34.860><c> the</c>
improves heart health and lowers the
 
improves heart health and lowers the
risk<00:01:35.340><c> of</c><00:01:35.520><c> developing</c><00:01:36.000><c> Alzheimer's</c><00:01:37.220><c> aerobic</c>
risk of developing Alzheimer's aerobic
 
risk of developing Alzheimer's aerobic
exercise<00:01:38.640><c> has</c><00:01:39.479><c> been</c><00:01:39.720><c> correlated</c><00:01:40.259><c> with</c><00:01:40.619><c> less</c>
exercise has been correlated with less
 
exercise has been correlated with less
brain<00:01:41.340><c> shrinkage</c><00:01:41.880><c> and</c><00:01:42.479><c> lower</c><00:01:42.659><c> levels</c><00:01:43.140><c> of</c>
brain shrinkage and lower levels of
 
brain shrinkage and lower levels of
amyloid<00:01:44.040><c> A</c><00:01:44.820><c> protein</c><00:01:45.119><c> which</c><00:01:45.360><c> can</c><00:01:45.600><c> accumulate</c>
amyloid A protein which can accumulate
 
amyloid A protein which can accumulate
in<00:01:46.439><c> your</c><00:01:46.619><c> brain</c><00:01:46.799><c> and</c><00:01:46.979><c> cause</c><00:01:47.220><c> dementia</c>
in your brain and cause dementia
 
in your brain and cause dementia
again<00:01:49.380><c> if</c><00:01:49.740><c> I</c><00:01:49.920><c> had</c><00:01:50.040><c> a</c><00:01:50.220><c> pill</c><00:01:50.340><c> that</c><00:01:50.640><c> did</c><00:01:50.820><c> this</c>
again if I had a pill that did this
 
again if I had a pill that did this
you'd<00:01:51.960><c> all</c><00:01:52.140><c> take</c><00:01:52.380><c> it</c><00:01:52.700><c> even</c><00:01:53.700><c> a</c><00:01:54.060><c> 30</c><00:01:54.180><c> minute</c><00:01:54.479><c> brisk</c>
you'd all take it even a 30 minute brisk
 
you'd all take it even a 30 minute brisk
walk<00:01:55.259><c> five</c><00:01:56.100><c> days</c><00:01:56.340><c> a</c><00:01:56.579><c> week</c><00:01:56.759><c> may</c><00:01:57.600><c> be</c><00:01:57.720><c> enough</c><00:01:57.960><c> to</c>
walk five days a week may be enough to
 
walk five days a week may be enough to
see<00:01:58.500><c> this</c><00:01:58.740><c> benefit</c><00:01:59.060><c> if</c><00:02:00.060><c> I</c><00:02:00.299><c> haven't</c><00:02:00.420><c> convinced</c>
see this benefit if I haven't convinced
 
see this benefit if I haven't convinced
you<00:02:01.079><c> to</c><00:02:01.259><c> get</c><00:02:01.380><c> up</c><00:02:01.560><c> and</c><00:02:01.680><c> move</c><00:02:01.860><c> yet</c><00:02:02.159><c> here's</c><00:02:03.060><c> one</c>
you to get up and move yet here's one
 
you to get up and move yet here's one
more<00:02:03.479><c> shot</c><00:02:03.780><c> at</c><00:02:04.079><c> it</c><00:02:04.460><c> APO</c><00:02:05.460><c> E4</c><00:02:05.880><c> is</c><00:02:06.540><c> a</c><00:02:06.719><c> gene</c><00:02:07.079><c> variant</c>
more shot at it APO E4 is a gene variant
 
more shot at it APO E4 is a gene variant
associated<00:02:08.220><c> with</c><00:02:08.580><c> an</c><00:02:08.819><c> increased</c><00:02:09.300><c> risk</c><00:02:09.599><c> of</c>
associated with an increased risk of
 
associated with an increased risk of
Alzheimer's<00:02:10.580><c> in</c><00:02:11.580><c> one</c><00:02:11.760><c> study</c><00:02:12.120><c> older</c><00:02:12.900><c> adults</c>
Alzheimer's in one study older adults
 
Alzheimer's in one study older adults
with<00:02:13.620><c> either</c><00:02:13.860><c> one</c><00:02:14.220><c> or</c><00:02:14.400><c> two</c><00:02:14.580><c> copies</c><00:02:14.879><c> of</c><00:02:15.060><c> apoe4</c>
with either one or two copies of apoe4
 
with either one or two copies of apoe4
were<00:02:16.739><c> found</c><00:02:16.980><c> to</c><00:02:17.220><c> have</c><00:02:17.400><c> a</c><00:02:17.700><c> three</c><00:02:17.879><c> percent</c>
were found to have a three percent
 
were found to have a three percent
decrease<00:02:18.660><c> in</c><00:02:19.020><c> hippocampus</c><00:02:19.800><c> size</c><00:02:20.040><c> over</c><00:02:20.700><c> 1.5</c>
decrease in hippocampus size over 1.5
 
decrease in hippocampus size over 1.5
years
years
 
years
only<00:02:23.640><c> if</c><00:02:24.180><c> they</c><00:02:24.540><c> were</c><00:02:24.720><c> sedentary</c>
only if they were sedentary
 
only if they were sedentary
if<00:02:26.459><c> they</c><00:02:26.700><c> exercised</c><00:02:27.360><c> they</c><00:02:28.020><c> showed</c><00:02:28.379><c> no</c>
if they exercised they showed no
 
if they exercised they showed no
hippocampal<00:02:29.220><c> shrinkage</c>
hippocampal shrinkage
 
hippocampal shrinkage
so<00:02:30.780><c> if</c><00:02:31.080><c> you</c><00:02:31.319><c> have</c><00:02:31.560><c> an</c><00:02:31.800><c> increased</c><00:02:32.220><c> risk</c><00:02:32.459><c> of</c>
so if you have an increased risk of
 
so if you have an increased risk of
Alzheimer's<00:02:33.300><c> and</c><00:02:33.900><c> you</c><00:02:34.080><c> sit</c><00:02:34.379><c> all</c><00:02:34.739><c> day</c><00:02:34.920><c> the</c><00:02:35.819><c> part</c>
Alzheimer's and you sit all day the part
 
Alzheimer's and you sit all day the part
of<00:02:36.180><c> your</c><00:02:36.360><c> brain</c><00:02:36.599><c> That's</c><00:02:36.900><c> essential</c><00:02:37.560><c> for</c><00:02:37.860><c> the</c>
of your brain That's essential for the
 
of your brain That's essential for the
formation<00:02:38.580><c> of</c><00:02:39.060><c> new</c><00:02:39.300><c> consciously</c><00:02:39.840><c> held</c>
formation of new consciously held
 
formation of new consciously held
memories<00:02:40.680><c> May</c><00:02:41.640><c> shrink</c>
memories May shrink
 
memories May shrink
but<00:02:43.200><c> if</c><00:02:43.319><c> you</c><00:02:43.440><c> get</c><00:02:43.620><c> up</c><00:02:43.800><c> and</c><00:02:44.040><c> move</c><00:02:44.280><c> you</c><00:02:45.060><c> can</c>
but if you get up and move you can
 
but if you get up and move you can
potentially<00:02:45.599><c> protect</c><00:02:46.260><c> your</c><00:02:46.440><c> hippocampus</c><00:02:47.360><c> and</c>
potentially protect your hippocampus and
 
potentially protect your hippocampus and
your<00:02:48.599><c> ability</c><00:02:48.840><c> to</c><00:02:49.200><c> create</c><00:02:49.440><c> new</c><00:02:49.800><c> memories</c>
Kind: captions
Language: en
 
we<00:00:07.740><c> all</c><00:00:07.919><c> experience</c><00:00:08.460><c> walking</c><00:00:08.940><c> into</c><00:00:09.300><c> a</c><00:00:09.599><c> room</c>
we all experience walking into a room
 
we all experience walking into a room
only<00:00:10.620><c> to</c><00:00:10.980><c> scratch</c><00:00:11.340><c> our</c><00:00:11.519><c> heads</c><00:00:11.940><c> and</c>
only to scratch our heads and
 
only to scratch our heads and
dumbfounded<00:00:12.780><c> Wonder</c>
dumbfounded Wonder
 
dumbfounded Wonder
why<00:00:14.400><c> am</c><00:00:14.519><c> I</c><00:00:14.700><c> here</c>
why am I here
 
why am I here
why<00:00:16.440><c> does</c><00:00:16.619><c> this</c><00:00:16.859><c> happen</c>
why does this happen
 
why does this happen
let's<00:00:18.420><c> say</c><00:00:18.600><c> I'm</c><00:00:18.840><c> getting</c><00:00:19.080><c> ready</c><00:00:19.260><c> to</c><00:00:19.500><c> pay</c><00:00:19.680><c> bills</c>
let's say I'm getting ready to pay bills
 
let's say I'm getting ready to pay bills
in<00:00:20.279><c> my</c><00:00:20.460><c> home</c><00:00:20.640><c> office</c><00:00:20.880><c> I've</c><00:00:21.720><c> got</c><00:00:21.900><c> the</c><00:00:22.140><c> stack</c><00:00:22.439><c> of</c>
in my home office I've got the stack of
 
in my home office I've got the stack of
bills<00:00:23.039><c> my</c><00:00:23.400><c> checkbook</c><00:00:23.880><c> pen</c><00:00:24.300><c> envelopes</c><00:00:25.140><c> return</c>
bills my checkbook pen envelopes return
 
bills my checkbook pen envelopes return
address<00:00:25.800><c> labels</c><00:00:26.400><c> but</c><00:00:27.240><c> I</c><00:00:27.359><c> realize</c><00:00:27.660><c> I</c><00:00:27.840><c> don't</c>
address labels but I realize I don't
 
address labels but I realize I don't
have<00:00:28.080><c> any</c><00:00:28.260><c> stamps</c><00:00:28.800><c> I</c><00:00:29.580><c> think</c><00:00:29.699><c> I</c><00:00:29.820><c> left</c><00:00:29.939><c> them</c><00:00:30.119><c> in</c>
have any stamps I think I left them in
 
have any stamps I think I left them in
the<00:00:30.420><c> kitchen</c><00:00:30.599><c> I</c><00:00:31.439><c> walk</c><00:00:31.619><c> into</c><00:00:31.859><c> the</c><00:00:32.099><c> kitchen</c><00:00:32.279><c> and</c>
the kitchen I walk into the kitchen and
 
the kitchen I walk into the kitchen and
I<00:00:33.780><c> have</c><00:00:33.960><c> no</c><00:00:34.260><c> idea</c><00:00:34.620><c> why</c><00:00:34.860><c> I'm</c><00:00:35.040><c> in</c><00:00:35.219><c> there</c>
I have no idea why I'm in there
 
I have no idea why I'm in there
am<00:00:36.480><c> I</c><00:00:36.719><c> hungry</c><00:00:37.079><c> am</c><00:00:37.680><c> I</c><00:00:37.920><c> thirsty</c><00:00:38.660><c> no</c><00:00:39.660><c> I</c><00:00:40.320><c> go</c><00:00:40.500><c> back</c><00:00:40.680><c> to</c>
am I hungry am I thirsty no I go back to
 
am I hungry am I thirsty no I go back to
my<00:00:41.040><c> office</c><00:00:41.219><c> and</c><00:00:41.700><c> the</c><00:00:41.940><c> second</c><00:00:42.120><c> I</c><00:00:42.420><c> arrive</c><00:00:42.840><c> I</c>
my office and the second I arrive I
 
my office and the second I arrive I
remember<00:00:43.320><c> stamps</c>
remember stamps
 
remember stamps
what<00:00:46.260><c> happened</c><00:00:46.440><c> here</c><00:00:46.879><c> I</c><00:00:47.879><c> literally</c><00:00:48.180><c> had</c><00:00:48.539><c> the</c>
what happened here I literally had the
 
what happened here I literally had the
thought<00:00:48.960><c> go</c><00:00:49.559><c> get</c><00:00:49.800><c> stamps</c><00:00:50.340><c> in</c><00:00:50.399><c> the</c><00:00:50.579><c> kitchen</c>
thought go get stamps in the kitchen
 
thought go get stamps in the kitchen
only<00:00:51.180><c> seconds</c><00:00:51.660><c> before</c><00:00:52.260><c> I</c><00:00:52.620><c> physically</c><00:00:52.980><c> arrived</c>
only seconds before I physically arrived
 
only seconds before I physically arrived
there
there
 
there
how<00:00:54.899><c> did</c><00:00:55.079><c> this</c><00:00:55.260><c> thought</c><00:00:55.559><c> this</c><00:00:56.399><c> memory</c>
how did this thought this memory
 
how did this thought this memory
evaporate<00:00:58.260><c> so</c><00:00:58.680><c> quickly</c><00:00:58.980><c> from</c><00:00:59.280><c> my</c><00:00:59.520><c> mind</c>
evaporate so quickly from my mind
 
evaporate so quickly from my mind
and<00:01:00.960><c> why</c><00:01:01.199><c> did</c><00:01:01.379><c> my</c><00:01:01.620><c> memory</c><00:01:01.860><c> of</c><00:01:02.039><c> what</c><00:01:02.280><c> I</c><00:01:02.460><c> intended</c>
and why did my memory of what I intended
 
and why did my memory of what I intended
to<00:01:03.120><c> do</c><00:01:03.300><c> fail</c><00:01:03.719><c> in</c><00:01:04.019><c> the</c><00:01:04.199><c> kitchen</c><00:01:04.379><c> but</c><00:01:05.220><c> succeed</c>
to do fail in the kitchen but succeed
 
to do fail in the kitchen but succeed
moments<00:01:06.180><c> later</c><00:01:06.299><c> in</c><00:01:06.600><c> the</c><00:01:06.780><c> office</c>
moments later in the office
 
moments later in the office
the<00:01:09.600><c> biggest</c><00:01:09.780><c> reason</c><00:01:10.200><c> has</c><00:01:10.560><c> to</c><00:01:10.740><c> do</c><00:01:10.799><c> with</c>
the biggest reason has to do with
 
the biggest reason has to do with
context<00:01:11.960><c> memory</c><00:01:12.960><c> retrieval</c><00:01:13.560><c> is</c><00:01:13.979><c> easier</c>
context memory retrieval is easier
 
context memory retrieval is easier
faster<00:01:15.420><c> and</c><00:01:16.080><c> more</c><00:01:16.320><c> likely</c><00:01:16.619><c> to</c><00:01:16.920><c> be</c><00:01:17.159><c> fully</c>
faster and more likely to be fully
 
faster and more likely to be fully
summoned<00:01:18.060><c> when</c><00:01:18.659><c> the</c><00:01:18.900><c> context</c><00:01:19.320><c> of</c><00:01:19.619><c> recall</c>
summoned when the context of recall
 
summoned when the context of recall
matches<00:01:21.299><c> the</c><00:01:21.600><c> context</c><00:01:22.020><c> that</c><00:01:22.380><c> was</c><00:01:22.560><c> present</c>
matches the context that was present
 
matches the context that was present
when<00:01:23.520><c> the</c><00:01:23.700><c> memory</c><00:01:24.000><c> was</c><00:01:24.299><c> formed</c><00:01:24.780><c> in</c><00:01:25.619><c> the</c>
when the memory was formed in the
 
when the memory was formed in the
example<00:01:26.159><c> I</c><00:01:26.400><c> just</c><00:01:26.640><c> gave</c><00:01:26.939><c> the</c><00:01:27.720><c> memory</c><00:01:28.020><c> for</c><00:01:28.259><c> what</c>
example I just gave the memory for what
 
example I just gave the memory for what
I<00:01:28.740><c> wanted</c><00:01:28.979><c> when</c><00:01:29.759><c> you</c><00:01:29.880><c> get</c><00:01:30.060><c> to</c><00:01:30.180><c> the</c><00:01:30.420><c> kitchen</c>
I wanted when you get to the kitchen
 
I wanted when you get to the kitchen
find<00:01:31.259><c> stamps</c><00:01:31.979><c> was</c><00:01:32.640><c> encoded</c><00:01:33.180><c> in</c><00:01:33.360><c> my</c><00:01:33.659><c> office</c>
find stamps was encoded in my office
 
find stamps was encoded in my office
surrounded<00:01:35.100><c> by</c><00:01:35.460><c> a</c><00:01:35.700><c> specific</c><00:01:36.000><c> context</c><00:01:36.720><c> and</c>
surrounded by a specific context and
 
surrounded by a specific context and
cues<00:01:37.680><c> my</c><00:01:38.460><c> desk</c><00:01:38.820><c> the</c><00:01:39.299><c> stack</c><00:01:39.540><c> of</c><00:01:39.720><c> bills</c><00:01:40.200><c> the</c>
cues my desk the stack of bills the
 
cues my desk the stack of bills the
checkbook<00:01:40.920><c> and</c><00:01:41.159><c> envelopes</c>
checkbook and envelopes
 
checkbook and envelopes
when<00:01:42.780><c> I</c><00:01:42.960><c> arrived</c><00:01:43.259><c> in</c><00:01:43.439><c> the</c><00:01:43.560><c> kitchen</c><00:01:43.740><c> there</c><00:01:44.640><c> was</c>
when I arrived in the kitchen there was
 
when I arrived in the kitchen there was
nothing<00:01:45.119><c> to</c><00:01:45.479><c> remind</c><00:01:45.659><c> me</c><00:01:45.900><c> of</c><00:01:46.079><c> what</c><00:01:46.259><c> I</c><00:01:46.439><c> wanted</c>
nothing to remind me of what I wanted
 
nothing to remind me of what I wanted
the<00:01:47.640><c> refrigerator</c><00:01:48.180><c> the</c><00:01:48.720><c> stove</c><00:01:48.960><c> the</c><00:01:49.380><c> tea</c>
the refrigerator the stove the tea
 
the refrigerator the stove the tea
kettle<00:01:50.040><c> there</c><00:01:50.880><c> were</c><00:01:51.000><c> no</c><00:01:51.180><c> cues</c><00:01:51.659><c> in</c><00:01:51.840><c> the</c><00:01:52.020><c> kitchen</c>
kettle there were no cues in the kitchen
 
kettle there were no cues in the kitchen
other<00:01:53.040><c> than</c><00:01:53.340><c> the</c><00:01:53.520><c> stamps</c><00:01:54.000><c> which</c><00:01:54.119><c> I</c><00:01:54.360><c> didn't</c><00:01:54.479><c> see</c>
other than the stamps which I didn't see
 
other than the stamps which I didn't see
to<00:01:55.560><c> trigger</c><00:01:55.920><c> the</c><00:01:56.159><c> memory</c><00:01:56.460><c> of</c><00:01:56.640><c> what</c><00:01:56.880><c> I</c><00:01:57.000><c> needed</c>
to trigger the memory of what I needed
 
to trigger the memory of what I needed
and<00:01:58.079><c> what's</c><00:01:58.320><c> more</c><00:01:58.560><c> these</c><00:01:59.520><c> kitchen</c><00:01:59.640><c> cues</c>
and what's more these kitchen cues
 
and what's more these kitchen cues
actually<00:02:00.780><c> misdirected</c><00:02:01.680><c> the</c><00:02:01.860><c> hunt</c><00:02:02.180><c> sending</c><00:02:03.180><c> me</c>
actually misdirected the hunt sending me
 
actually misdirected the hunt sending me
down<00:02:03.659><c> neural</c><00:02:04.079><c> Pathways</c><00:02:04.619><c> in</c><00:02:04.799><c> my</c><00:02:04.979><c> brain</c>
down neural Pathways in my brain
 
down neural Pathways in my brain
associated<00:02:06.180><c> with</c><00:02:06.540><c> meals</c><00:02:07.079><c> or</c><00:02:07.560><c> a</c><00:02:07.680><c> cup</c><00:02:07.799><c> of</c><00:02:07.979><c> tea</c>
associated with meals or a cup of tea
 
associated with meals or a cup of tea
neural<00:02:09.539><c> circuits</c><00:02:10.080><c> that</c><00:02:10.259><c> would</c><00:02:10.619><c> not</c><00:02:10.920><c> lead</c><00:02:11.160><c> to</c>
neural circuits that would not lead to
 
neural circuits that would not lead to
stamps
stamps
 
stamps
the<00:02:13.379><c> context</c><00:02:13.680><c> of</c><00:02:13.920><c> the</c><00:02:14.160><c> kitchen</c><00:02:14.280><c> instead</c>
the context of the kitchen instead
 
the context of the kitchen instead
interfered<00:02:16.260><c> with</c><00:02:16.500><c> my</c><00:02:16.739><c> ability</c><00:02:17.040><c> to</c><00:02:17.340><c> remember</c>
interfered with my ability to remember
 
interfered with my ability to remember
what<00:02:17.819><c> I</c><00:02:18.000><c> went</c><00:02:18.120><c> in</c><00:02:18.300><c> there</c><00:02:18.480><c> for</c>
what I went in there for
 
what I went in there for
as<00:02:19.920><c> soon</c><00:02:20.099><c> as</c><00:02:20.220><c> I</c><00:02:20.400><c> returned</c><00:02:20.700><c> to</c><00:02:20.760><c> my</c><00:02:21.060><c> office</c><00:02:21.180><c> I</c><00:02:21.720><c> was</c>
as soon as I returned to my office I was
 
as soon as I returned to my office I was
looking<00:02:22.020><c> at</c><00:02:22.319><c> all</c><00:02:22.680><c> the</c><00:02:22.800><c> cues</c><00:02:23.160><c> that</c><00:02:23.340><c> were</c>
looking at all the cues that were
 
looking at all the cues that were
present<00:02:23.819><c> when</c><00:02:24.060><c> I</c><00:02:24.180><c> created</c><00:02:24.540><c> the</c><00:02:24.900><c> intention</c><00:02:25.260><c> and</c>
present when I created the intention and
 
present when I created the intention and
retrieval<00:02:26.760><c> was</c><00:02:27.120><c> now</c><00:02:27.420><c> effortless</c><00:02:28.260><c> and</c>
retrieval was now effortless and
 
retrieval was now effortless and
immediate
immediate
 
immediate
so<00:02:30.420><c> the</c><00:02:30.660><c> next</c><00:02:30.840><c> time</c><00:02:31.260><c> you</c><00:02:31.560><c> walk</c><00:02:31.800><c> into</c><00:02:31.980><c> a</c><00:02:32.340><c> room</c>
so the next time you walk into a room
 
so the next time you walk into a room
and<00:02:33.120><c> cannot</c><00:02:33.540><c> for</c><00:02:33.780><c> the</c><00:02:33.959><c> life</c><00:02:34.200><c> of</c><00:02:34.440><c> you</c><00:02:34.560><c> remember</c>
and cannot for the life of you remember
 
and cannot for the life of you remember
why<00:02:35.459><c> you're</c><00:02:35.640><c> in</c><00:02:35.879><c> there</c><00:02:36.060><c> don't</c><00:02:36.840><c> panic</c><00:02:37.440><c> what</c>
why you're in there don't panic what
 
why you're in there don't panic what
you're<00:02:38.640><c> experiencing</c><00:02:39.420><c> is</c><00:02:39.720><c> normal</c>
you're experiencing is normal
 
you're experiencing is normal
go<00:02:41.519><c> back</c><00:02:41.700><c> to</c><00:02:41.879><c> the</c><00:02:42.060><c> room</c><00:02:42.180><c> you</c><00:02:42.420><c> were</c><00:02:42.599><c> just</c><00:02:42.840><c> in</c>
go back to the room you were just in
 
go back to the room you were just in
either<00:02:43.680><c> physically</c><00:02:44.220><c> or</c><00:02:44.459><c> in</c><00:02:44.640><c> your</c><00:02:44.819><c> mind's</c><00:02:45.180><c> eye</c>
either physically or in your mind's eye
 
either physically or in your mind's eye
and<00:02:45.720><c> look</c><00:02:45.900><c> around</c><00:02:46.459><c> the</c><00:02:47.459><c> context</c><00:02:47.879><c> should</c>
and look around the context should
 
and look around the context should
deliver<00:02:48.599><c> the</c><00:02:48.959><c> memory</c><00:02:49.319><c> of</c><00:02:49.860><c> what</c><00:02:50.099><c> you</c><00:02:50.220><c> wanted</c>
Kind: captions
Language: en
 
there<00:00:06.779><c> is</c><00:00:07.020><c> more</c><00:00:07.259><c> to</c><00:00:07.500><c> being</c><00:00:07.680><c> smart</c><00:00:08.040><c> than</c><00:00:08.400><c> simply</c>
there is more to being smart than simply
 
there is more to being smart than simply
remembering<00:00:09.300><c> information</c><00:00:09.980><c> in</c><00:00:10.980><c> addition</c><00:00:11.219><c> to</c>
remembering information in addition to
 
remembering information in addition to
the<00:00:11.639><c> stuff</c><00:00:11.820><c> you</c><00:00:12.120><c> know</c><00:00:12.300><c> there</c><00:00:12.960><c> is</c><00:00:13.139><c> the</c><00:00:13.259><c> stuff</c>
the stuff you know there is the stuff
 
the stuff you know there is the stuff
that<00:00:13.860><c> happened</c><00:00:14.219><c> and</c><00:00:15.179><c> it's</c><00:00:15.299><c> the</c><00:00:15.540><c> integration</c>
that happened and it's the integration
 
that happened and it's the integration
of<00:00:16.560><c> the</c><00:00:16.740><c> information</c><00:00:16.920><c> you</c><00:00:17.520><c> know</c><00:00:17.760><c> with</c><00:00:18.359><c> the</c>
of the information you know with the
 
of the information you know with the
experiences<00:00:19.440><c> you've</c><00:00:19.859><c> lived</c><00:00:20.220><c> that</c><00:00:20.699><c> makes</c><00:00:20.880><c> you</c>
experiences you've lived that makes you
 
experiences you've lived that makes you
wise
wise
 
wise
now<00:00:22.980><c> we'll</c><00:00:23.460><c> focus</c><00:00:23.760><c> on</c><00:00:23.939><c> the</c><00:00:24.180><c> stuff</c><00:00:24.359><c> that</c>
now we'll focus on the stuff that
 
now we'll focus on the stuff that
happened<00:00:24.980><c> your</c><00:00:25.980><c> episodic</c><00:00:26.699><c> memory</c>
happened your episodic memory
 
happened your episodic memory
this<00:00:29.039><c> is</c><00:00:29.160><c> the</c><00:00:29.400><c> history</c><00:00:29.640><c> of</c><00:00:30.000><c> you</c><00:00:30.380><c> remembered</c><00:00:31.380><c> by</c>
this is the history of you remembered by
 
this is the history of you remembered by
you<00:00:32.180><c> these</c><00:00:33.180><c> memories</c><00:00:33.540><c> are</c><00:00:33.899><c> attached</c><00:00:34.260><c> to</c><00:00:34.440><c> a</c>
you these memories are attached to a
 
you these memories are attached to a
place<00:00:34.920><c> and</c><00:00:35.219><c> time</c><00:00:35.460><c> some</c><00:00:36.420><c> experiences</c><00:00:37.079><c> say</c><00:00:38.040><c> the</c>
place and time some experiences say the
 
place and time some experiences say the
first<00:00:38.640><c> dance</c><00:00:38.880><c> at</c><00:00:39.180><c> your</c><00:00:39.420><c> wedding</c><00:00:39.600><c> stick</c>
first dance at your wedding stick
 
first dance at your wedding stick
lasting<00:00:41.520><c> a</c><00:00:41.700><c> lifetime</c><00:00:42.320><c> whereas</c><00:00:43.320><c> others</c><00:00:43.920><c> like</c>
lasting a lifetime whereas others like
 
lasting a lifetime whereas others like
what<00:00:44.760><c> you</c><00:00:44.820><c> had</c><00:00:45.000><c> for</c><00:00:45.180><c> dinner</c><00:00:45.420><c> last</c><00:00:45.780><c> Monday</c><00:00:46.140><c> or</c>
what you had for dinner last Monday or
 
what you had for dinner last Monday or
yesterday's<00:00:47.520><c> commute</c><00:00:48.000><c> slip</c><00:00:48.960><c> away</c><00:00:49.100><c> totally</c>
yesterday's commute slip away totally
 
yesterday's commute slip away totally
unmemorable<00:00:51.360><c> can</c><00:00:51.960><c> you</c><00:00:52.140><c> recognize</c><00:00:52.620><c> what</c><00:00:53.100><c> all</c>
unmemorable can you recognize what all
 
unmemorable can you recognize what all
of<00:00:53.399><c> your</c><00:00:53.579><c> forgotten</c><00:00:54.120><c> life</c><00:00:54.360><c> experiences</c><00:00:55.020><c> have</c>
of your forgotten life experiences have
 
of your forgotten life experiences have
in<00:00:55.620><c> common</c>
in common
 
in common
they<00:00:57.360><c> are</c><00:00:57.539><c> routine</c><00:00:58.020><c> we</c><00:00:58.860><c> do</c><00:00:59.039><c> these</c><00:00:59.340><c> things</c><00:00:59.520><c> all</c>
they are routine we do these things all
 
they are routine we do these things all
the<00:01:00.239><c> time</c>
the time
 
the time
part<00:01:01.739><c> of</c><00:01:01.920><c> the</c><00:01:02.100><c> reason</c><00:01:02.280><c> I</c><00:01:02.760><c> won't</c><00:01:02.879><c> remember</c><00:01:03.180><c> the</c>
part of the reason I won't remember the
 
part of the reason I won't remember the
experience<00:01:03.960><c> of</c><00:01:04.379><c> washing</c><00:01:04.979><c> my</c><00:01:05.220><c> hair</c><00:01:05.400><c> this</c>
experience of washing my hair this
 
experience of washing my hair this
morning<00:01:05.880><c> has</c><00:01:06.600><c> to</c><00:01:06.720><c> do</c><00:01:06.840><c> with</c><00:01:07.080><c> habituation</c><00:01:07.799><c> we</c>
morning has to do with habituation we
 
morning has to do with habituation we
learn<00:01:08.880><c> to</c><00:01:09.180><c> ignore</c><00:01:09.540><c> what</c><00:01:09.840><c> is</c><00:01:10.020><c> familiar</c><00:01:10.439><c> and</c><00:01:10.860><c> of</c>
learn to ignore what is familiar and of
 
learn to ignore what is familiar and of
no<00:01:11.280><c> consequence</c>
no consequence
 
no consequence
and<00:01:13.200><c> we</c><00:01:13.380><c> can't</c><00:01:13.500><c> remember</c><00:01:13.799><c> what</c><00:01:14.280><c> we</c><00:01:14.460><c> ignore</c><00:01:14.820><c> we</c>
and we can't remember what we ignore we
 
and we can't remember what we ignore we
can<00:01:15.960><c> only</c><00:01:16.200><c> remember</c><00:01:16.560><c> what</c><00:01:17.220><c> we</c><00:01:17.340><c> pay</c><00:01:17.520><c> attention</c>
can only remember what we pay attention
 
can only remember what we pay attention
to
to
 
to
let's<00:01:19.979><c> say</c><00:01:20.220><c> every</c><00:01:20.820><c> morning</c><00:01:21.119><c> you</c><00:01:21.479><c> drink</c><00:01:21.659><c> coffee</c>
let's say every morning you drink coffee
 
let's say every morning you drink coffee
eat<00:01:22.740><c> a</c><00:01:22.920><c> sesame</c><00:01:23.220><c> bagel</c><00:01:23.640><c> with</c><00:01:23.759><c> cream</c><00:01:24.000><c> cheese</c><00:01:24.299><c> and</c>
eat a sesame bagel with cream cheese and
 
eat a sesame bagel with cream cheese and
read<00:01:25.140><c> the</c><00:01:25.320><c> newspaper</c><00:01:25.860><c> at</c><00:01:25.979><c> your</c><00:01:26.159><c> kitchen</c><00:01:26.280><c> table</c>
read the newspaper at your kitchen table
 
read the newspaper at your kitchen table
you<00:01:28.200><c> do</c><00:01:28.380><c> this</c><00:01:28.560><c> every</c><00:01:28.799><c> morning</c><00:01:29.060><c> week</c><00:01:30.060><c> after</c>
you do this every morning week after
 
you do this every morning week after
week<00:01:30.780><c> after</c><00:01:31.200><c> week</c>
week after week
 
week after week
you<00:01:32.820><c> probably</c><00:01:33.000><c> have</c><00:01:33.360><c> no</c><00:01:33.659><c> distinct</c><00:01:34.020><c> memory</c><00:01:34.380><c> of</c>
you probably have no distinct memory of
 
you probably have no distinct memory of
any<00:01:35.040><c> particular</c><00:01:35.460><c> morning</c><00:01:35.820><c> because</c><00:01:36.479><c> they're</c>
any particular morning because they're
 
any particular morning because they're
all<00:01:36.960><c> pretty</c><00:01:37.200><c> much</c><00:01:37.380><c> the</c><00:01:37.680><c> same</c>
all pretty much the same
 
all pretty much the same
now<00:01:39.540><c> let's</c><00:01:40.140><c> imagine</c><00:01:40.320><c> that</c><00:01:40.740><c> you</c><00:01:40.920><c> walk</c><00:01:41.100><c> into</c><00:01:41.280><c> the</c>
now let's imagine that you walk into the
 
now let's imagine that you walk into the
kitchen<00:01:41.640><c> this</c><00:01:42.000><c> morning</c><00:01:42.180><c> and</c><00:01:42.960><c> Elton</c><00:01:43.500><c> John</c><00:01:43.920><c> is</c>
kitchen this morning and Elton John is
 
kitchen this morning and Elton John is
cooking<00:01:44.939><c> pancakes</c><00:01:45.600><c> and</c><00:01:46.020><c> singing</c><00:01:46.439><c> cold</c><00:01:46.680><c> heart</c>
cooking pancakes and singing cold heart
 
cooking pancakes and singing cold heart
whoa<00:01:48.540><c> that</c><00:01:49.200><c> that</c><00:01:49.320><c> never</c><00:01:49.560><c> happened</c><00:01:49.860><c> before</c>
whoa that that never happened before
 
whoa that that never happened before
the<00:01:51.720><c> surprise</c><00:01:52.140><c> Factor</c><00:01:52.619><c> alone</c><00:01:52.860><c> is</c><00:01:53.460><c> enough</c><00:01:53.579><c> to</c>
the surprise Factor alone is enough to
 
the surprise Factor alone is enough to
kick<00:01:54.060><c> this</c><00:01:54.360><c> particular</c><00:01:54.720><c> morning</c><00:01:55.020><c> into</c>
kick this particular morning into
 
kick this particular morning into
memorable<00:01:55.860><c> for</c><00:01:56.220><c> life</c><00:01:56.579><c> but</c><00:01:57.360><c> you'll</c><00:01:57.720><c> also</c>
memorable for life but you'll also
 
memorable for life but you'll also
probably<00:01:58.320><c> tell</c><00:01:58.799><c> everyone</c><00:01:59.100><c> you</c><00:01:59.460><c> know</c><00:01:59.720><c> relaying</c>
probably tell everyone you know relaying
 
probably tell everyone you know relaying
the<00:02:00.840><c> story</c><00:02:01.140><c> over</c><00:02:01.560><c> and</c><00:02:01.920><c> over</c>
the story over and over
 
the story over and over
and<00:02:03.659><c> with</c><00:02:03.899><c> every</c><00:02:04.140><c> retelling</c><00:02:04.799><c> you</c><00:02:05.399><c> are</c>
and with every retelling you are
 
and with every retelling you are
reactivating<00:02:06.240><c> the</c><00:02:06.540><c> memory</c><00:02:07.160><c> reinforcing</c><00:02:08.160><c> the</c>
reactivating the memory reinforcing the
 
reactivating the memory reinforcing the
neural<00:02:08.700><c> Pathways</c><00:02:09.300><c> that</c><00:02:09.479><c> encode</c><00:02:09.840><c> the</c><00:02:10.140><c> details</c>
neural Pathways that encode the details
 
neural Pathways that encode the details
of<00:02:10.800><c> what</c><00:02:11.039><c> you</c><00:02:11.220><c> experienced</c><00:02:11.940><c> making</c><00:02:12.720><c> the</c>
of what you experienced making the
 
of what you experienced making the
memory<00:02:13.319><c> stronger</c><00:02:13.860><c> but</c><00:02:14.760><c> if</c><00:02:15.000><c> Elton</c><00:02:15.360><c> John</c>
memory stronger but if Elton John
 
memory stronger but if Elton John
continues<00:02:16.500><c> to</c><00:02:16.680><c> join</c><00:02:16.980><c> you</c><00:02:17.099><c> every</c><00:02:17.400><c> morning</c>
continues to join you every morning
 
continues to join you every morning
seeing<00:02:18.840><c> him</c><00:02:18.959><c> is</c><00:02:19.200><c> no</c><00:02:19.440><c> longer</c><00:02:19.680><c> a</c><00:02:19.920><c> big</c><00:02:20.040><c> deal</c>
seeing him is no longer a big deal
 
seeing him is no longer a big deal
you'll<00:02:21.360><c> continue</c><00:02:21.599><c> to</c><00:02:21.959><c> remember</c><00:02:22.080><c> that</c><00:02:22.560><c> first</c>
you'll continue to remember that first
 
you'll continue to remember that first
time<00:02:23.220><c> but</c><00:02:23.879><c> you</c><00:02:24.000><c> won't</c><00:02:24.180><c> remember</c><00:02:24.420><c> the</c><00:02:24.840><c> details</c>
time but you won't remember the details
 
time but you won't remember the details
of<00:02:25.379><c> the</c><00:02:25.620><c> 10th</c><00:02:25.920><c> or</c><00:02:26.160><c> the</c><00:02:26.220><c> 150th</c><00:02:27.180><c> because</c><00:02:27.599><c> you've</c>
of the 10th or the 150th because you've
 
of the 10th or the 150th because you've
habituated<00:02:28.680><c> to</c><00:02:28.920><c> this</c><00:02:29.160><c> occurrence</c>
habituated to this occurrence
 
habituated to this occurrence
it<00:02:31.020><c> has</c><00:02:31.140><c> become</c><00:02:31.440><c> morning</c><00:02:31.739><c> coffee</c><00:02:32.099><c> and</c><00:02:32.459><c> a</c><00:02:32.580><c> bagel</c>
it has become morning coffee and a bagel
 
it has become morning coffee and a bagel
the<00:02:33.599><c> usual</c><00:02:33.959><c> no</c><00:02:34.800><c> big</c><00:02:34.920><c> deal</c><00:02:35.580><c> and</c><00:02:36.180><c> no</c><00:02:36.420><c> big</c><00:02:36.599><c> deal</c><00:02:36.840><c> is</c>
the usual no big deal and no big deal is
 
the usual no big deal and no big deal is
readily<00:02:37.920><c> forgotten</c><00:02:38.819><c> but</c><00:02:39.300><c> your</c><00:02:39.540><c> episodic</c>
readily forgotten but your episodic
 
readily forgotten but your episodic
memories<00:02:40.500><c> that</c><00:02:41.040><c> are</c><00:02:41.220><c> memorable</c><00:02:41.959><c> are</c><00:02:42.959><c> often</c>
memories that are memorable are often
 
memories that are memorable are often
incomplete<00:02:44.220><c> why</c>
incomplete why
 
incomplete why
to<00:02:46.680><c> begin</c><00:02:46.800><c> with</c><00:02:47.160><c> since</c><00:02:47.760><c> we</c><00:02:48.060><c> can't</c><00:02:48.239><c> notice</c>
to begin with since we can't notice
 
to begin with since we can't notice
everything<00:02:49.140><c> we</c><00:02:49.980><c> can</c><00:02:50.220><c> only</c><00:02:50.459><c> remember</c><00:02:50.819><c> certain</c>
everything we can only remember certain
 
everything we can only remember certain
slices<00:02:51.959><c> of</c><00:02:52.319><c> what</c><00:02:52.560><c> happened</c>
slices of what happened
 
slices of what happened
these<00:02:54.180><c> slices</c><00:02:54.420><c> will</c><00:02:54.780><c> contain</c><00:02:55.140><c> only</c><00:02:55.680><c> the</c>
these slices will contain only the
 
these slices will contain only the
details<00:02:56.459><c> that</c><00:02:56.760><c> captured</c><00:02:57.180><c> our</c><00:02:57.420><c> individual</c>
details that captured our individual
 
details that captured our individual
interests<00:02:59.040><c> in</c><00:02:59.580><c> my</c><00:02:59.760><c> breakfast</c><00:03:00.000><c> example</c><00:03:00.720><c> I</c>
interests in my breakfast example I
 
interests in my breakfast example I
might<00:03:01.739><c> remember</c><00:03:01.920><c> that</c><00:03:02.220><c> Elton</c><00:03:02.580><c> John</c><00:03:02.760><c> wore</c><00:03:03.239><c> a</c>
might remember that Elton John wore a
 
might remember that Elton John wore a
green<00:03:03.599><c> apron</c><00:03:04.140><c> but</c><00:03:04.860><c> my</c><00:03:05.220><c> son</c><00:03:05.400><c> might</c><00:03:05.700><c> have</c><00:03:05.940><c> no</c>
green apron but my son might have no
 
green apron but my son might have no
recollection<00:03:06.660><c> of</c><00:03:06.959><c> any</c><00:03:07.140><c> apron</c><00:03:07.760><c> instead</c><00:03:08.760><c> my</c><00:03:09.180><c> son</c>
recollection of any apron instead my son
 
recollection of any apron instead my son
might<00:03:09.599><c> remember</c><00:03:09.780><c> that</c><00:03:10.080><c> Elton</c><00:03:10.440><c> John</c><00:03:10.620><c> made</c>
might remember that Elton John made
 
might remember that Elton John made
chocolate<00:03:11.220><c> chip</c><00:03:11.580><c> pancakes</c><00:03:12.120><c> because</c><00:03:12.659><c> those</c>
chocolate chip pancakes because those
 
chocolate chip pancakes because those
are<00:03:13.260><c> his</c><00:03:13.440><c> favorite</c><00:03:13.680><c> while</c><00:03:14.640><c> I</c><00:03:14.940><c> might</c><00:03:15.120><c> have</c><00:03:15.300><c> no</c>
are his favorite while I might have no
 
are his favorite while I might have no
memory<00:03:15.900><c> of</c><00:03:16.080><c> what</c><00:03:16.260><c> kind</c><00:03:16.379><c> of</c><00:03:16.500><c> Pancakes</c><00:03:16.860><c> he</c><00:03:17.099><c> made</c>
memory of what kind of Pancakes he made
 
memory of what kind of Pancakes he made
because<00:03:17.580><c> I</c><00:03:17.760><c> never</c><00:03:17.940><c> ate</c><00:03:18.239><c> them</c><00:03:18.440><c> similarly</c><00:03:19.440><c> what</c>
because I never ate them similarly what
 
because I never ate them similarly what
a<00:03:20.159><c> Democrat</c><00:03:20.519><c> remembers</c><00:03:21.060><c> of</c><00:03:21.239><c> January</c><00:03:21.780><c> 6</c><00:03:22.220><c> 2021</c>
a Democrat remembers of January 6 2021
 
a Democrat remembers of January 6 2021
will<00:03:24.000><c> be</c><00:03:24.239><c> different</c><00:03:24.540><c> from</c><00:03:25.019><c> what</c><00:03:25.260><c> a</c><00:03:25.379><c> trump</c>
will be different from what a trump
 
will be different from what a trump
supporter<00:03:26.099><c> remembers</c><00:03:26.640><c> and</c><00:03:27.480><c> neither</c><00:03:27.780><c> the</c>
supporter remembers and neither the
 
supporter remembers and neither the
memory<00:03:28.260><c> of</c><00:03:28.500><c> the</c><00:03:28.680><c> Democrat</c><00:03:29.099><c> nor</c><00:03:29.580><c> the</c><00:03:29.819><c> Trump</c>
memory of the Democrat nor the Trump
 
memory of the Democrat nor the Trump
supporter<00:03:30.540><c> will</c><00:03:30.959><c> contain</c><00:03:31.379><c> the</c><00:03:31.680><c> full</c><00:03:31.860><c> picture</c>
supporter will contain the full picture
 
supporter will contain the full picture
the<00:03:33.180><c> whole</c><00:03:33.300><c> truth</c><00:03:33.659><c> so</c><00:03:33.900><c> to</c><00:03:34.080><c> speak</c>
the whole truth so to speak
 
the whole truth so to speak
so<00:03:35.580><c> from</c><00:03:35.879><c> the</c><00:03:36.060><c> get-go</c><00:03:36.540><c> our</c><00:03:37.140><c> episodic</c><00:03:37.739><c> memories</c>
so from the get-go our episodic memories
 
so from the get-go our episodic memories
are<00:03:38.519><c> incomplete</c>
are incomplete
 
are incomplete
well<00:03:40.680><c> you</c><00:03:40.920><c> might</c><00:03:41.099><c> then</c><00:03:41.340><c> think</c><00:03:41.580><c> that</c><00:03:41.819><c> whatever</c>
well you might then think that whatever
 
well you might then think that whatever
details<00:03:42.780><c> you</c><00:03:43.019><c> noticed</c><00:03:43.500><c> and</c><00:03:43.739><c> captured</c><00:03:44.159><c> into</c><00:03:44.340><c> a</c>
details you noticed and captured into a
 
details you noticed and captured into a
memory<00:03:44.879><c> would</c><00:03:45.360><c> at</c><00:03:45.540><c> least</c><00:03:45.659><c> be</c><00:03:45.959><c> accurate</c>
memory would at least be accurate
 
memory would at least be accurate
not<00:03:47.819><c> at</c><00:03:48.000><c> all</c>
not at all
 
not at all
when<00:03:49.200><c> we</c><00:03:49.440><c> retrieve</c><00:03:49.980><c> a</c><00:03:50.159><c> memory</c><00:03:50.459><c> of</c><00:03:50.640><c> something</c>
when we retrieve a memory of something
 
when we retrieve a memory of something
that<00:03:51.239><c> happened</c><00:03:51.480><c> we</c><00:03:52.200><c> aren't</c><00:03:52.379><c> playing</c><00:03:52.799><c> a</c>
that happened we aren't playing a
 
that happened we aren't playing a
videotape<00:03:53.640><c> we're</c><00:03:54.560><c> reconstructing</c><00:03:55.560><c> the</c><00:03:55.920><c> story</c>
videotape we're reconstructing the story
 
videotape we're reconstructing the story
we<00:03:57.420><c> omit</c><00:03:57.840><c> bits</c><00:03:58.319><c> reinterpret</c><00:03:59.040><c> parts</c><00:03:59.400><c> and</c>
we omit bits reinterpret parts and
 
we omit bits reinterpret parts and
distort<00:04:00.239><c> others</c><00:04:00.720><c> in</c><00:04:00.900><c> light</c><00:04:01.080><c> of</c><00:04:01.260><c> new</c>
distort others in light of new
 
distort others in light of new
information<00:04:02.060><c> context</c><00:04:03.060><c> and</c><00:04:03.360><c> perspective</c><00:04:03.780><c> that</c>
information context and perspective that
 
information context and perspective that
are<00:04:04.200><c> available</c><00:04:04.379><c> now</c><00:04:05.099><c> but</c><00:04:05.819><c> weren't</c><00:04:06.060><c> available</c>
are available now but weren't available
 
are available now but weren't available
back<00:04:06.959><c> then</c>
back then
 
back then
we<00:04:08.760><c> frequently</c><00:04:09.239><c> invent</c><00:04:09.720><c> new</c><00:04:10.019><c> information</c>
we frequently invent new information
 
we frequently invent new information
often<00:04:11.760><c> inaccurate</c><00:04:12.480><c> to</c><00:04:13.080><c> fill</c><00:04:13.260><c> in</c><00:04:13.439><c> gaps</c><00:04:13.860><c> in</c><00:04:13.980><c> our</c>
often inaccurate to fill in gaps in our
 
often inaccurate to fill in gaps in our
memories<00:04:14.519><c> so</c><00:04:15.120><c> that</c><00:04:15.299><c> the</c><00:04:15.480><c> narrative</c><00:04:15.780><c> feels</c>
memories so that the narrative feels
 
memories so that the narrative feels
more<00:04:16.440><c> complete</c><00:04:16.919><c> or</c><00:04:17.160><c> pleasing</c>
more complete or pleasing
 
more complete or pleasing
what<00:04:18.900><c> we</c><00:04:19.079><c> remember</c><00:04:19.320><c> about</c><00:04:19.680><c> the</c><00:04:20.100><c> past</c><00:04:20.340><c> is</c><00:04:20.940><c> also</c>
what we remember about the past is also
 
what we remember about the past is also
influenced<00:04:21.780><c> by</c><00:04:21.959><c> how</c><00:04:22.199><c> we</c><00:04:22.380><c> feel</c><00:04:22.620><c> in</c><00:04:22.860><c> the</c><00:04:23.040><c> present</c>
influenced by how we feel in the present
 
influenced by how we feel in the present
our<00:04:24.479><c> opinions</c><00:04:25.020><c> and</c><00:04:25.320><c> emotional</c><00:04:25.740><c> state</c><00:04:25.919><c> today</c>
our opinions and emotional state today
 
our opinions and emotional state today
color<00:04:27.060><c> what</c><00:04:27.419><c> we</c><00:04:27.540><c> remember</c><00:04:27.780><c> from</c><00:04:28.139><c> what</c>
color what we remember from what
 
color what we remember from what
happened<00:04:28.560><c> yesterday</c>
happened yesterday
 
happened yesterday
so<00:04:30.840><c> in</c><00:04:31.500><c> revisiting</c><00:04:32.160><c> episodic</c><00:04:32.759><c> memories</c><00:04:33.120><c> we</c>
so in revisiting episodic memories we
 
so in revisiting episodic memories we
often<00:04:34.199><c> reshape</c><00:04:34.680><c> them</c>
often reshape them
 
often reshape them
and<00:04:36.540><c> then</c><00:04:36.720><c> something</c><00:04:37.020><c> even</c><00:04:37.380><c> more</c><00:04:37.800><c> interesting</c>
and then something even more interesting
 
and then something even more interesting
happens<00:04:38.600><c> we</c><00:04:39.600><c> link</c><00:04:39.780><c> together</c><00:04:40.080><c> and</c><00:04:40.620><c> restore</c>
happens we link together and restore
 
happens we link together and restore
this<00:04:41.940><c> changed</c><00:04:42.479><c> 2.0</c><00:04:43.199><c> version</c><00:04:43.560><c> of</c><00:04:43.800><c> the</c><00:04:43.979><c> memory</c>
this changed 2.0 version of the memory
 
this changed 2.0 version of the memory
and<00:04:45.000><c> not</c><00:04:45.240><c> the</c><00:04:45.540><c> original</c><00:04:45.740><c> it's</c><00:04:46.740><c> like</c><00:04:46.979><c> hitting</c>
and not the original it's like hitting
 
and not the original it's like hitting
save<00:04:47.639><c> in</c><00:04:47.940><c> Microsoft</c><00:04:48.360><c> Word</c><00:04:48.660><c> we</c><00:04:49.380><c> overwrite</c><00:04:49.860><c> it</c>
save in Microsoft Word we overwrite it
 
save in Microsoft Word we overwrite it
the<00:04:51.540><c> old</c><00:04:51.660><c> version</c><00:04:51.900><c> is</c><00:04:52.320><c> erased</c><00:04:52.979><c> and</c><00:04:53.580><c> this</c><00:04:53.940><c> new</c>
the old version is erased and this new
 
the old version is erased and this new
updated<00:04:54.660><c> Edition</c><00:04:55.020><c> is</c><00:04:55.860><c> the</c><00:04:56.100><c> linked</c><00:04:56.520><c> circuit</c>
updated Edition is the linked circuit
 
updated Edition is the linked circuit
will<00:04:57.180><c> retrieve</c><00:04:57.720><c> the</c><00:04:58.199><c> next</c><00:04:58.380><c> time</c><00:04:58.620><c> we</c><00:04:58.860><c> revisit</c>
will retrieve the next time we revisit
 
will retrieve the next time we revisit
that<00:04:59.520><c> memory</c>
that memory
 
that memory
as<00:05:01.259><c> you</c><00:05:01.380><c> might</c><00:05:01.560><c> imagine</c><00:05:01.800><c> after</c><00:05:02.639><c> several</c>
as you might imagine after several
 
as you might imagine after several
recalls<00:05:03.720><c> of</c><00:05:03.960><c> Any</c><00:05:04.199><c> Given</c><00:05:04.500><c> episodic</c><00:05:05.100><c> memory</c><00:05:05.460><c> it</c>
recalls of Any Given episodic memory it
 
recalls of Any Given episodic memory it
has<00:05:06.479><c> the</c><00:05:06.720><c> potential</c><00:05:07.080><c> to</c><00:05:07.380><c> drift</c><00:05:07.680><c> quite</c><00:05:08.100><c> a</c><00:05:08.280><c> bit</c>
has the potential to drift quite a bit
 
has the potential to drift quite a bit
from<00:05:09.000><c> the</c><00:05:09.180><c> original</c><00:05:09.560><c> If</c><00:05:10.560><c> you</c><00:05:10.800><c> experience</c>
from the original If you experience
 
from the original If you experience
something<00:05:11.699><c> highly</c><00:05:12.419><c> unexpected</c><00:05:13.199><c> and</c>
something highly unexpected and
 
something highly unexpected and
exceptionally<00:05:14.520><c> emotional</c><00:05:15.180><c> you</c><00:05:15.960><c> might</c><00:05:16.080><c> create</c>
exceptionally emotional you might create
 
exceptionally emotional you might create
what<00:05:16.740><c> is</c><00:05:16.860><c> known</c><00:05:17.100><c> as</c><00:05:17.400><c> a</c><00:05:17.699><c> flash</c><00:05:17.880><c> bulb</c><00:05:18.419><c> memory</c>
what is known as a flash bulb memory
 
what is known as a flash bulb memory
flash<00:05:19.919><c> bulbs</c><00:05:20.400><c> are</c><00:05:20.520><c> episodic</c><00:05:21.060><c> memories</c><00:05:21.360><c> for</c>
flash bulbs are episodic memories for
 
flash bulbs are episodic memories for
experiences<00:05:22.380><c> that</c><00:05:22.680><c> were</c><00:05:22.919><c> shocking</c>
experiences that were shocking
 
experiences that were shocking
highly<00:05:24.720><c> significant</c><00:05:25.199><c> to</c><00:05:25.440><c> you</c><00:05:25.620><c> and</c><00:05:26.220><c> evoked</c><00:05:26.820><c> big</c>
highly significant to you and evoked big
 
highly significant to you and evoked big
emotions<00:05:27.780><c> like</c><00:05:28.440><c> fear</c><00:05:29.100><c> rage</c><00:05:29.699><c> grief</c><00:05:30.600><c> Joy</c><00:05:31.500><c> love</c>
emotions like fear rage grief Joy love
 
emotions like fear rage grief Joy love
examples<00:05:33.300><c> of</c><00:05:33.539><c> these</c><00:05:33.840><c> types</c><00:05:34.080><c> of</c><00:05:34.199><c> memories</c>
examples of these types of memories
 
examples of these types of memories
include<00:05:35.039><c> 911</c><00:05:35.639><c> the</c><00:05:36.600><c> death</c><00:05:36.720><c> of</c><00:05:36.960><c> a</c><00:05:37.139><c> parent</c><00:05:37.380><c> the</c>
include 911 the death of a parent the
 
include 911 the death of a parent the
day<00:05:38.520><c> your</c><00:05:38.759><c> spouse</c><00:05:39.060><c> proposed</c><00:05:39.900><c> or</c><00:05:40.800><c> if</c><00:05:40.919><c> you're</c>
day your spouse proposed or if you're
 
day your spouse proposed or if you're
from<00:05:41.400><c> Boston</c><00:05:41.820><c> when</c><00:05:42.600><c> the</c><00:05:42.720><c> Red</c><00:05:42.900><c> Sox</c><00:05:43.259><c> won</c><00:05:43.500><c> the</c>
from Boston when the Red Sox won the
 
from Boston when the Red Sox won the
 
but<00:05:46.440><c> even</c><00:05:46.860><c> though</c><00:05:47.160><c> they</c><00:05:47.520><c> feel</c><00:05:47.880><c> so</c><00:05:48.479><c> vividly</c><00:05:48.960><c> and</c>
but even though they feel so vividly and
 
but even though they feel so vividly and
confidently<00:05:49.740><c> remembered</c><00:05:50.400><c> flash</c><00:05:51.240><c> bulbs</c><00:05:51.840><c> are</c>
confidently remembered flash bulbs are
 
confidently remembered flash bulbs are
episodic<00:05:52.860><c> memories</c><00:05:53.340><c> and</c><00:05:54.120><c> like</c><00:05:54.360><c> other</c>
episodic memories and like other
 
episodic memories and like other
episodic<00:05:55.320><c> memories</c><00:05:55.680><c> they</c><00:05:56.220><c> are</c><00:05:56.460><c> also</c>
episodic memories they are also
 
episodic memories they are also
inaccurate
inaccurate
 
inaccurate
here's<00:05:59.100><c> my</c><00:05:59.400><c> favorite</c><00:05:59.639><c> example</c><00:06:00.240><c> of</c><00:06:00.720><c> how</c><00:06:00.900><c> flash</c>
here's my favorite example of how flash
 
here's my favorite example of how flash
build<00:06:01.440><c> memories</c><00:06:01.919><c> can</c><00:06:02.220><c> be</c><00:06:02.460><c> just</c><00:06:02.820><c> as</c><00:06:03.060><c> incomplete</c>
build memories can be just as incomplete
 
build memories can be just as incomplete
distorted<00:06:04.919><c> and</c><00:06:05.460><c> dead</c><00:06:05.699><c> wrong</c><00:06:05.940><c> as</c><00:06:06.479><c> ordinary</c>
distorted and dead wrong as ordinary
 
distorted and dead wrong as ordinary
episodic<00:06:07.560><c> memories</c>
episodic memories
 
episodic memories
on<00:06:09.479><c> January</c><00:06:09.840><c> 28</c><00:06:10.520><c> 1986</c><00:06:11.520><c> the</c><00:06:12.000><c> space</c><00:06:12.180><c> shuttle</c>
on January 28 1986 the space shuttle
 
on January 28 1986 the space shuttle
Challenger<00:06:13.080><c> exploded</c>
Challenger exploded
 
Challenger exploded
do<00:06:14.820><c> you</c><00:06:14.940><c> remember</c><00:06:15.120><c> the</c><00:06:15.539><c> details</c><00:06:15.900><c> of</c><00:06:16.080><c> where</c><00:06:16.259><c> you</c>
do you remember the details of where you
 
do you remember the details of where you
were<00:06:16.620><c> and</c><00:06:16.800><c> what</c><00:06:16.979><c> you</c><00:06:17.100><c> were</c><00:06:17.220><c> doing</c>
were and what you were doing
 
were and what you were doing
are<00:06:18.780><c> you</c><00:06:18.900><c> sure</c><00:06:19.139><c> you're</c><00:06:19.380><c> right</c>
are you sure you're right
 
are you sure you're right
 
psychologist
psychologist
 
psychologist
Ulrich<00:06:25.020><c> Nisar</c><00:06:25.500><c> and</c><00:06:25.680><c> Nicole</c><00:06:25.979><c> harsh</c><00:06:26.400><c> asked</c>
Ulrich Nisar and Nicole harsh asked
 
Ulrich Nisar and Nicole harsh asked
their<00:06:27.360><c> psychology</c><00:06:27.900><c> students</c><00:06:28.800><c> at</c><00:06:29.280><c> Emory</c>
their psychology students at Emory
 
their psychology students at Emory
college<00:06:30.000><c> a</c><00:06:30.840><c> series</c><00:06:30.960><c> of</c><00:06:31.259><c> questions</c><00:06:31.440><c> about</c>
college a series of questions about
 
college a series of questions about
where<00:06:32.160><c> they</c><00:06:32.400><c> were</c><00:06:32.639><c> and</c><00:06:33.240><c> what</c><00:06:33.479><c> they</c><00:06:33.600><c> were</c><00:06:33.720><c> doing</c>
where they were and what they were doing
 
where they were and what they were doing
two<00:06:35.699><c> and</c><00:06:35.819><c> a</c><00:06:35.940><c> half</c><00:06:36.000><c> years</c><00:06:36.240><c> later</c><00:06:36.479><c> they</c><00:06:37.139><c> asked</c>
two and a half years later they asked
 
two and a half years later they asked
these<00:06:37.919><c> same</c><00:06:38.100><c> students</c><00:06:38.580><c> the</c><00:06:39.419><c> same</c><00:06:39.660><c> questions</c>
these same students the same questions
 
these same students the same questions
and<00:06:40.800><c> checked</c><00:06:41.160><c> their</c><00:06:41.460><c> answers</c><00:06:41.880><c> their</c><00:06:42.840><c> episodic</c>
and checked their answers their episodic
 
and checked their answers their episodic
memories<00:06:44.100><c> against</c><00:06:44.819><c> their</c><00:06:45.300><c> original</c><00:06:45.479><c> memories</c>
memories against their original memories
 
memories against their original memories
zero<00:06:47.940><c> percent</c><00:06:48.120><c> of</c><00:06:48.479><c> them</c><00:06:48.720><c> gave</c><00:06:49.319><c> answers</c><00:06:49.740><c> that</c>
zero percent of them gave answers that
 
zero percent of them gave answers that
 
more<00:06:53.880><c> amazing</c><00:06:54.360><c> when</c><00:06:54.900><c> shown</c><00:06:55.259><c> their</c><00:06:55.560><c> original</c>
more amazing when shown their original
 
more amazing when shown their original
answers<00:06:56.400><c> in</c><00:06:57.240><c> their</c><00:06:57.479><c> own</c><00:06:57.660><c> handwriting</c><00:06:58.500><c> these</c>
answers in their own handwriting these
 
answers in their own handwriting these
students<00:06:59.699><c> still</c><00:07:00.060><c> stuck</c><00:07:00.300><c> to</c><00:07:00.539><c> the</c><00:07:00.840><c> new</c><00:07:01.020><c> updated</c>
students still stuck to the new updated
 
students still stuck to the new updated
version<00:07:01.800><c> of</c><00:07:02.039><c> the</c><00:07:02.220><c> memory</c><00:07:02.580><c> and</c><00:07:03.240><c> scratched</c>
version of the memory and scratched
 
version of the memory and scratched
their<00:07:03.780><c> heads</c><00:07:04.080><c> over</c><00:07:04.199><c> the</c><00:07:04.440><c> mismatch</c>
their heads over the mismatch
 
their heads over the mismatch
they<00:07:06.180><c> couldn't</c><00:07:06.419><c> make</c><00:07:06.780><c> sense</c><00:07:07.020><c> of</c><00:07:07.259><c> their</c>
they couldn't make sense of their
 
they couldn't make sense of their
original<00:07:07.620><c> answers</c><00:07:08.220><c> because</c><00:07:08.940><c> those</c><00:07:09.419><c> answers</c>
original answers because those answers
 
original answers because those answers
no<00:07:10.319><c> longer</c><00:07:10.620><c> existed</c><00:07:11.100><c> in</c><00:07:11.220><c> their</c><00:07:11.460><c> brains</c><00:07:11.880><c> their</c>
no longer existed in their brains their
 
no longer existed in their brains their
memories<00:07:13.199><c> were</c><00:07:13.620><c> permanently</c><00:07:14.160><c> changed</c><00:07:14.819><c> and</c>
memories were permanently changed and
 
memories were permanently changed and
wrong
wrong
 
wrong
so<00:07:17.520><c> the</c><00:07:17.819><c> next</c><00:07:18.000><c> time</c><00:07:18.360><c> you</c><00:07:18.720><c> and</c><00:07:18.900><c> your</c><00:07:19.080><c> partner</c>
so the next time you and your partner
 
so the next time you and your partner
disagree<00:07:20.280><c> over</c><00:07:20.460><c> the</c><00:07:20.819><c> details</c><00:07:21.360><c> of</c><00:07:21.840><c> what</c>
disagree over the details of what
 
disagree over the details of what
happened<00:07:22.259><c> on</c><00:07:22.560><c> that</c><00:07:22.740><c> trip</c><00:07:22.919><c> to</c><00:07:23.160><c> Disney</c><00:07:23.340><c> World</c><00:07:23.639><c> 10</c>
happened on that trip to Disney World 10
 
happened on that trip to Disney World 10
years<00:07:24.240><c> ago</c>
years ago
 
years ago
realize<00:07:26.099><c> that</c><00:07:26.460><c> both</c><00:07:26.759><c> of</c><00:07:27.000><c> your</c><00:07:27.180><c> memories</c><00:07:27.539><c> are</c>
realize that both of your memories are
 
realize that both of your memories are
likely<00:07:28.199><c> incomplete</c><00:07:28.979><c> and</c><00:07:29.699><c> distorted</c>
likely incomplete and distorted
 
likely incomplete and distorted
when<00:07:31.500><c> it</c><00:07:31.620><c> comes</c><00:07:31.860><c> to</c><00:07:32.039><c> episodic</c><00:07:32.639><c> memory</c>
when it comes to episodic memory
 
when it comes to episodic memory
imperfect<00:07:34.319><c> is</c><00:07:34.560><c> the</c><00:07:34.800><c> best</c><00:07:34.919><c> our</c><00:07:35.220><c> human</c><00:07:35.400><c> brains</c>
imperfect is the best our human brains
 
imperfect is the best our human brains
can<00:07:36.060><c> do</c>
Kind: captions
Language: en
 
our<00:00:06.779><c> human</c><00:00:07.020><c> brains</c><00:00:07.680><c> are</c><00:00:08.580><c> mind-blowing</c><00:00:09.360><c> you</c>
our human brains are mind-blowing you
 
our human brains are mind-blowing you
have<00:00:10.500><c> approximately</c><00:00:11.480><c> 86</c><00:00:12.480><c> billion</c><00:00:13.200><c> neurons</c><00:00:13.679><c> in</c>
have approximately 86 billion neurons in
 
have approximately 86 billion neurons in
your<00:00:14.099><c> head</c>
your head
 
your head
the<00:00:15.599><c> patterns</c><00:00:16.020><c> of</c><00:00:16.199><c> activity</c><00:00:16.619><c> among</c><00:00:17.100><c> these</c>
the patterns of activity among these
 
the patterns of activity among these
neurons<00:00:17.760><c> allow</c><00:00:18.720><c> us</c><00:00:18.840><c> to</c><00:00:19.199><c> feel</c><00:00:19.500><c> love</c><00:00:20.220><c> and</c><00:00:20.640><c> awe</c><00:00:21.119><c> to</c>
neurons allow us to feel love and awe to
 
neurons allow us to feel love and awe to
discern<00:00:22.199><c> the</c><00:00:22.500><c> difference</c><00:00:22.680><c> between</c><00:00:23.160><c> Cerulean</c>
discern the difference between Cerulean
 
discern the difference between Cerulean
blue<00:00:24.240><c> and</c><00:00:24.539><c> magenta</c>
blue and magenta
 
blue and magenta
to<00:00:26.340><c> solve</c><00:00:26.640><c> math</c><00:00:26.880><c> equations</c><00:00:27.380><c> invent</c><00:00:28.380><c> vaccines</c>
to solve math equations invent vaccines
 
to solve math equations invent vaccines
and<00:00:30.060><c> imagine</c><00:00:30.240><c> what</c><00:00:30.779><c> someone</c><00:00:31.019><c> else</c><00:00:31.260><c> is</c><00:00:31.500><c> feeling</c>
and imagine what someone else is feeling
 
and imagine what someone else is feeling
but<00:00:33.360><c> of</c><00:00:33.600><c> all</c><00:00:33.899><c> the</c><00:00:34.140><c> miraculous</c><00:00:34.680><c> Feats</c><00:00:35.219><c> your</c>
but of all the miraculous Feats your
 
but of all the miraculous Feats your
brain<00:00:35.700><c> performs</c><00:00:36.380><c> memory</c><00:00:37.380><c> is</c><00:00:37.800><c> King</c>
brain performs memory is King
 
brain performs memory is King
you<00:00:39.300><c> need</c><00:00:39.480><c> memory</c><00:00:39.899><c> to</c><00:00:40.260><c> learn</c><00:00:40.440><c> anything</c>
you need memory to learn anything
 
you need memory to learn anything
without<00:00:42.540><c> it</c><00:00:42.840><c> information</c><00:00:43.260><c> and</c><00:00:43.800><c> experiences</c>
without it information and experiences
 
without it information and experiences
can't<00:00:44.879><c> be</c><00:00:45.120><c> retained</c>
can't be retained
 
can't be retained
new<00:00:46.860><c> people</c><00:00:47.100><c> would</c><00:00:47.399><c> remain</c><00:00:47.760><c> strangers</c><00:00:48.559><c> you</c>
new people would remain strangers you
 
new people would remain strangers you
depend<00:00:49.920><c> on</c><00:00:50.219><c> memory</c><00:00:50.579><c> to</c><00:00:51.239><c> understand</c><00:00:51.539><c> what</c><00:00:52.200><c> I'm</c>
depend on memory to understand what I'm
 
depend on memory to understand what I'm
saying<00:00:52.920><c> to</c><00:00:53.579><c> know</c><00:00:53.760><c> where</c><00:00:54.059><c> you</c><00:00:54.300><c> live</c><00:00:54.600><c> and</c><00:00:55.079><c> to</c><00:00:55.260><c> do</c>
saying to know where you live and to do
 
saying to know where you live and to do
your<00:00:55.620><c> job</c>
your job
 
your job
you<00:00:57.000><c> need</c><00:00:57.120><c> memory</c><00:00:57.539><c> to</c><00:00:57.780><c> get</c><00:00:57.960><c> dressed</c><00:00:58.500><c> play</c>
you need memory to get dressed play
 
you need memory to get dressed play
tennis<00:00:59.460><c> and</c><00:00:59.820><c> drive</c><00:01:00.000><c> your</c><00:01:00.360><c> car</c>
tennis and drive your car
 
tennis and drive your car
you<00:01:02.160><c> use</c><00:01:02.340><c> memory</c><00:01:02.879><c> from</c><00:01:03.420><c> the</c><00:01:03.660><c> moment</c><00:01:04.019><c> you</c><00:01:04.260><c> wake</c>
you use memory from the moment you wake
 
you use memory from the moment you wake
up<00:01:04.680><c> until</c><00:01:05.280><c> the</c><00:01:05.640><c> moment</c><00:01:05.880><c> you</c><00:01:06.119><c> go</c><00:01:06.299><c> to</c><00:01:06.420><c> sleep</c><00:01:06.720><c> and</c>
up until the moment you go to sleep and
 
up until the moment you go to sleep and
even<00:01:07.860><c> then</c><00:01:08.220><c> your</c><00:01:08.820><c> memory</c><00:01:09.119><c> processes</c><00:01:09.720><c> are</c><00:01:09.960><c> busy</c>
even then your memory processes are busy
 
even then your memory processes are busy
at<00:01:10.439><c> work</c>
at work
 
at work
the<00:01:12.180><c> significant</c><00:01:12.780><c> facts</c><00:01:13.380><c> and</c><00:01:13.500><c> moments</c><00:01:13.920><c> of</c>
the significant facts and moments of
 
the significant facts and moments of
your<00:01:14.220><c> life</c><00:01:14.460><c> strung</c><00:01:14.939><c> together</c><00:01:15.119><c> create</c><00:01:16.020><c> your</c>
your life strung together create your
 
your life strung together create your
life's<00:01:16.740><c> narrative</c><00:01:17.299><c> memory</c><00:01:18.299><c> allows</c><00:01:18.720><c> you</c><00:01:18.780><c> to</c>
life's narrative memory allows you to
 
life's narrative memory allows you to
have<00:01:19.140><c> a</c><00:01:19.260><c> sense</c><00:01:19.439><c> of</c><00:01:19.560><c> who</c><00:01:19.740><c> you</c><00:01:19.979><c> are</c><00:01:20.220><c> and</c><00:01:20.759><c> who</c>
have a sense of who you are and who
 
have a sense of who you are and who
you've<00:01:21.299><c> been</c>
you've been
 
you've been
scientifically<00:01:23.759><c> speaking</c><00:01:24.380><c> what</c><00:01:25.380><c> even</c><00:01:25.560><c> is</c><00:01:25.799><c> a</c>
scientifically speaking what even is a
 
scientifically speaking what even is a
memory<00:01:26.280><c> how</c><00:01:27.180><c> were</c><00:01:27.360><c> memories</c><00:01:27.780><c> made</c><00:01:28.200><c> and</c>
memory how were memories made and
 
memory how were memories made and
retrieved
retrieved
 
retrieved
memory<00:01:30.780><c> creation</c><00:01:31.259><c> takes</c><00:01:31.920><c> place</c><00:01:32.220><c> in</c><00:01:32.700><c> four</c>
memory creation takes place in four
 
memory creation takes place in four
basic<00:01:33.420><c> steps</c>
basic steps
 
basic steps
step<00:01:34.860><c> one</c><00:01:35.240><c> your</c><00:01:36.240><c> brain</c><00:01:36.479><c> takes</c><00:01:36.780><c> in</c><00:01:37.020><c> the</c><00:01:37.380><c> sights</c>
step one your brain takes in the sights
 
step one your brain takes in the sights
sounds<00:01:38.280><c> smells</c><00:01:39.000><c> information</c><00:01:39.619><c> emotion</c><00:01:40.619><c> and</c>
sounds smells information emotion and
 
sounds smells information emotion and
meaning<00:01:41.280><c> of</c><00:01:41.939><c> what</c><00:01:42.180><c> you</c><00:01:42.360><c> perceived</c><00:01:42.900><c> and</c><00:01:43.079><c> paid</c>
meaning of what you perceived and paid
 
meaning of what you perceived and paid
attention<00:01:43.680><c> to</c><00:01:44.040><c> and</c><00:01:44.880><c> translates</c><00:01:45.420><c> all</c><00:01:45.900><c> of</c><00:01:46.020><c> this</c>
attention to and translates all of this
 
attention to and translates all of this
into<00:01:46.740><c> patterns</c><00:01:47.400><c> of</c><00:01:47.579><c> neurological</c><00:01:48.240><c> activity</c>
into patterns of neurological activity
 
into patterns of neurological activity
step<00:01:50.579><c> two</c><00:01:51.200><c> your</c><00:01:52.200><c> brain</c><00:01:52.439><c> then</c><00:01:52.740><c> links</c><00:01:53.520><c> all</c><00:01:53.820><c> of</c>
step two your brain then links all of
 
step two your brain then links all of
that<00:01:54.240><c> previously</c><00:01:54.780><c> unrelated</c><00:01:55.560><c> activity</c><00:01:56.220><c> into</c>
that previously unrelated activity into
 
that previously unrelated activity into
a<00:01:57.420><c> single</c><00:01:57.780><c> pattern</c><00:01:58.140><c> of</c><00:01:58.500><c> associated</c>
a single pattern of associated
 
a single pattern of associated
connections<00:01:59.899><c> your</c><00:02:00.899><c> brain</c><00:02:01.140><c> weaves</c><00:02:01.799><c> all</c><00:02:02.040><c> that</c>
connections your brain weaves all that
 
connections your brain weaves all that
information<00:02:02.520><c> together</c>
information together
 
information together
step<00:02:04.860><c> three</c><00:02:05.180><c> that</c><00:02:06.180><c> woven</c><00:02:06.659><c> pattern</c><00:02:07.259><c> persists</c>
step three that woven pattern persists
 
step three that woven pattern persists
in<00:02:08.220><c> your</c><00:02:08.399><c> brain</c><00:02:08.700><c> stored</c><00:02:09.539><c> as</c><00:02:09.780><c> a</c><00:02:09.899><c> neural</c><00:02:10.259><c> circuit</c>
in your brain stored as a neural circuit
 
in your brain stored as a neural circuit
step<00:02:12.060><c> four</c>
step four
 
step four
when<00:02:13.620><c> this</c><00:02:13.860><c> neural</c><00:02:14.280><c> circuit</c><00:02:14.700><c> is</c><00:02:14.940><c> later</c>
when this neural circuit is later
 
when this neural circuit is later
activated<00:02:16.160><c> tomorrow</c><00:02:17.239><c> next</c><00:02:18.239><c> month</c><00:02:18.599><c> maybe</c><00:02:19.319><c> even</c>
activated tomorrow next month maybe even
 
activated tomorrow next month maybe even
 
this<00:02:23.160><c> woven</c><00:02:23.520><c> information</c>
this woven information
 
this woven information
you<00:02:25.440><c> remember</c>
you remember
 
you remember
let's<00:02:27.300><c> go</c><00:02:27.540><c> back</c><00:02:27.660><c> to</c><00:02:27.900><c> Step</c><00:02:28.080><c> One</c><00:02:28.440><c> let's</c><00:02:29.400><c> say</c><00:02:29.640><c> I</c>
let's go back to Step One let's say I
 
let's go back to Step One let's say I
meet<00:02:30.420><c> Oprah</c><00:02:30.959><c> Winfrey</c><00:02:31.500><c> and</c><00:02:31.920><c> she</c><00:02:32.160><c> says</c><00:02:32.459><c> to</c><00:02:32.580><c> me</c>
meet Oprah Winfrey and she says to me
 
meet Oprah Winfrey and she says to me
Lisa<00:02:33.900><c> I</c><00:02:34.860><c> love</c><00:02:35.340><c> your</c><00:02:35.819><c> book</c>
Lisa I love your book
 
Lisa I love your book
the<00:02:37.620><c> sight</c><00:02:37.800><c> of</c><00:02:38.099><c> Oprah</c><00:02:38.580><c> travels</c><00:02:39.360><c> from</c><00:02:39.720><c> my</c><00:02:39.959><c> eyes</c>
the sight of Oprah travels from my eyes
 
the sight of Oprah travels from my eyes
to<00:02:40.560><c> the</c><00:02:40.739><c> back</c><00:02:40.980><c> of</c><00:02:41.220><c> my</c><00:02:41.519><c> brain</c><00:02:41.819><c> my</c><00:02:42.239><c> occipital</c>
to the back of my brain my occipital
 
to the back of my brain my occipital
lobe<00:02:43.200><c> and</c><00:02:43.739><c> is</c><00:02:43.920><c> processed</c><00:02:44.519><c> in</c><00:02:44.640><c> my</c><00:02:44.819><c> visual</c>
lobe and is processed in my visual
 
lobe and is processed in my visual
cortex<00:02:45.860><c> the</c><00:02:46.860><c> sound</c><00:02:47.099><c> of</c><00:02:47.340><c> Oprah's</c><00:02:47.879><c> voice</c><00:02:48.120><c> is</c>
cortex the sound of Oprah's voice is
 
cortex the sound of Oprah's voice is
translated<00:02:49.440><c> into</c><00:02:49.739><c> neurological</c><00:02:50.519><c> activity</c><00:02:51.120><c> in</c>
translated into neurological activity in
 
translated into neurological activity in
my<00:02:51.840><c> auditory</c><00:02:52.319><c> cortex</c><00:02:52.860><c> and</c><00:02:53.160><c> my</c><00:02:53.340><c> temporal</c><00:02:53.700><c> lobes</c>
my auditory cortex and my temporal lobes
 
my auditory cortex and my temporal lobes
not<00:02:54.540><c> far</c><00:02:54.720><c> from</c><00:02:54.900><c> my</c><00:02:55.140><c> ears</c>
not far from my ears
 
not far from my ears
comprehending<00:02:57.599><c> the</c><00:02:57.900><c> meaning</c><00:02:58.080><c> of</c><00:02:58.440><c> these</c>
comprehending the meaning of these
 
comprehending the meaning of these
sounds<00:02:58.920><c> occurs</c><00:02:59.580><c> in</c><00:02:59.760><c> a</c><00:02:59.940><c> specific</c><00:03:00.180><c> location</c>
sounds occurs in a specific location
 
sounds occurs in a specific location
called<00:03:01.019><c> Wernicke's</c><00:03:01.860><c> area</c>
called Wernicke's area
 
called Wernicke's area
how<00:03:03.239><c> meeting</c><00:03:03.540><c> Oprah</c><00:03:04.200><c> made</c><00:03:04.440><c> me</c><00:03:04.680><c> feel</c><00:03:05.160><c> is</c>
how meeting Oprah made me feel is
 
how meeting Oprah made me feel is
mediated<00:03:06.300><c> by</c><00:03:06.599><c> the</c><00:03:06.840><c> activity</c><00:03:07.319><c> of</c><00:03:07.560><c> neurons</c><00:03:07.920><c> in</c>
mediated by the activity of neurons in
 
mediated by the activity of neurons in
my<00:03:08.400><c> brain's</c><00:03:08.760><c> limbic</c><00:03:09.239><c> system</c>
my brain's limbic system
 
my brain's limbic system
so<00:03:11.400><c> where</c><00:03:11.819><c> would</c><00:03:12.060><c> my</c><00:03:12.420><c> memory</c><00:03:12.959><c> of</c><00:03:13.319><c> meeting</c>
so where would my memory of meeting
 
so where would my memory of meeting
Oprah<00:03:14.099><c> be</c><00:03:14.280><c> stored</c>
Oprah be stored
 
Oprah be stored
well<00:03:15.900><c> unlike</c><00:03:16.319><c> Vision</c><00:03:16.800><c> hearing</c><00:03:17.640><c> language</c>
well unlike Vision hearing language
 
well unlike Vision hearing language
emotion<00:03:18.959><c> there</c><00:03:19.860><c> is</c><00:03:20.040><c> no</c><00:03:20.400><c> specialized</c><00:03:21.000><c> Memory</c>
emotion there is no specialized Memory
 
emotion there is no specialized Memory
Center<00:03:21.739><c> there</c><00:03:22.739><c> is</c><00:03:22.860><c> no</c><00:03:23.099><c> memory</c><00:03:23.459><c> bank</c>
Center there is no memory bank
 
Center there is no memory bank
my<00:03:25.200><c> memory</c><00:03:25.500><c> of</c><00:03:25.800><c> meeting</c><00:03:25.980><c> Oprah</c><00:03:26.700><c> would</c><00:03:27.120><c> be</c>
my memory of meeting Oprah would be
 
my memory of meeting Oprah would be
stored<00:03:27.720><c> in</c><00:03:27.900><c> the</c><00:03:28.140><c> connected</c><00:03:28.620><c> pattern</c><00:03:29.159><c> of</c>
stored in the connected pattern of
 
stored in the connected pattern of
activity<00:03:29.819><c> between</c><00:03:30.599><c> the</c><00:03:31.019><c> parts</c><00:03:31.140><c> of</c><00:03:31.379><c> the</c><00:03:31.620><c> brain</c>
activity between the parts of the brain
 
activity between the parts of the brain
that<00:03:32.220><c> registered</c><00:03:32.700><c> the</c><00:03:32.819><c> initial</c><00:03:33.180><c> experience</c>
that registered the initial experience
 
that registered the initial experience
it<00:03:35.280><c> would</c><00:03:35.459><c> be</c><00:03:35.640><c> contained</c><00:03:36.239><c> in</c><00:03:36.480><c> this</c><00:03:36.780><c> sight</c>
it would be contained in this sight
 
it would be contained in this sight
sound<00:03:37.920><c> language</c><00:03:38.400><c> feeling</c><00:03:38.940><c> linked</c><00:03:39.659><c> neural</c>
sound language feeling linked neural
 
sound language feeling linked neural
circuit
circuit
 
circuit
our<00:03:42.239><c> brains</c><00:03:42.720><c> are</c><00:03:43.620><c> Limitless</c><00:03:44.159><c> in</c><00:03:44.580><c> their</c>
our brains are Limitless in their
 
our brains are Limitless in their
capacity<00:03:45.299><c> to</c><00:03:45.659><c> create</c><00:03:45.780><c> linked</c><00:03:46.379><c> neural</c>
capacity to create linked neural
 
capacity to create linked neural
circuits<00:03:47.280><c> new</c><00:03:48.000><c> memories</c><00:03:48.620><c> at</c><00:03:49.620><c> any</c><00:03:49.920><c> age</c>
circuits new memories at any age
 
circuits new memories at any age
and<00:03:51.360><c> our</c><00:03:51.480><c> brains</c><00:03:51.900><c> will</c><00:03:52.140><c> never</c><00:03:52.440><c> run</c><00:03:52.739><c> out</c><00:03:53.040><c> of</c>
and our brains will never run out of
 
and our brains will never run out of
storage<00:03:53.580><c> space</c><00:03:54.120><c> which</c><00:03:54.840><c> is</c><00:03:55.019><c> both</c><00:03:55.340><c> amazing</c><00:03:56.340><c> and</c>
storage space which is both amazing and
 
storage space which is both amazing and
reassuring<00:03:57.480><c> especially</c><00:03:58.440><c> as</c><00:03:58.680><c> we</c><00:03:58.860><c> grow</c><00:03:59.040><c> older</c>
reassuring especially as we grow older
 
reassuring especially as we grow older
so<00:04:01.200><c> how</c><00:04:01.560><c> do</c><00:04:01.739><c> our</c><00:04:01.980><c> brains</c><00:04:02.340><c> create</c><00:04:02.640><c> these</c><00:04:03.180><c> linked</c>
so how do our brains create these linked
 
so how do our brains create these linked
circuits<00:04:04.019><c> called</c><00:04:04.260><c> Memories</c>
circuits called Memories
 
circuits called Memories
the<00:04:06.299><c> information</c><00:04:06.620><c> contained</c><00:04:07.620><c> within</c><00:04:08.040><c> an</c>
the information contained within an
 
the information contained within an
experience<00:04:08.760><c> that</c><00:04:09.360><c> is</c><00:04:09.599><c> collected</c><00:04:10.080><c> and</c><00:04:10.260><c> paid</c>
experience that is collected and paid
 
experience that is collected and paid
attention<00:04:10.799><c> to</c><00:04:10.980><c> by</c><00:04:11.280><c> your</c><00:04:11.519><c> brain</c><00:04:11.840><c> the</c><00:04:12.840><c> sensory</c>
attention to by your brain the sensory
 
attention to by your brain the sensory
perceptions<00:04:13.799><c> the</c><00:04:14.459><c> emotion</c><00:04:15.000><c> the</c><00:04:15.659><c> who</c><00:04:15.900><c> what</c>
perceptions the emotion the who what
 
perceptions the emotion the who what
where<00:04:16.500><c> when</c><00:04:16.739><c> and</c><00:04:16.979><c> why</c><00:04:17.299><c> is</c><00:04:18.299><c> linked</c><00:04:18.780><c> by</c><00:04:19.019><c> a</c><00:04:19.199><c> part</c>
where when and why is linked by a part
 
where when and why is linked by a part
of<00:04:19.500><c> your</c><00:04:19.620><c> brain</c><00:04:19.919><c> called</c><00:04:20.220><c> the</c><00:04:20.459><c> hippocampus</c>
of your brain called the hippocampus
 
of your brain called the hippocampus
this<00:04:22.880><c> seahorse-shaped</c><00:04:23.880><c> structure</c><00:04:24.360><c> deep</c><00:04:24.960><c> in</c>
this seahorse-shaped structure deep in
 
this seahorse-shaped structure deep in
the<00:04:25.320><c> middle</c><00:04:25.440><c> of</c><00:04:25.620><c> your</c><00:04:25.860><c> brain</c><00:04:26.180><c> repeatedly</c>
the middle of your brain repeatedly
 
the middle of your brain repeatedly
activates<00:04:27.840><c> the</c><00:04:28.199><c> parts</c><00:04:28.380><c> of</c><00:04:28.620><c> the</c><00:04:28.860><c> brain</c>
activates the parts of the brain
 
activates the parts of the brain
involved<00:04:29.940><c> in</c><00:04:30.060><c> what</c><00:04:30.300><c> is</c><00:04:30.479><c> to</c><00:04:30.600><c> be</c><00:04:30.720><c> remembered</c>
involved in what is to be remembered
 
involved in what is to be remembered
until<00:04:31.919><c> those</c><00:04:32.340><c> parts</c><00:04:32.580><c> of</c><00:04:32.820><c> the</c><00:04:33.000><c> brain</c><00:04:33.240><c> become</c><00:04:33.720><c> a</c>
until those parts of the brain become a
 
until those parts of the brain become a
stable<00:04:34.460><c> connected</c><00:04:35.460><c> pattern</c><00:04:35.940><c> of</c><00:04:36.120><c> activity</c>
stable connected pattern of activity
 
stable connected pattern of activity
essentially<00:04:37.680><c> wiring</c><00:04:38.400><c> them</c><00:04:38.580><c> together</c><00:04:38.820><c> to</c><00:04:39.240><c> form</c>
essentially wiring them together to form
 
essentially wiring them together to form
a<00:04:39.660><c> new</c><00:04:39.780><c> memory</c>
a new memory
 
a new memory
if<00:04:41.639><c> your</c><00:04:41.820><c> hippocampus</c><00:04:42.540><c> is</c><00:04:42.780><c> damaged</c><00:04:43.380><c> your</c>
if your hippocampus is damaged your
 
if your hippocampus is damaged your
ability<00:04:44.580><c> to</c><00:04:45.000><c> create</c><00:04:45.120><c> new</c><00:04:45.479><c> memories</c><00:04:45.900><c> will</c><00:04:46.440><c> be</c>
ability to create new memories will be
 
ability to create new memories will be
impaired
impaired
 
impaired
Alzheimer's<00:04:49.020><c> disease</c><00:04:49.440><c> begins</c><00:04:50.100><c> its</c><00:04:50.460><c> Rampage</c>
Alzheimer's disease begins its Rampage
 
Alzheimer's disease begins its Rampage
in<00:04:51.240><c> the</c><00:04:51.360><c> hippocampus</c>
in the hippocampus
 
in the hippocampus
as<00:04:53.460><c> a</c><00:04:53.639><c> result</c><00:04:53.759><c> the</c><00:04:54.540><c> first</c><00:04:54.780><c> symptoms</c><00:04:55.080><c> of</c><00:04:55.500><c> this</c>
as a result the first symptoms of this
 
as a result the first symptoms of this
disease<00:04:56.100><c> are</c><00:04:56.580><c> typically</c><00:04:56.940><c> forgetting</c><00:04:57.540><c> what</c>
disease are typically forgetting what
 
disease are typically forgetting what
happened<00:04:58.020><c> earlier</c><00:04:58.620><c> today</c><00:04:58.979><c> and</c><00:04:59.759><c> repeating</c><00:05:00.300><c> the</c>
happened earlier today and repeating the
 
happened earlier today and repeating the
same<00:05:00.720><c> story</c><00:05:01.080><c> or</c><00:05:01.500><c> question</c><00:05:01.740><c> over</c><00:05:02.220><c> and</c><00:05:02.460><c> over</c>
same story or question over and over
 
same story or question over and over
what<00:05:04.680><c> happens</c><00:05:04.800><c> if</c><00:05:05.100><c> you</c><00:05:05.280><c> don't</c><00:05:05.400><c> have</c><00:05:05.580><c> a</c>
what happens if you don't have a
 
what happens if you don't have a
hippocampus<00:05:06.300><c> at</c><00:05:06.479><c> all</c>
hippocampus at all
 
hippocampus at all
a<00:05:08.160><c> man</c><00:05:08.340><c> named</c><00:05:08.699><c> Henry</c><00:05:09.120><c> malleason</c><00:05:09.720><c> or</c><00:05:10.500><c> HM</c><00:05:11.040><c> as</c><00:05:11.400><c> he</c>
a man named Henry malleason or HM as he
 
a man named Henry malleason or HM as he
is<00:05:11.759><c> called</c><00:05:12.000><c> in</c><00:05:12.180><c> the</c><00:05:12.360><c> literature</c><00:05:12.780><c> had</c><00:05:13.560><c> the</c>
is called in the literature had the
 
is called in the literature had the
hippocampus<00:05:14.520><c> and</c><00:05:14.820><c> surrounding</c><00:05:15.300><c> tissue</c><00:05:15.720><c> on</c>
hippocampus and surrounding tissue on
 
hippocampus and surrounding tissue on
both<00:05:16.380><c> sides</c><00:05:16.740><c> of</c><00:05:16.860><c> his</c><00:05:17.040><c> brain</c><00:05:17.340><c> surgically</c>
both sides of his brain surgically
 
both sides of his brain surgically
removed<00:05:18.780><c> in</c><00:05:19.080><c> an</c><00:05:19.259><c> attempt</c><00:05:19.500><c> to</c><00:05:19.740><c> cure</c><00:05:19.860><c> him</c><00:05:20.100><c> of</c>
removed in an attempt to cure him of
 
removed in an attempt to cure him of
unrelenting<00:05:21.000><c> seizures</c><00:05:21.479><c> the</c><00:05:22.380><c> surgery</c>
unrelenting seizures the surgery
 
unrelenting seizures the surgery
alleviated<00:05:23.699><c> Henry's</c><00:05:24.360><c> seizures</c><00:05:24.720><c> but</c><00:05:25.259><c> he</c>
alleviated Henry's seizures but he
 
alleviated Henry's seizures but he
tragically<00:05:26.039><c> traded</c><00:05:26.520><c> one</c><00:05:26.759><c> plague</c><00:05:27.120><c> for</c><00:05:27.300><c> another</c>
tragically traded one plague for another
 
tragically traded one plague for another
for<00:05:28.560><c> the</c><00:05:28.740><c> next</c><00:05:28.919><c> 55</c><00:05:29.699><c> years</c><00:05:30.000><c> until</c><00:05:30.419><c> his</c><00:05:30.720><c> death</c><00:05:30.960><c> at</c>
for the next 55 years until his death at
 
for the next 55 years until his death at
the<00:05:31.320><c> age</c><00:05:31.440><c> of</c><00:05:31.680><c> 82</c><00:05:32.100><c> Henry</c><00:05:33.060><c> could</c><00:05:33.360><c> no</c><00:05:33.600><c> longer</c>
the age of 82 Henry could no longer
 
the age of 82 Henry could no longer
consciously<00:05:34.380><c> remember</c><00:05:34.680><c> any</c><00:05:35.520><c> new</c><00:05:35.759><c> information</c>
consciously remember any new information
 
consciously remember any new information
or<00:05:36.539><c> experience</c><00:05:36.960><c> for</c><00:05:37.560><c> more</c><00:05:37.800><c> than</c><00:05:37.919><c> a</c><00:05:38.100><c> few</c>
or experience for more than a few
 
or experience for more than a few
moments<00:05:39.120><c> he</c><00:05:39.660><c> read</c><00:05:39.840><c> the</c><00:05:40.080><c> same</c><00:05:40.320><c> magazines</c><00:05:40.919><c> and</c>
moments he read the same magazines and
 
moments he read the same magazines and
watched<00:05:41.580><c> the</c><00:05:41.699><c> same</c><00:05:41.880><c> TV</c><00:05:42.240><c> shows</c><00:05:42.720><c> over</c><00:05:43.139><c> and</c><00:05:43.380><c> over</c>
watched the same TV shows over and over
 
watched the same TV shows over and over
as<00:05:44.039><c> if</c><00:05:44.220><c> he</c><00:05:44.340><c> had</c><00:05:44.520><c> never</c><00:05:44.639><c> seen</c><00:05:44.940><c> them</c><00:05:45.120><c> before</c>
as if he had never seen them before
 
as if he had never seen them before
he<00:05:46.740><c> greeted</c><00:05:47.100><c> the</c><00:05:47.220><c> doctors</c><00:05:47.580><c> who</c><00:05:47.880><c> studied</c><00:05:48.180><c> him</c>
he greeted the doctors who studied him
 
he greeted the doctors who studied him
as<00:05:48.900><c> if</c><00:05:49.080><c> meeting</c><00:05:49.259><c> them</c><00:05:49.560><c> for</c><00:05:49.800><c> the</c><00:05:49.919><c> first</c><00:05:50.100><c> time</c>
as if meeting them for the first time
 
as if meeting them for the first time
every<00:05:51.120><c> day</c>
every day
 
every day
he<00:05:52.500><c> never</c><00:05:52.620><c> recognized</c><00:05:53.280><c> them</c>
he never recognized them
 
he never recognized them
without<00:05:54.539><c> a</c><00:05:54.900><c> hippocampus</c><00:05:55.680><c> he</c><00:05:56.340><c> could</c><00:05:56.580><c> never</c>
without a hippocampus he could never
 
without a hippocampus he could never
again<00:05:57.240><c> create</c><00:05:57.660><c> a</c><00:05:58.080><c> consciously</c><00:05:58.500><c> held</c>
again create a consciously held
 
again create a consciously held
long-term<00:05:59.820><c> memory</c>
Kind: captions
Language: en
 
specific
 
 
 
in<00:00:04.500><c> the</c><00:00:04.620><c> past</c><00:00:04.860><c> 24</c><00:00:05.339><c> hours</c><00:00:05.819><c> did</c><00:00:06.720><c> your</c><00:00:06.899><c> brain</c>
in the past 24 hours did your brain
 
in the past 24 hours did your brain
forget<00:00:07.379><c> anything</c><00:00:07.980><c> that</c><00:00:08.340><c> you</c><00:00:08.580><c> expected</c><00:00:09.000><c> it</c><00:00:09.179><c> to</c>
forget anything that you expected it to
 
forget anything that you expected it to
remember
remember
 
remember
a<00:00:11.219><c> word</c><00:00:11.400><c> where</c><00:00:12.120><c> you</c><00:00:12.300><c> put</c><00:00:12.480><c> your</c><00:00:12.780><c> phone</c><00:00:13.080><c> to</c><00:00:13.980><c> send</c>
a word where you put your phone to send
 
a word where you put your phone to send
an<00:00:14.460><c> email</c><00:00:14.900><c> an</c><00:00:15.900><c> online</c><00:00:16.139><c> password</c>
an email an online password
 
an email an online password
to<00:00:18.119><c> buy</c><00:00:18.300><c> toothpaste</c>
to buy toothpaste
 
to buy toothpaste
why<00:00:20.220><c> you</c><00:00:20.460><c> walked</c><00:00:20.699><c> into</c><00:00:20.820><c> a</c><00:00:21.180><c> room</c>
why you walked into a room
 
why you walked into a room
in<00:00:23.160><c> each</c><00:00:23.400><c> of</c><00:00:23.520><c> these</c><00:00:23.699><c> moments</c><00:00:24.119><c> how</c><00:00:24.300><c> did</c><00:00:24.480><c> you</c>
in each of these moments how did you
 
in each of these moments how did you
feel
feel
 
feel
worried<00:00:26.660><c> afraid</c>
worried afraid
 
worried afraid
embarrassed<00:00:29.480><c> ashamed</c><00:00:30.480><c> did</c><00:00:31.439><c> you</c><00:00:31.560><c> judge</c>
embarrassed ashamed did you judge
 
embarrassed ashamed did you judge
yourself
yourself
 
yourself
did<00:00:33.719><c> your</c><00:00:33.960><c> inner</c><00:00:34.320><c> voice</c><00:00:34.440><c> say</c><00:00:34.800><c> something</c><00:00:35.100><c> like</c>
did your inner voice say something like
 
did your inner voice say something like
ah<00:00:36.480><c> I</c><00:00:37.020><c> have</c><00:00:37.200><c> such</c><00:00:37.440><c> a</c><00:00:37.620><c> terrible</c><00:00:37.920><c> memory</c>
ah I have such a terrible memory
 
ah I have such a terrible memory
I'm<00:00:39.840><c> betting</c><00:00:40.140><c> many</c><00:00:40.379><c> of</c><00:00:40.620><c> you</c><00:00:40.739><c> carry</c><00:00:41.160><c> this</c><00:00:41.399><c> false</c>
I'm betting many of you carry this false
 
I'm betting many of you carry this false
belief<00:00:42.059><c> that</c><00:00:42.360><c> memory</c><00:00:42.780><c> is</c><00:00:42.899><c> supposed</c><00:00:43.140><c> to</c><00:00:43.379><c> be</c>
belief that memory is supposed to be
 
belief that memory is supposed to be
perfect<00:00:43.980><c> that</c><00:00:44.879><c> we're</c><00:00:45.059><c> supposed</c><00:00:45.239><c> to</c><00:00:45.420><c> remember</c>
perfect that we're supposed to remember
 
perfect that we're supposed to remember
everything<00:00:46.520><c> and</c><00:00:47.520><c> so</c><00:00:47.700><c> when</c><00:00:47.879><c> you</c><00:00:48.000><c> forget</c>
everything and so when you forget
 
everything and so when you forget
anything<00:00:48.960><c> you</c><00:00:49.860><c> think</c><00:00:50.039><c> it's</c><00:00:50.219><c> a</c><00:00:50.399><c> sign</c><00:00:50.579><c> of</c>
anything you think it's a sign of
 
anything you think it's a sign of
weakness<00:00:51.320><c> aging</c><00:00:52.320><c> or</c><00:00:52.800><c> maybe</c><00:00:52.980><c> even</c><00:00:53.280><c> the</c>
weakness aging or maybe even the
 
weakness aging or maybe even the
beginning<00:00:53.640><c> of</c><00:00:54.000><c> Alzheimer's</c>
beginning of Alzheimer's
 
beginning of Alzheimer's
you<00:00:56.219><c> think</c><00:00:56.460><c> something</c><00:00:57.239><c> must</c><00:00:57.539><c> be</c><00:00:57.719><c> wrong</c><00:00:57.960><c> with</c>
you think something must be wrong with
 
you think something must be wrong with
me
me
 
me
but<00:00:59.760><c> here's</c><00:01:00.120><c> what</c><00:01:00.239><c> I</c><00:01:00.420><c> want</c><00:01:00.539><c> you</c><00:01:00.660><c> to</c><00:01:00.840><c> know</c><00:01:01.020><c> our</c>
but here's what I want you to know our
 
but here's what I want you to know our
brains<00:01:02.100><c> are</c><00:01:02.280><c> not</c><00:01:02.520><c> designed</c><00:01:03.180><c> to</c><00:01:03.660><c> remember</c>
brains are not designed to remember
 
brains are not designed to remember
people's<00:01:04.440><c> names</c><00:01:04.739><c> to</c><00:01:05.519><c> do</c><00:01:05.700><c> something</c><00:01:05.939><c> later</c><00:01:06.420><c> or</c>
people's names to do something later or
 
people's names to do something later or
to<00:01:07.560><c> catalog</c><00:01:08.040><c> everything</c><00:01:08.520><c> we</c><00:01:08.880><c> encounter</c>
to catalog everything we encounter
 
to catalog everything we encounter
these<00:01:10.680><c> imperfections</c><00:01:11.400><c> are</c><00:01:11.700><c> simply</c><00:01:12.000><c> the</c>
these imperfections are simply the
 
these imperfections are simply the
factory<00:01:12.540><c> settings</c>
factory settings
 
factory settings
there's<00:01:14.460><c> a</c><00:01:14.760><c> reason</c><00:01:15.000><c> that</c><00:01:15.360><c> you</c><00:01:15.540><c> can</c><00:01:15.659><c> remember</c>
there's a reason that you can remember
 
there's a reason that you can remember
every<00:01:16.680><c> word</c><00:01:16.979><c> to</c><00:01:17.280><c> Hey</c><00:01:17.460><c> Jude</c><00:01:17.820><c> by</c><00:01:18.000><c> the</c><00:01:18.180><c> Beatles</c>
every word to Hey Jude by the Beatles
 
every word to Hey Jude by the Beatles
and<00:01:19.619><c> can</c><00:01:19.920><c> forget</c><00:01:20.159><c> why</c><00:01:20.640><c> you</c><00:01:20.820><c> walked</c><00:01:21.060><c> into</c><00:01:21.180><c> your</c>
and can forget why you walked into your
 
and can forget why you walked into your
living<00:01:21.659><c> room</c><00:01:22.040><c> or</c><00:01:23.040><c> that</c><00:01:23.159><c> you</c><00:01:23.400><c> can</c><00:01:23.460><c> still</c>
living room or that you can still
 
living room or that you can still
remember<00:01:23.880><c> the</c><00:01:24.299><c> Hamlet</c><00:01:24.659><c> Soliloquy</c><00:01:25.259><c> you</c>
remember the Hamlet Soliloquy you
 
remember the Hamlet Soliloquy you
memorized<00:01:26.100><c> in</c><00:01:26.280><c> 10th</c><00:01:26.700><c> Grade</c><00:01:26.840><c> but</c><00:01:27.840><c> forget</c><00:01:28.020><c> what</c>
memorized in 10th Grade but forget what
 
memorized in 10th Grade but forget what
your<00:01:28.560><c> spouse</c><00:01:28.860><c> told</c><00:01:29.159><c> you</c><00:01:29.400><c> five</c><00:01:29.820><c> minutes</c><00:01:30.119><c> ago</c>
your spouse told you five minutes ago
 
your spouse told you five minutes ago
I<00:01:31.740><c> want</c><00:01:31.860><c> to</c><00:01:32.040><c> help</c><00:01:32.159><c> you</c><00:01:32.340><c> develop</c><00:01:32.820><c> a</c><00:01:33.060><c> healthier</c>
I want to help you develop a healthier
 
I want to help you develop a healthier
relationship<00:01:34.020><c> with</c><00:01:34.380><c> your</c><00:01:34.560><c> memory</c>
relationship with your memory
 
relationship with your memory
I'm<00:01:35.939><c> going</c><00:01:36.119><c> to</c><00:01:36.240><c> show</c><00:01:36.479><c> you</c><00:01:36.600><c> how</c><00:01:37.200><c> our</c><00:01:37.380><c> brains</c>
I'm going to show you how our brains
 
I'm going to show you how our brains
remember
remember
 
remember
you'll<00:01:39.780><c> learn</c><00:01:40.020><c> tools</c><00:01:40.500><c> and</c><00:01:40.680><c> hacks</c><00:01:41.040><c> to</c>
you'll learn tools and hacks to
 
you'll learn tools and hacks to
strengthen<00:01:41.880><c> memory</c><00:01:42.299><c> creation</c><00:01:42.780><c> and</c><00:01:43.079><c> retrieval</c>
strengthen memory creation and retrieval
 
strengthen memory creation and retrieval
and<00:01:44.220><c> tips</c><00:01:44.520><c> to</c><00:01:44.820><c> improve</c><00:01:45.240><c> your</c><00:01:45.540><c> brain</c><00:01:45.720><c> health</c><00:01:45.960><c> at</c>
and tips to improve your brain health at
 
and tips to improve your brain health at
any<00:01:47.100><c> age</c>
any age
 
any age
and<00:01:48.840><c> I</c><00:01:49.020><c> want</c><00:01:49.140><c> to</c><00:01:49.259><c> help</c><00:01:49.439><c> you</c><00:01:49.680><c> shatter</c><00:01:50.100><c> this</c>
and I want to help you shatter this
 
and I want to help you shatter this
false<00:01:50.820><c> belief</c><00:01:51.119><c> that</c><00:01:51.299><c> your</c><00:01:51.540><c> brain</c><00:01:51.659><c> is</c><00:01:51.840><c> supposed</c>
false belief that your brain is supposed
 
false belief that your brain is supposed
to<00:01:52.259><c> remember</c><00:01:52.500><c> everything</c>
to remember everything
 
to remember everything
you'll<00:01:54.360><c> learn</c><00:01:54.600><c> why</c><00:01:55.079><c> we</c><00:01:55.380><c> forget</c><00:01:55.640><c> and</c><00:01:56.640><c> that</c><00:01:56.820><c> most</c>
you'll learn why we forget and that most
 
you'll learn why we forget and that most
of<00:01:57.240><c> what</c><00:01:57.360><c> we</c><00:01:57.540><c> forget</c><00:01:57.720><c> every</c><00:01:58.200><c> day</c><00:01:58.439><c> is</c><00:01:59.280><c> actually</c>
of what we forget every day is actually
 
of what we forget every day is actually
a<00:02:00.060><c> normal</c><00:02:00.240><c> part</c><00:02:00.659><c> of</c><00:02:00.960><c> Being</c><00:02:01.200><c> Human</c>
a normal part of Being Human
 
a normal part of Being Human
I'm<00:02:02.759><c> Lisa</c><00:02:03.119><c> Genova</c><00:02:03.720><c> welcome</c><00:02:04.560><c> to</c><00:02:04.799><c> how</c><00:02:05.040><c> to</c><00:02:05.219><c> boost</c>
I'm Lisa Genova welcome to how to boost
 
I'm Lisa Genova welcome to how to boost
your<00:02:05.700><c> brain</c><00:02:06.060><c> and</c><00:02:06.479><c> memory</c>
Kind: captions
Language: en
 
self-centeredness<00:00:07.440><c> is</c><00:00:08.340><c> not</c><00:00:08.639><c> a</c><00:00:08.880><c> positive</c>
self-centeredness is not a positive
 
self-centeredness is not a positive
quality<00:00:09.660><c> to</c><00:00:09.960><c> possess</c><00:00:10.700><c> except</c><00:00:11.700><c> when</c><00:00:12.000><c> it</c><00:00:12.179><c> comes</c>
quality to possess except when it comes
 
quality to possess except when it comes
to<00:00:12.660><c> memory</c><00:00:13.500><c> you</c><00:00:14.099><c> remember</c><00:00:14.280><c> more</c><00:00:14.940><c> when</c><00:00:15.660><c> it's</c>
to memory you remember more when it's
 
to memory you remember more when it's
about<00:00:16.020><c> you</c>
about you
 
about you
attach<00:00:18.060><c> your</c><00:00:18.480><c> personal</c><00:00:18.720><c> opinions</c><00:00:19.640><c> stories</c>
attach your personal opinions stories
 
attach your personal opinions stories
and<00:00:21.119><c> history</c><00:00:21.480><c> to</c><00:00:22.320><c> whatever</c><00:00:22.619><c> you're</c><00:00:23.039><c> learning</c>
and history to whatever you're learning
 
and history to whatever you're learning
and<00:00:24.119><c> you'll</c><00:00:24.359><c> be</c><00:00:24.539><c> more</c><00:00:24.840><c> likely</c><00:00:25.140><c> to</c><00:00:25.320><c> remember</c><00:00:25.500><c> it</c>
and you'll be more likely to remember it
 
and you'll be more likely to remember it
for<00:00:27.180><c> example</c><00:00:27.539><c> let's</c><00:00:28.260><c> say</c><00:00:28.439><c> I'm</c><00:00:28.680><c> at</c><00:00:28.859><c> a</c><00:00:29.039><c> party</c><00:00:29.160><c> and</c>
for example let's say I'm at a party and
 
for example let's say I'm at a party and
I<00:00:30.000><c> meet</c><00:00:30.180><c> a</c><00:00:30.359><c> man</c><00:00:30.480><c> who</c><00:00:30.779><c> introduces</c><00:00:31.260><c> himself</c><00:00:31.619><c> as</c>
I meet a man who introduces himself as
 
I meet a man who introduces himself as
Antonio<00:00:32.540><c> this</c><00:00:33.540><c> name</c><00:00:33.719><c> by</c><00:00:34.079><c> itself</c><00:00:34.440><c> is</c><00:00:34.860><c> an</c>
Antonio this name by itself is an
 
Antonio this name by itself is an
abstract<00:00:35.460><c> concept</c><00:00:36.559><c> one-dimensional</c>
abstract concept one-dimensional
 
abstract concept one-dimensional
impersonal<00:00:38.760><c> and</c><00:00:39.660><c> therefore</c><00:00:40.079><c> not</c><00:00:40.559><c> memorable</c>
impersonal and therefore not memorable
 
impersonal and therefore not memorable
if<00:00:42.300><c> I</c><00:00:42.540><c> do</c><00:00:42.660><c> nothing</c><00:00:42.960><c> my</c><00:00:43.800><c> brain</c><00:00:44.040><c> is</c><00:00:44.219><c> likely</c><00:00:44.579><c> to</c>
if I do nothing my brain is likely to
 
if I do nothing my brain is likely to
forget<00:00:44.940><c> his</c><00:00:45.360><c> name</c><00:00:45.600><c> but</c><00:00:46.440><c> if</c><00:00:46.620><c> I</c><00:00:46.860><c> can</c><00:00:47.040><c> link</c><00:00:47.280><c> his</c>
forget his name but if I can link his
 
forget his name but if I can link his
name<00:00:47.879><c> to</c><00:00:48.480><c> some</c><00:00:48.780><c> personal</c><00:00:49.079><c> associations</c><00:00:50.039><c> I'll</c>
name to some personal associations I'll
 
name to some personal associations I'll
strengthen<00:00:51.539><c> the</c><00:00:51.780><c> formation</c><00:00:52.200><c> and</c><00:00:52.620><c> retrieval</c>
strengthen the formation and retrieval
 
strengthen the formation and retrieval
of<00:00:53.340><c> this</c><00:00:53.520><c> memory</c>
of this memory
 
of this memory
one<00:00:55.320><c> of</c><00:00:55.500><c> my</c><00:00:55.739><c> favorite</c><00:00:56.120><c> neuroscientists</c><00:00:57.120><c> is</c>
one of my favorite neuroscientists is
 
one of my favorite neuroscientists is
Antonio<00:00:57.899><c> dimasio</c>
Antonio dimasio
 
Antonio dimasio
one<00:01:00.660><c> of</c><00:01:00.780><c> my</c><00:01:01.020><c> father's</c><00:01:01.440><c> favorite</c><00:01:01.680><c> movies</c><00:01:02.039><c> is</c>
one of my father's favorite movies is
 
one of my father's favorite movies is
Zorro<00:01:03.000><c> starring</c><00:01:03.840><c> Antonio</c><00:01:04.260><c> Banderas</c>
Zorro starring Antonio Banderas
 
Zorro starring Antonio Banderas
I<00:01:06.659><c> can</c><00:01:06.840><c> quickly</c><00:01:07.140><c> picture</c><00:01:07.500><c> this</c><00:01:08.040><c> guy</c><00:01:08.340><c> in</c><00:01:09.000><c> a</c>
I can quickly picture this guy in a
 
I can quickly picture this guy in a
black<00:01:09.420><c> hat</c><00:01:09.720><c> and</c><00:01:09.960><c> mask</c><00:01:10.280><c> reading</c><00:01:11.280><c> a</c><00:01:11.460><c> copy</c><00:01:11.820><c> of</c>
black hat and mask reading a copy of
 
black hat and mask reading a copy of
Descartes<00:01:12.900><c> error</c><00:01:13.799><c> I've</c><00:01:14.400><c> made</c><00:01:14.640><c> Antonio's</c><00:01:15.479><c> name</c>
Descartes error I've made Antonio's name
 
Descartes error I've made Antonio's name
about<00:01:15.960><c> me</c><00:01:16.560><c> and</c><00:01:17.340><c> so</c><00:01:17.580><c> now</c><00:01:17.880><c> I'll</c><00:01:18.240><c> remember</c><00:01:18.479><c> it</c>
Kind: captions
Language: en
 
the<00:00:06.839><c> human</c><00:00:07.020><c> stress</c><00:00:07.620><c> response</c><00:00:08.360><c> mobilizes</c><00:00:09.360><c> the</c>
the human stress response mobilizes the
 
the human stress response mobilizes the
brain<00:00:09.780><c> and</c><00:00:09.960><c> body</c><00:00:10.139><c> to</c><00:00:10.500><c> react</c><00:00:10.800><c> to</c><00:00:10.980><c> an</c><00:00:11.219><c> immediate</c>
brain and body to react to an immediate
 
brain and body to react to an immediate
threat<00:00:11.820><c> or</c><00:00:12.000><c> Challenge</c><00:00:12.300><c> and</c><00:00:13.139><c> it</c><00:00:13.320><c> isn't</c><00:00:13.620><c> bad</c><00:00:13.799><c> for</c>
threat or Challenge and it isn't bad for
 
threat or Challenge and it isn't bad for
you<00:00:14.219><c> you</c><00:00:15.120><c> actually</c><00:00:15.360><c> need</c><00:00:15.839><c> the</c><00:00:16.080><c> stress</c>
you you actually need the stress
 
you you actually need the stress
response<00:00:16.859><c> to</c><00:00:17.160><c> function</c><00:00:17.400><c> normally</c><00:00:17.880><c> every</c><00:00:18.300><c> day</c>
response to function normally every day
 
response to function normally every day
to<00:00:20.100><c> lead</c><00:00:20.220><c> today's</c><00:00:20.520><c> Zoom</c><00:00:21.000><c> meeting</c><00:00:21.240><c> or</c><00:00:21.779><c> hit</c><00:00:21.960><c> the</c>
to lead today's Zoom meeting or hit the
 
to lead today's Zoom meeting or hit the
brakes<00:00:22.439><c> when</c><00:00:22.680><c> the</c><00:00:22.859><c> car</c><00:00:22.920><c> in</c><00:00:23.160><c> front</c><00:00:23.279><c> of</c><00:00:23.400><c> you</c>
brakes when the car in front of you
 
brakes when the car in front of you
unexpectedly<00:00:24.300><c> stops</c>
unexpectedly stops
 
unexpectedly stops
but<00:00:26.340><c> chronic</c><00:00:26.880><c> psychological</c><00:00:27.720><c> stress</c><00:00:28.260><c> can</c><00:00:28.859><c> be</c>
but chronic psychological stress can be
 
but chronic psychological stress can be
damaging<00:00:29.580><c> to</c><00:00:29.820><c> your</c><00:00:30.119><c> brain</c><00:00:30.420><c> and</c><00:00:30.660><c> memory</c>
damaging to your brain and memory
 
damaging to your brain and memory
chronic<00:00:32.160><c> stress</c><00:00:32.520><c> inhibits</c><00:00:33.180><c> your</c><00:00:33.360><c> prefrontal</c>
chronic stress inhibits your prefrontal
 
chronic stress inhibits your prefrontal
cortex<00:00:34.520><c> impairing</c><00:00:35.520><c> your</c><00:00:35.700><c> ability</c><00:00:36.000><c> to</c><00:00:36.360><c> think</c>
cortex impairing your ability to think
 
cortex impairing your ability to think
under<00:00:37.980><c> acute</c><00:00:38.399><c> stress</c><00:00:38.880><c> this</c><00:00:39.540><c> is</c><00:00:39.719><c> helpful</c>
under acute stress this is helpful
 
under acute stress this is helpful
allowing<00:00:41.160><c> you</c><00:00:41.280><c> to</c><00:00:41.520><c> react</c><00:00:41.820><c> immediately</c><00:00:42.420><c> which</c>
allowing you to react immediately which
 
allowing you to react immediately which
is<00:00:43.500><c> great</c><00:00:43.739><c> if</c><00:00:44.040><c> you</c><00:00:44.160><c> have</c><00:00:44.280><c> to</c><00:00:44.399><c> run</c><00:00:44.579><c> away</c><00:00:44.820><c> from</c><00:00:45.120><c> a</c>
is great if you have to run away from a
 
is great if you have to run away from a
lion<00:00:45.480><c> right</c><00:00:46.079><c> this</c><00:00:46.379><c> second</c><00:00:46.700><c> but</c><00:00:47.700><c> under</c><00:00:47.940><c> chronic</c>
lion right this second but under chronic
 
lion right this second but under chronic
stress<00:00:48.960><c> you're</c><00:00:49.260><c> going</c><00:00:49.440><c> to</c><00:00:49.559><c> feel</c><00:00:49.739><c> cognitively</c>
stress you're going to feel cognitively
 
stress you're going to feel cognitively
foggy<00:00:51.059><c> you're</c><00:00:51.899><c> going</c><00:00:52.079><c> to</c><00:00:52.200><c> have</c><00:00:52.379><c> trouble</c>
foggy you're going to have trouble
 
foggy you're going to have trouble
creating<00:00:53.280><c> new</c><00:00:53.700><c> memories</c><00:00:54.180><c> and</c><00:00:54.780><c> retrieving</c>
creating new memories and retrieving
 
creating new memories and retrieving
what<00:00:55.620><c> you</c><00:00:55.800><c> already</c><00:00:55.980><c> know</c>
what you already know
 
what you already know
you<00:00:57.780><c> could</c><00:00:57.899><c> also</c><00:00:58.260><c> start</c><00:00:58.500><c> losing</c><00:00:59.039><c> neurons</c><00:00:59.579><c> in</c>
you could also start losing neurons in
 
you could also start losing neurons in
your<00:01:00.300><c> hippocampus</c>
your hippocampus
 
your hippocampus
neurogenesis<00:01:02.879><c> which</c><00:01:03.480><c> is</c><00:01:03.600><c> the</c><00:01:03.840><c> growth</c><00:01:04.080><c> of</c><00:01:04.260><c> new</c>
neurogenesis which is the growth of new
 
neurogenesis which is the growth of new
neurons<00:01:04.920><c> occurs</c><00:01:05.820><c> throughout</c><00:01:06.299><c> your</c><00:01:06.720><c> life</c><00:01:07.020><c> in</c>
neurons occurs throughout your life in
 
neurons occurs throughout your life in
your<00:01:07.740><c> hippocampus</c>
your hippocampus
 
your hippocampus
but<00:01:09.780><c> chronic</c><00:01:10.260><c> stress</c><00:01:10.799><c> inhibits</c><00:01:11.520><c> neurogenesis</c>
but chronic stress inhibits neurogenesis
 
but chronic stress inhibits neurogenesis
in<00:01:12.540><c> the</c><00:01:12.659><c> hippocampus</c><00:01:13.380><c> which</c><00:01:14.159><c> if</c><00:01:14.640><c> unchecked</c>
in the hippocampus which if unchecked
 
in the hippocampus which if unchecked
can<00:01:15.720><c> lead</c><00:01:15.900><c> to</c><00:01:16.200><c> a</c><00:01:16.560><c> smaller</c><00:01:16.860><c> hippocampus</c>
can lead to a smaller hippocampus
 
can lead to a smaller hippocampus
smaller<00:01:19.200><c> hippocampus</c><00:01:19.860><c> means</c><00:01:20.159><c> fewer</c><00:01:20.580><c> neurons</c>
smaller hippocampus means fewer neurons
 
smaller hippocampus means fewer neurons
available<00:01:21.360><c> to</c><00:01:21.720><c> do</c><00:01:21.840><c> the</c><00:01:22.080><c> job</c><00:01:22.380><c> of</c><00:01:23.040><c> creating</c><00:01:23.400><c> new</c>
available to do the job of creating new
 
available to do the job of creating new
memories
memories
 
memories
chronic<00:01:25.680><c> stress</c><00:01:26.040><c> also</c><00:01:26.520><c> seems</c><00:01:26.820><c> to</c><00:01:26.880><c> make</c><00:01:27.000><c> our</c>
chronic stress also seems to make our
 
chronic stress also seems to make our
brains<00:01:27.600><c> more</c><00:01:27.840><c> vulnerable</c><00:01:28.259><c> to</c><00:01:28.560><c> Alzheimer's</c>
brains more vulnerable to Alzheimer's
 
brains more vulnerable to Alzheimer's
disease
disease
 
disease
but<00:01:31.259><c> the</c><00:01:31.500><c> world</c><00:01:31.619><c> we</c><00:01:31.979><c> live</c><00:01:32.280><c> in</c><00:01:32.460><c> is</c><00:01:33.180><c> relentlessly</c>
but the world we live in is relentlessly
 
but the world we live in is relentlessly
stressful<00:01:34.560><c> so</c><00:01:35.520><c> what</c><00:01:35.700><c> can</c><00:01:35.820><c> we</c><00:01:36.000><c> do</c>
stressful so what can we do
 
stressful so what can we do
while<00:01:37.619><c> we</c><00:01:37.920><c> can't</c><00:01:38.159><c> necessarily</c><00:01:38.880><c> extricate</c>
while we can't necessarily extricate
 
while we can't necessarily extricate
ourselves<00:01:39.840><c> from</c><00:01:40.140><c> the</c><00:01:40.259><c> stressful</c><00:01:40.619><c> world</c><00:01:40.860><c> we</c>
ourselves from the stressful world we
 
ourselves from the stressful world we
live<00:01:41.400><c> in</c><00:01:41.579><c> we</c><00:01:42.420><c> can</c><00:01:42.600><c> dramatically</c><00:01:43.200><c> influence</c>
live in we can dramatically influence
 
live in we can dramatically influence
our<00:01:43.979><c> brain's</c><00:01:44.340><c> response</c><00:01:44.820><c> to</c><00:01:45.119><c> it</c><00:01:45.680><c> yoga</c>
our brain's response to it yoga
 
our brain's response to it yoga
meditation<00:01:47.659><c> breathing</c><00:01:48.659><c> exercises</c><00:01:49.439><c> and</c>
meditation breathing exercises and
 
meditation breathing exercises and
practices<00:01:50.579><c> in</c><00:01:50.880><c> mindfulness</c><00:01:51.420><c> have</c><00:01:52.020><c> been</c><00:01:52.200><c> shown</c>
practices in mindfulness have been shown
 
practices in mindfulness have been shown
to<00:01:52.680><c> protect</c><00:01:53.159><c> against</c><00:01:53.460><c> stress-induced</c>
to protect against stress-induced
 
to protect against stress-induced
Amnesia<00:01:54.960><c> by</c><00:01:55.500><c> reducing</c><00:01:55.979><c> chronically</c><00:01:56.460><c> elevated</c>
Amnesia by reducing chronically elevated
 
Amnesia by reducing chronically elevated
blood<00:01:57.299><c> pressure</c><00:01:57.799><c> inflammation</c><00:01:58.939><c> anxiety</c><00:01:59.939><c> and</c>
blood pressure inflammation anxiety and
 
blood pressure inflammation anxiety and
cortisol<00:02:00.960><c> levels</c>
cortisol levels
 
cortisol levels
meditation<00:02:03.540><c> has</c><00:02:03.960><c> also</c><00:02:04.200><c> been</c><00:02:04.380><c> shown</c><00:02:04.619><c> to</c>
meditation has also been shown to
 
meditation has also been shown to
enhance<00:02:05.600><c> neurogenesis</c><00:02:06.600><c> in</c><00:02:06.899><c> your</c><00:02:07.020><c> hippocampus</c>
enhance neurogenesis in your hippocampus
 
enhance neurogenesis in your hippocampus
if<00:02:08.880><c> chronic</c><00:02:09.300><c> stresses</c><00:02:09.780><c> the</c><00:02:10.080><c> evil</c><00:02:10.440><c> villain</c>
if chronic stresses the evil villain
 
if chronic stresses the evil villain
shrinking<00:02:11.459><c> your</c><00:02:11.580><c> hippocampus</c><00:02:12.300><c> then</c>
shrinking your hippocampus then
 
shrinking your hippocampus then
meditation<00:02:13.560><c> is</c><00:02:13.920><c> the</c><00:02:14.220><c> superhero</c><00:02:14.940><c> saving</c><00:02:15.420><c> it</c>
meditation is the superhero saving it
 
meditation is the superhero saving it
in<00:02:17.280><c> one</c><00:02:17.459><c> study</c><00:02:17.819><c> part</c><00:02:18.480><c> of</c><00:02:18.660><c> the</c><00:02:18.780><c> hippocampus</c><00:02:19.500><c> in</c>
in one study part of the hippocampus in
 
in one study part of the hippocampus in
the<00:02:19.860><c> brains</c><00:02:20.220><c> of</c><00:02:20.340><c> people</c><00:02:20.580><c> who</c><00:02:21.000><c> practice</c>
the brains of people who practice
 
the brains of people who practice
mindfulness<00:02:21.959><c> for</c><00:02:22.319><c> eight</c><00:02:22.560><c> weeks</c><00:02:22.920><c> with</c>
mindfulness for eight weeks with
 
mindfulness for eight weeks with
significantly<00:02:24.300><c> bigger</c><00:02:24.959><c> than</c><00:02:25.379><c> it</c><00:02:25.560><c> was</c><00:02:25.739><c> before</c>
significantly bigger than it was before
 
significantly bigger than it was before
these<00:02:26.400><c> people</c><00:02:26.520><c> began</c><00:02:27.000><c> this</c><00:02:27.300><c> daily</c><00:02:27.540><c> practice</c>
these people began this daily practice
 
these people began this daily practice
age-matched<00:02:30.120><c> folks</c><00:02:30.540><c> who</c><00:02:31.020><c> did</c><00:02:31.200><c> not</c><00:02:31.379><c> practice</c>
age-matched folks who did not practice
 
age-matched folks who did not practice
mindfulness<00:02:32.459><c> at</c><00:02:32.700><c> all</c><00:02:32.879><c> showed</c><00:02:33.840><c> no</c><00:02:34.140><c> change</c><00:02:34.379><c> in</c>
mindfulness at all showed no change in
 
mindfulness at all showed no change in
the<00:02:34.800><c> size</c><00:02:34.920><c> of</c><00:02:35.160><c> their</c><00:02:35.340><c> hippocampus</c>
the size of their hippocampus
 
the size of their hippocampus
similar<00:02:37.620><c> results</c><00:02:37.860><c> have</c><00:02:38.340><c> been</c><00:02:38.520><c> found</c><00:02:38.760><c> in</c><00:02:39.000><c> those</c>
similar results have been found in those
 
similar results have been found in those
who<00:02:39.540><c> regularly</c><00:02:40.140><c> exercise</c>
who regularly exercise
 
who regularly exercise
if<00:02:42.360><c> meditation</c><00:02:42.840><c> is</c><00:02:43.260><c> a</c><00:02:43.500><c> superhero</c><00:02:44.239><c> exercise</c>
if meditation is a superhero exercise
 
if meditation is a superhero exercise
also<00:02:46.200><c> deserves</c><00:02:46.680><c> a</c><00:02:46.860><c> cape</c><00:02:47.220><c> one</c><00:02:48.060><c> last</c><00:02:48.239><c> note</c>
also deserves a cape one last note
 
also deserves a cape one last note
social<00:02:49.620><c> isolation</c><00:02:50.340><c> is</c><00:02:50.940><c> a</c><00:02:51.120><c> known</c><00:02:51.300><c> risk</c><00:02:51.780><c> factor</c>
social isolation is a known risk factor
 
social isolation is a known risk factor
for<00:02:52.379><c> Alzheimer's</c><00:02:53.180><c> possibly</c><00:02:54.180><c> by</c><00:02:54.480><c> way</c><00:02:54.720><c> of</c><00:02:54.900><c> being</c>
for Alzheimer's possibly by way of being
 
for Alzheimer's possibly by way of being
a<00:02:55.500><c> chronic</c><00:02:55.739><c> psychological</c><00:02:56.400><c> stressor</c>
a chronic psychological stressor
 
a chronic psychological stressor
staying<00:02:58.620><c> socially</c><00:02:58.980><c> connected</c><00:02:59.519><c> with</c><00:03:00.239><c> family</c>
staying socially connected with family
 
staying socially connected with family
and<00:03:00.900><c> friends</c><00:03:01.140><c> can</c><00:03:01.860><c> alleviate</c><00:03:02.459><c> the</c><00:03:02.760><c> stress</c><00:03:03.180><c> and</c>
and friends can alleviate the stress and
 
and friends can alleviate the stress and
reduce<00:03:03.840><c> your</c><00:03:04.200><c> risk</c><00:03:04.500><c> of</c><00:03:04.680><c> developing</c><00:03:05.220><c> dementia</c>
Kind: captions
Language: en
 
as<00:00:07.379><c> humans</c><00:00:07.799><c> evolved</c><00:00:08.340><c> it</c><00:00:08.940><c> was</c><00:00:09.120><c> pretty</c>
as humans evolved it was pretty
 
as humans evolved it was pretty
essential<00:00:10.019><c> for</c><00:00:10.380><c> survival</c><00:00:10.860><c> to</c><00:00:11.639><c> pay</c><00:00:11.820><c> attention</c>
essential for survival to pay attention
 
essential for survival to pay attention
to<00:00:12.540><c> and</c><00:00:13.080><c> remember</c><00:00:13.380><c> where</c><00:00:13.920><c> the</c><00:00:14.099><c> food</c><00:00:14.219><c> was</c>
to and remember where the food was
 
to and remember where the food was
located<00:00:14.839><c> where</c><00:00:15.839><c> to</c><00:00:16.020><c> find</c><00:00:16.199><c> safety</c><00:00:16.800><c> and</c><00:00:17.400><c> where</c>
located where to find safety and where
 
located where to find safety and where
the<00:00:17.940><c> Predators</c><00:00:18.300><c> lurked</c><00:00:18.859><c> your</c><00:00:19.859><c> modern</c><00:00:20.039><c> day</c>
the Predators lurked your modern day
 
the Predators lurked your modern day
brain<00:00:20.760><c> has</c><00:00:21.060><c> evolved</c><00:00:21.600><c> to</c><00:00:21.779><c> be</c><00:00:21.960><c> able</c><00:00:22.140><c> to</c>
brain has evolved to be able to
 
brain has evolved to be able to
visualize<00:00:23.039><c> and</c><00:00:23.640><c> remember</c><00:00:24.000><c> where</c><00:00:24.960><c> things</c><00:00:25.199><c> are</c>
visualize and remember where things are
 
visualize and remember where things are
located<00:00:25.800><c> in</c><00:00:26.340><c> space</c><00:00:26.640><c> and</c><00:00:27.420><c> so</c><00:00:27.599><c> you</c><00:00:27.840><c> can</c><00:00:28.019><c> tap</c><00:00:28.320><c> into</c>
located in space and so you can tap into
 
located in space and so you can tap into
your<00:00:28.920><c> brain's</c><00:00:29.340><c> innate</c><00:00:29.760><c> affinity</c><00:00:30.240><c> for</c>
your brain's innate affinity for
 
your brain's innate affinity for
remembering<00:00:31.439><c> where</c><00:00:31.800><c> something</c><00:00:32.040><c> is</c><00:00:32.399><c> located</c>
remembering where something is located
 
remembering where something is located
to<00:00:33.660><c> enhance</c><00:00:34.079><c> your</c><00:00:34.380><c> memory</c>
to enhance your memory
 
to enhance your memory
for<00:00:35.940><c> example</c><00:00:36.300><c> let's</c><00:00:37.200><c> say</c><00:00:37.380><c> I</c><00:00:37.620><c> want</c><00:00:37.800><c> to</c><00:00:37.920><c> remember</c>
for example let's say I want to remember
 
for example let's say I want to remember
to<00:00:38.399><c> call</c><00:00:38.640><c> my</c><00:00:38.880><c> mother</c><00:00:39.059><c> and</c><00:00:39.660><c> to</c><00:00:39.840><c> buy</c><00:00:40.020><c> toothpaste</c>
to call my mother and to buy toothpaste
 
to call my mother and to buy toothpaste
I<00:00:41.579><c> can</c><00:00:41.760><c> use</c><00:00:42.000><c> a</c><00:00:42.239><c> technique</c><00:00:42.540><c> called</c><00:00:42.899><c> Memory</c>
I can use a technique called Memory
 
I can use a technique called Memory
Palace<00:00:43.980><c> and</c><00:00:44.700><c> designate</c><00:00:45.180><c> a</c><00:00:45.360><c> set</c><00:00:45.540><c> of</c><00:00:45.719><c> familiar</c>
Palace and designate a set of familiar
 
Palace and designate a set of familiar
locations<00:00:46.620><c> in</c><00:00:46.800><c> my</c><00:00:46.980><c> house</c><00:00:47.100><c> as</c><00:00:47.399><c> placeholders</c><00:00:48.120><c> in</c>
locations in my house as placeholders in
 
locations in my house as placeholders in
my<00:00:48.539><c> mind's</c><00:00:48.960><c> eye</c><00:00:49.140><c> to</c><00:00:49.800><c> put</c><00:00:49.920><c> things</c><00:00:50.160><c> I</c><00:00:50.399><c> want</c><00:00:50.579><c> to</c>
my mind's eye to put things I want to
 
my mind's eye to put things I want to
remember
remember
 
remember
let's<00:00:52.320><c> say</c><00:00:52.559><c> two</c><00:00:52.860><c> of</c><00:00:53.039><c> my</c><00:00:53.219><c> locations</c><00:00:53.700><c> are</c><00:00:53.879><c> the</c>
let's say two of my locations are the
 
let's say two of my locations are the
front<00:00:54.239><c> doorstep</c><00:00:54.780><c> and</c><00:00:55.260><c> my</c><00:00:55.440><c> kitchen</c><00:00:55.620><c> sink</c>
front doorstep and my kitchen sink
 
front doorstep and my kitchen sink
I<00:00:57.000><c> can</c><00:00:57.120><c> place</c><00:00:57.300><c> an</c><00:00:57.539><c> image</c><00:00:57.840><c> of</c><00:00:58.020><c> my</c><00:00:58.260><c> mother</c>
I can place an image of my mother
 
I can place an image of my mother
sitting<00:00:59.280><c> on</c><00:00:59.399><c> my</c><00:00:59.579><c> front</c><00:00:59.699><c> doorstep</c><00:01:00.300><c> she's</c>
sitting on my front doorstep she's
 
sitting on my front doorstep she's
holding<00:01:01.320><c> a</c><00:01:01.559><c> mustard</c><00:01:01.800><c> yellow</c><00:01:01.980><c> kitchen</c><00:01:02.340><c> wall</c>
holding a mustard yellow kitchen wall
 
holding a mustard yellow kitchen wall
phone<00:01:03.000><c> with</c><00:01:03.539><c> a</c><00:01:03.719><c> long</c><00:01:03.840><c> spiral</c><00:01:04.379><c> cord</c>
phone with a long spiral cord
 
phone with a long spiral cord
then<00:01:06.000><c> I</c><00:01:06.240><c> can</c><00:01:06.360><c> picture</c><00:01:06.540><c> Julia</c><00:01:07.080><c> Roberts</c>
then I can picture Julia Roberts
 
then I can picture Julia Roberts
standing<00:01:08.040><c> at</c><00:01:08.220><c> my</c><00:01:08.400><c> kitchen</c><00:01:08.520><c> sink</c><00:01:08.880><c> brushing</c><00:01:09.720><c> her</c>
standing at my kitchen sink brushing her
 
standing at my kitchen sink brushing her
teeth<00:01:10.159><c> again</c><00:01:11.159><c> your</c><00:01:12.000><c> brain</c><00:01:12.240><c> remembers</c><00:01:12.720><c> what</c><00:01:13.020><c> is</c>
teeth again your brain remembers what is
 
teeth again your brain remembers what is
Meaningful<00:01:13.820><c> emotional</c><00:01:14.820><c> surprising</c><00:01:15.600><c> and</c><00:01:15.900><c> new</c>
Meaningful emotional surprising and new
 
Meaningful emotional surprising and new
so<00:01:17.040><c> choose</c><00:01:17.460><c> images</c><00:01:17.760><c> that</c><00:01:18.360><c> are</c><00:01:18.540><c> personal</c><00:01:18.799><c> weird</c>
so choose images that are personal weird
 
so choose images that are personal weird
or<00:01:20.220><c> that</c><00:01:20.340><c> make</c><00:01:20.580><c> you</c><00:01:20.759><c> feel</c><00:01:21.119><c> something</c><00:01:21.680><c> later</c>
or that make you feel something later
 
or that make you feel something later
what<00:01:23.159><c> I</c><00:01:23.340><c> want</c><00:01:23.460><c> to</c><00:01:23.640><c> remember</c><00:01:23.759><c> if</c><00:01:24.240><c> there's</c>
what I want to remember if there's
 
what I want to remember if there's
anything<00:01:24.659><c> else</c><00:01:24.960><c> I</c><00:01:25.140><c> need</c><00:01:25.259><c> to</c><00:01:25.380><c> do</c><00:01:25.560><c> today</c><00:01:25.740><c> I</c><00:01:26.460><c> can</c>
anything else I need to do today I can
 
anything else I need to do today I can
check<00:01:26.759><c> my</c><00:01:27.119><c> locations</c><00:01:27.840><c> when</c><00:01:28.680><c> I</c><00:01:28.860><c> picture</c><00:01:29.040><c> my</c>
check my locations when I picture my
 
check my locations when I picture my
front<00:01:29.580><c> doorstep</c><00:01:30.119><c> I'll</c><00:01:30.780><c> see</c><00:01:31.020><c> my</c><00:01:31.320><c> mother</c>
front doorstep I'll see my mother
 
front doorstep I'll see my mother
sitting<00:01:31.920><c> there</c><00:01:32.100><c> with</c><00:01:32.280><c> the</c><00:01:32.460><c> mustard</c><00:01:32.759><c> yellow</c>
sitting there with the mustard yellow
 
sitting there with the mustard yellow
phone<00:01:33.439><c> Gotta</c><00:01:34.439><c> call</c><00:01:34.560><c> my</c><00:01:34.740><c> mom</c>
phone Gotta call my mom
 
phone Gotta call my mom
and<00:01:36.600><c> when</c><00:01:36.780><c> I</c><00:01:36.900><c> imagine</c><00:01:37.079><c> the</c><00:01:37.439><c> kitchen</c><00:01:37.619><c> sink</c><00:01:37.979><c> I'll</c>
and when I imagine the kitchen sink I'll
 
and when I imagine the kitchen sink I'll
see<00:01:38.820><c> Julia</c><00:01:39.240><c> Roberts</c><00:01:39.720><c> smiling</c><00:01:40.200><c> at</c><00:01:40.380><c> me</c><00:01:40.500><c> while</c>
see Julia Roberts smiling at me while
 
see Julia Roberts smiling at me while
she's<00:01:41.040><c> brushing</c><00:01:41.520><c> her</c><00:01:41.700><c> teeth</c><00:01:41.880><c> and</c><00:01:42.360><c> I'll</c>
she's brushing her teeth and I'll
 
she's brushing her teeth and I'll
remember<00:01:42.720><c> that</c><00:01:43.020><c> I</c><00:01:43.140><c> need</c><00:01:43.259><c> to</c><00:01:43.500><c> buy</c><00:01:43.619><c> toothpaste</c>
Kind: captions
Language: en
 
with<00:00:07.500><c> focused</c><00:00:07.980><c> practice</c><00:00:08.660><c> sequences</c><00:00:09.660><c> of</c>
with focused practice sequences of
 
with focused practice sequences of
previously<00:00:10.679><c> unrelated</c><00:00:11.460><c> physical</c><00:00:11.760><c> movements</c>
previously unrelated physical movements
 
previously unrelated physical movements
can<00:00:13.019><c> be</c><00:00:13.200><c> linked</c><00:00:13.620><c> together</c><00:00:13.860><c> and</c><00:00:14.759><c> executed</c><00:00:15.299><c> as</c><00:00:15.660><c> a</c>
can be linked together and executed as a
 
can be linked together and executed as a
single<00:00:16.320><c> action</c><00:00:16.760><c> instead</c><00:00:17.760><c> of</c><00:00:17.880><c> as</c><00:00:18.119><c> a</c><00:00:18.300><c> series</c><00:00:18.480><c> of</c>
single action instead of as a series of
 
single action instead of as a series of
separate<00:00:19.199><c> labored</c><00:00:19.740><c> steps</c>
separate labored steps
 
separate labored steps
popular<00:00:21.359><c> culture</c><00:00:21.960><c> calls</c><00:00:22.439><c> this</c><00:00:22.619><c> muscle</c><00:00:22.980><c> memory</c>
popular culture calls this muscle memory
 
popular culture calls this muscle memory
but<00:00:24.119><c> the</c><00:00:24.359><c> term</c><00:00:24.480><c> is</c><00:00:24.720><c> a</c><00:00:24.960><c> misnomer</c><00:00:25.619><c> and</c><00:00:26.160><c> I'm</c><00:00:26.340><c> here</c>
but the term is a misnomer and I'm here
 
but the term is a misnomer and I'm here
to<00:00:26.760><c> restore</c><00:00:27.119><c> credit</c><00:00:27.359><c> to</c><00:00:27.660><c> its</c><00:00:27.900><c> rightful</c><00:00:28.199><c> owner</c>
to restore credit to its rightful owner
 
to restore credit to its rightful owner
your<00:00:29.820><c> body</c><00:00:30.000><c> can</c><00:00:30.240><c> perform</c><00:00:30.420><c> the</c><00:00:30.900><c> Electric</c><00:00:31.080><c> Slide</c>
your body can perform the Electric Slide
 
your body can perform the Electric Slide
once<00:00:32.040><c> you've</c><00:00:32.160><c> learned</c><00:00:32.460><c> the</c><00:00:32.579><c> routine</c><00:00:33.000><c> and</c><00:00:33.719><c> it</c>
once you've learned the routine and it
 
once you've learned the routine and it
might<00:00:34.079><c> feel</c><00:00:34.559><c> as</c><00:00:34.800><c> if</c><00:00:34.980><c> your</c><00:00:35.280><c> arms</c><00:00:35.640><c> and</c><00:00:35.820><c> legs</c>
might feel as if your arms and legs
 
might feel as if your arms and legs
remember<00:00:36.600><c> how</c><00:00:37.079><c> to</c><00:00:37.200><c> do</c><00:00:37.320><c> the</c><00:00:37.559><c> steps</c><00:00:37.920><c> but</c><00:00:38.460><c> the</c>
remember how to do the steps but the
 
remember how to do the steps but the
program<00:00:38.880><c> for</c><00:00:39.239><c> this</c><00:00:39.480><c> choreography</c><00:00:40.140><c> doesn't</c>
program for this choreography doesn't
 
program for this choreography doesn't
live<00:00:40.680><c> in</c><00:00:40.860><c> your</c><00:00:41.040><c> muscles</c><00:00:41.399><c> it's</c><00:00:42.120><c> in</c><00:00:42.420><c> your</c><00:00:42.660><c> brain</c>
live in your muscles it's in your brain
 
live in your muscles it's in your brain
the<00:00:44.399><c> sequence</c><00:00:44.760><c> of</c><00:00:45.059><c> individual</c><00:00:45.660><c> physical</c>
the sequence of individual physical
 
the sequence of individual physical
steps<00:00:46.620><c> that</c><00:00:46.800><c> become</c><00:00:47.160><c> connected</c><00:00:47.760><c> to</c><00:00:48.360><c> make</c><00:00:48.480><c> a</c>
steps that become connected to make a
 
steps that become connected to make a
muscle<00:00:48.899><c> memory</c><00:00:49.379><c> are</c><00:00:49.920><c> linked</c><00:00:50.280><c> together</c><00:00:50.579><c> and</c>
muscle memory are linked together and
 
muscle memory are linked together and
refined<00:00:51.660><c> not</c><00:00:52.320><c> by</c><00:00:52.620><c> the</c><00:00:52.800><c> hippocampus</c><00:00:53.579><c> as</c><00:00:54.120><c> with</c>
refined not by the hippocampus as with
 
refined not by the hippocampus as with
semantic<00:00:55.079><c> and</c><00:00:55.260><c> episodic</c><00:00:55.980><c> memories</c><00:00:56.399><c> but</c><00:00:57.059><c> by</c>
semantic and episodic memories but by
 
semantic and episodic memories but by
your<00:00:57.480><c> basal</c><00:00:57.960><c> ganglia</c><00:00:58.500><c> and</c><00:00:58.980><c> cerebellum</c>
your basal ganglia and cerebellum
 
your basal ganglia and cerebellum
Henry<00:01:01.260><c> malleason</c><00:01:01.860><c> couldn't</c><00:01:02.399><c> make</c><00:01:02.699><c> any</c><00:01:03.000><c> new</c>
Henry malleason couldn't make any new
 
Henry malleason couldn't make any new
memories<00:01:03.660><c> for</c><00:01:03.960><c> information</c><00:01:04.339><c> or</c><00:01:05.339><c> what</c>
memories for information or what
 
memories for information or what
happened<00:01:05.939><c> because</c><00:01:06.720><c> the</c><00:01:07.080><c> hippocampus</c><00:01:07.799><c> on</c><00:01:08.100><c> both</c>
happened because the hippocampus on both
 
happened because the hippocampus on both
sides<00:01:08.760><c> of</c><00:01:08.880><c> his</c><00:01:09.060><c> brain</c><00:01:09.360><c> was</c><00:01:09.600><c> removed</c><00:01:10.260><c> but</c>
sides of his brain was removed but
 
sides of his brain was removed but
because<00:01:11.340><c> he</c><00:01:11.820><c> still</c><00:01:12.060><c> had</c><00:01:12.360><c> his</c><00:01:12.540><c> basal</c><00:01:13.020><c> ganglia</c>
because he still had his basal ganglia
 
because he still had his basal ganglia
and<00:01:13.740><c> cerebellum</c><00:01:14.460><c> he</c><00:01:15.119><c> could</c><00:01:15.360><c> still</c><00:01:15.600><c> create</c><00:01:15.960><c> new</c>
and cerebellum he could still create new
 
and cerebellum he could still create new
muscle<00:01:16.740><c> memories</c>
muscle memories
 
muscle memories
for<00:01:19.020><c> example</c><00:01:19.380><c> he</c><00:01:20.100><c> learned</c><00:01:20.400><c> how</c><00:01:20.700><c> to</c><00:01:20.820><c> mirror</c>
for example he learned how to mirror
 
for example he learned how to mirror
draw<00:01:21.420><c> and</c><00:01:22.020><c> got</c><00:01:22.200><c> better</c><00:01:22.439><c> with</c><00:01:22.799><c> practice</c><00:01:23.119><c> even</c>
draw and got better with practice even
 
draw and got better with practice even
though<00:01:24.360><c> he</c><00:01:24.600><c> could</c><00:01:24.840><c> never</c><00:01:25.080><c> consciously</c>
though he could never consciously
 
though he could never consciously
remember<00:01:25.979><c> that</c><00:01:26.400><c> he'd</c><00:01:26.700><c> done</c><00:01:26.939><c> this</c><00:01:27.180><c> task</c><00:01:27.360><c> before</c>
remember that he'd done this task before
 
remember that he'd done this task before
retrieving<00:01:29.939><c> muscle</c><00:01:30.180><c> memories</c><00:01:30.659><c> is</c><00:01:31.140><c> also</c><00:01:31.560><c> a</c><00:01:31.740><c> bit</c>
retrieving muscle memories is also a bit
 
retrieving muscle memories is also a bit
different<00:01:32.040><c> from</c><00:01:32.400><c> how</c><00:01:32.640><c> we</c><00:01:32.759><c> recall</c><00:01:33.119><c> semantic</c>
different from how we recall semantic
 
different from how we recall semantic
and<00:01:34.080><c> episodic</c><00:01:34.680><c> memories</c>
and episodic memories
 
and episodic memories
semantic<00:01:36.840><c> and</c><00:01:37.020><c> episodic</c><00:01:37.619><c> memories</c><00:01:37.979><c> are</c>
semantic and episodic memories are
 
semantic and episodic memories are
called<00:01:38.460><c> declarative</c><00:01:39.119><c> you</c><00:01:39.960><c> can</c><00:01:40.079><c> declare</c><00:01:40.500><c> that</c>
called declarative you can declare that
 
called declarative you can declare that
you<00:01:41.040><c> remember</c><00:01:41.220><c> or</c><00:01:41.700><c> know</c><00:01:41.939><c> something</c><00:01:42.299><c> you're</c>
you remember or know something you're
 
you remember or know something you're
conscious<00:01:43.680><c> of</c><00:01:43.860><c> it</c>
conscious of it
 
conscious of it
retrieving<00:01:46.140><c> the</c><00:01:46.380><c> stuff</c><00:01:46.560><c> you</c><00:01:46.860><c> know</c><00:01:47.040><c> and</c><00:01:47.579><c> the</c>
retrieving the stuff you know and the
 
retrieving the stuff you know and the
stuff<00:01:47.880><c> that</c><00:01:48.119><c> happened</c><00:01:48.360><c> often</c><00:01:49.320><c> requires</c>
stuff that happened often requires
 
stuff that happened often requires
conscious<00:01:50.520><c> effort</c><00:01:51.200><c> concentration</c><00:01:52.200><c> even</c>
conscious effort concentration even
 
conscious effort concentration even
struggle<00:01:53.899><c> recall</c><00:01:54.899><c> of</c><00:01:55.140><c> muscle</c><00:01:55.439><c> memory</c><00:01:55.979><c> is</c>
struggle recall of muscle memory is
 
struggle recall of muscle memory is
different<00:01:56.720><c> it</c><00:01:57.720><c> is</c><00:01:57.899><c> unconscious</c><00:01:58.820><c> remembered</c>
different it is unconscious remembered
 
different it is unconscious remembered
below<00:02:00.299><c> your</c><00:02:00.600><c> awareness</c>
below your awareness
 
below your awareness
driving<00:02:02.399><c> a</c><00:02:02.820><c> car</c><00:02:03.000><c> brushing</c><00:02:03.899><c> your</c><00:02:04.020><c> teeth</c><00:02:04.320><c> tying</c>
driving a car brushing your teeth tying
 
driving a car brushing your teeth tying
your<00:02:05.399><c> shoes</c><00:02:05.700><c> or</c><00:02:06.240><c> all</c><00:02:06.479><c> muscle</c><00:02:06.719><c> memories</c><00:02:07.640><c> Once</c>
your shoes or all muscle memories Once
 
your shoes or all muscle memories Once
Upon<00:02:08.880><c> a</c><00:02:09.000><c> Time</c><00:02:09.179><c> you</c><00:02:10.080><c> didn't</c><00:02:10.259><c> know</c><00:02:10.500><c> how</c><00:02:10.679><c> to</c><00:02:10.800><c> do</c>
Upon a Time you didn't know how to do
 
Upon a Time you didn't know how to do
these<00:02:11.280><c> things</c>
these things
 
these things
then<00:02:12.840><c> through</c><00:02:13.260><c> a</c><00:02:13.440><c> lot</c><00:02:13.560><c> of</c><00:02:13.680><c> repetition</c><00:02:14.220><c> and</c>
then through a lot of repetition and
 
then through a lot of repetition and
refinement<00:02:15.060><c> you</c><00:02:15.420><c> learned</c>
refinement you learned
 
refinement you learned
you<00:02:17.220><c> committed</c><00:02:17.640><c> the</c><00:02:17.819><c> steps</c><00:02:18.180><c> to</c><00:02:18.360><c> memory</c><00:02:18.920><c> and</c>
you committed the steps to memory and
 
you committed the steps to memory and
now<00:02:20.160><c> when</c><00:02:20.580><c> you</c><00:02:20.760><c> go</c><00:02:20.879><c> to</c><00:02:21.000><c> ride</c><00:02:21.239><c> a</c><00:02:21.480><c> bike</c><00:02:21.599><c> you</c><00:02:22.260><c> don't</c>
now when you go to ride a bike you don't
 
now when you go to ride a bike you don't
have<00:02:22.500><c> to</c><00:02:22.680><c> stop</c><00:02:22.920><c> and</c><00:02:23.220><c> think</c><00:02:23.459><c> wait</c><00:02:24.239><c> let</c><00:02:24.720><c> me</c>
have to stop and think wait let me
 
have to stop and think wait let me
recall<00:02:25.260><c> all</c><00:02:25.620><c> of</c><00:02:25.680><c> the</c><00:02:25.800><c> steps</c><00:02:26.099><c> of</c><00:02:26.220><c> how</c><00:02:26.340><c> to</c><00:02:26.520><c> do</c>
recall all of the steps of how to do
 
recall all of the steps of how to do
this<00:02:26.819><c> first</c><00:02:27.319><c> you</c><00:02:28.319><c> are</c><00:02:28.440><c> utterly</c><00:02:29.040><c> unaware</c><00:02:29.760><c> of</c>
this first you are utterly unaware of
 
this first you are utterly unaware of
these<00:02:30.300><c> memories</c><00:02:30.660><c> while</c><00:02:31.080><c> recalling</c><00:02:31.800><c> them</c><00:02:32.040><c> they</c>
these memories while recalling them they
 
these memories while recalling them they
are<00:02:33.000><c> automatic</c><00:02:33.780><c> you</c><00:02:34.440><c> hop</c><00:02:34.680><c> on</c><00:02:34.920><c> the</c><00:02:35.040><c> bike</c><00:02:35.220><c> and</c><00:02:35.520><c> go</c>
are automatic you hop on the bike and go
 
are automatic you hop on the bike and go
it's<00:02:36.660><c> phenomenally</c><00:02:37.440><c> beneficial</c><00:02:38.160><c> that</c><00:02:38.819><c> our</c>
it's phenomenally beneficial that our
 
it's phenomenally beneficial that our
brains<00:02:39.360><c> are</c><00:02:39.540><c> designed</c><00:02:40.020><c> in</c><00:02:40.260><c> this</c><00:02:40.379><c> way</c><00:02:40.560><c> in</c>
brains are designed in this way in
 
brains are designed in this way in
delegating<00:02:42.000><c> muscle</c><00:02:42.300><c> memory</c><00:02:42.780><c> to</c><00:02:43.140><c> subconscious</c>
delegating muscle memory to subconscious
 
delegating muscle memory to subconscious
neural<00:02:44.280><c> circuitry</c><00:02:44.819><c> the</c><00:02:45.420><c> brain's</c><00:02:45.840><c> president</c>
neural circuitry the brain's president
 
neural circuitry the brain's president
CEO<00:02:46.980><c> and</c><00:02:47.220><c> other</c><00:02:47.459><c> higher-ups</c><00:02:48.239><c> are</c><00:02:48.780><c> free</c><00:02:49.019><c> to</c>
CEO and other higher-ups are free to
 
CEO and other higher-ups are free to
continue<00:02:49.440><c> their</c><00:02:49.980><c> executive</c><00:02:50.459><c> functions</c><00:02:51.000><c> of</c>
continue their executive functions of
 
continue their executive functions of
thinking<00:02:51.980><c> imagining</c><00:02:52.980><c> and</c><00:02:53.340><c> decision</c><00:02:53.640><c> making</c>
thinking imagining and decision making
 
thinking imagining and decision making
while<00:02:54.720><c> you're</c><00:02:55.019><c> doing</c><00:02:55.319><c> what</c><00:02:55.620><c> you</c><00:02:55.860><c> already</c><00:02:56.040><c> know</c>
while you're doing what you already know
 
while you're doing what you already know
how<00:02:56.519><c> to</c><00:02:56.700><c> do</c>
how to do
 
how to do
so<00:02:58.260><c> you</c><00:02:58.680><c> can</c><00:02:58.860><c> walk</c><00:02:59.280><c> chew</c><00:03:00.000><c> gum</c><00:03:00.180><c> and</c><00:03:00.840><c> have</c><00:03:01.019><c> a</c>
so you can walk chew gum and have a
 
so you can walk chew gum and have a
conversation<00:03:01.739><c> at</c><00:03:02.459><c> the</c><00:03:02.580><c> same</c><00:03:02.760><c> time</c>
Kind: captions
Language: en
 
when<00:00:07.259><c> is</c><00:00:07.440><c> forgetting</c><00:00:07.980><c> normal</c><00:00:08.160><c> and</c><00:00:08.940><c> when</c><00:00:09.120><c> is</c><00:00:09.300><c> it</c>
when is forgetting normal and when is it
 
when is forgetting normal and when is it
not
not
 
not
here<00:00:10.920><c> are</c><00:00:11.099><c> four</c><00:00:11.280><c> examples</c>
here are four examples
 
here are four examples
first<00:00:13.280><c> not</c><00:00:14.280><c> remembering</c><00:00:14.820><c> where</c><00:00:15.120><c> you</c><00:00:15.420><c> parked</c>
first not remembering where you parked
 
first not remembering where you parked
because<00:00:16.199><c> you</c><00:00:16.500><c> didn't</c><00:00:16.680><c> pay</c><00:00:17.160><c> attention</c><00:00:17.640><c> is</c>
because you didn't pay attention is
 
because you didn't pay attention is
normal<00:00:18.779><c> and</c><00:00:19.619><c> different</c><00:00:19.800><c> than</c><00:00:20.160><c> what</c><00:00:20.460><c> happens</c>
normal and different than what happens
 
normal and different than what happens
with<00:00:21.060><c> Alzheimer's</c>
with Alzheimer's
 
with Alzheimer's
if<00:00:22.920><c> you</c><00:00:23.100><c> have</c><00:00:23.279><c> Alzheimer's</c><00:00:24.060><c> let's</c><00:00:24.660><c> say</c><00:00:24.840><c> you</c>
if you have Alzheimer's let's say you
 
if you have Alzheimer's let's say you
park<00:00:25.260><c> in</c><00:00:25.500><c> a</c><00:00:25.680><c> mall</c><00:00:25.800><c> garage</c><00:00:26.160><c> and</c><00:00:26.760><c> shop</c><00:00:26.939><c> for</c><00:00:27.180><c> an</c>
park in a mall garage and shop for an
 
park in a mall garage and shop for an
hour<00:00:27.480><c> when</c><00:00:28.439><c> you</c><00:00:28.560><c> return</c><00:00:28.800><c> to</c><00:00:29.039><c> the</c><00:00:29.220><c> parking</c>
hour when you return to the parking
 
hour when you return to the parking
garage<00:00:29.820><c> you're</c><00:00:30.599><c> not</c><00:00:30.779><c> wondering</c><00:00:31.199><c> if</c><00:00:31.439><c> you</c>
garage you're not wondering if you
 
garage you're not wondering if you
parked<00:00:31.859><c> on</c><00:00:31.980><c> level</c><00:00:32.099><c> three</c><00:00:32.399><c> or</c><00:00:32.579><c> level</c><00:00:32.820><c> four</c>
parked on level three or level four
 
parked on level three or level four
you're<00:00:34.140><c> thinking</c>
you're thinking
 
you're thinking
I<00:00:35.760><c> don't</c><00:00:35.880><c> remember</c><00:00:36.059><c> how</c><00:00:36.480><c> I</c><00:00:36.719><c> got</c><00:00:36.899><c> here</c>
I don't remember how I got here
 
I don't remember how I got here
or<00:00:38.520><c> you're</c><00:00:38.700><c> standing</c><00:00:39.239><c> in</c><00:00:39.540><c> front</c><00:00:39.719><c> of</c><00:00:39.899><c> your</c><00:00:40.079><c> car</c>
or you're standing in front of your car
 
or you're standing in front of your car
but<00:00:40.980><c> you</c><00:00:41.160><c> don't</c><00:00:41.280><c> recognize</c><00:00:41.700><c> it</c><00:00:41.940><c> as</c><00:00:42.120><c> yours</c>
but you don't recognize it as yours
 
but you don't recognize it as yours
second
second
 
second
having<00:00:45.360><c> a</c><00:00:45.719><c> word</c><00:00:45.899><c> stuck</c><00:00:46.440><c> on</c><00:00:46.559><c> the</c><00:00:46.680><c> tip</c><00:00:46.860><c> of</c><00:00:46.980><c> your</c>
having a word stuck on the tip of your
 
having a word stuck on the tip of your
tongue<00:00:47.579><c> that</c><00:00:48.360><c> oh</c><00:00:48.840><c> what's</c><00:00:49.200><c> his</c><00:00:49.500><c> name</c>
tongue that oh what's his name
 
tongue that oh what's his name
phenomenon<00:00:50.700><c> called</c><00:00:51.360><c> blocking</c><00:00:52.140><c> is</c><00:00:52.800><c> normal</c><00:00:53.160><c> and</c>
phenomenon called blocking is normal and
 
phenomenon called blocking is normal and
does<00:00:54.000><c> not</c><00:00:54.239><c> mean</c><00:00:54.480><c> you</c><00:00:54.780><c> have</c><00:00:54.840><c> Alzheimer's</c><00:00:55.699><c> this</c>
does not mean you have Alzheimer's this
 
does not mean you have Alzheimer's this
is<00:00:56.820><c> one</c><00:00:57.059><c> of</c><00:00:57.120><c> the</c><00:00:57.239><c> most</c><00:00:57.480><c> common</c><00:00:57.960><c> experiences</c><00:00:58.860><c> of</c>
is one of the most common experiences of
 
is one of the most common experiences of
memory<00:00:59.460><c> retrieval</c><00:01:00.000><c> failure</c><00:01:00.480><c> you're</c><00:01:01.320><c> trying</c>
memory retrieval failure you're trying
 
memory retrieval failure you're trying
to<00:01:01.739><c> come</c><00:01:01.860><c> up</c><00:01:01.980><c> with</c><00:01:02.160><c> a</c><00:01:02.399><c> word</c><00:01:02.640><c> most</c><00:01:03.420><c> often</c><00:01:04.019><c> a</c>
to come up with a word most often a
 
to come up with a word most often a
proper<00:01:04.619><c> noun</c><00:01:04.920><c> a</c><00:01:05.580><c> person's</c><00:01:06.060><c> name</c><00:01:06.360><c> or</c><00:01:06.659><c> a</c><00:01:06.840><c> movie</c>
proper noun a person's name or a movie
 
proper noun a person's name or a movie
title<00:01:07.580><c> you</c><00:01:08.580><c> know</c><00:01:08.700><c> you</c><00:01:09.060><c> know</c><00:01:09.240><c> this</c><00:01:09.540><c> word</c><00:01:09.720><c> but</c>
title you know you know this word but
 
title you know you know this word but
you<00:01:10.439><c> cannot</c><00:01:10.799><c> for</c><00:01:11.040><c> the</c><00:01:11.220><c> life</c><00:01:11.400><c> of</c><00:01:11.580><c> you</c><00:01:11.700><c> retrieve</c>
you cannot for the life of you retrieve
 
you cannot for the life of you retrieve
it<00:01:12.299><c> on</c><00:01:12.479><c> demand</c><00:01:12.920><c> this</c><00:01:13.920><c> happens</c><00:01:14.159><c> when</c><00:01:14.520><c> there</c><00:01:14.700><c> is</c>
it on demand this happens when there is
 
it on demand this happens when there is
only<00:01:15.119><c> partial</c><00:01:15.720><c> or</c><00:01:16.260><c> weak</c><00:01:16.680><c> activation</c><00:01:17.100><c> of</c><00:01:17.400><c> the</c>
only partial or weak activation of the
 
only partial or weak activation of the
neurons<00:01:18.000><c> that</c><00:01:18.600><c> link</c><00:01:18.780><c> up</c><00:01:19.020><c> to</c><00:01:19.200><c> the</c><00:01:19.380><c> word</c><00:01:19.500><c> you're</c>
neurons that link up to the word you're
 
neurons that link up to the word you're
looking<00:01:20.040><c> for</c>
looking for
 
looking for
and<00:01:21.720><c> proper</c><00:01:22.080><c> nouns</c><00:01:22.500><c> are</c><00:01:22.740><c> particularly</c><00:01:23.400><c> tricky</c>
and proper nouns are particularly tricky
 
and proper nouns are particularly tricky
to<00:01:24.240><c> reach</c><00:01:24.540><c> think</c><00:01:25.320><c> of</c><00:01:25.500><c> proper</c><00:01:25.920><c> nouns</c><00:01:26.280><c> as</c><00:01:26.460><c> living</c>
to reach think of proper nouns as living
 
to reach think of proper nouns as living
in<00:01:27.000><c> neurological</c><00:01:27.659><c> cul-de-sacs</c><00:01:28.700><c> ultimately</c>
in neurological cul-de-sacs ultimately
 
in neurological cul-de-sacs ultimately
there<00:01:30.299><c> is</c><00:01:30.420><c> only</c><00:01:30.659><c> one</c><00:01:31.080><c> Road</c><00:01:31.320><c> in</c><00:01:31.619><c> that</c><00:01:31.920><c> leads</c><00:01:32.220><c> to</c>
there is only one Road in that leads to
 
there is only one Road in that leads to
the<00:01:32.580><c> address</c><00:01:32.759><c> you're</c><00:01:33.119><c> looking</c><00:01:33.360><c> for</c>
the address you're looking for
 
the address you're looking for
unlike<00:01:34.920><c> common</c><00:01:35.280><c> nouns</c><00:01:35.820><c> which</c><00:01:36.180><c> live</c><00:01:36.420><c> on</c><00:01:36.659><c> Main</c>
unlike common nouns which live on Main
 
unlike common nouns which live on Main
Street<00:01:37.259><c> with</c><00:01:37.860><c> hundreds</c><00:01:38.280><c> of</c><00:01:38.400><c> ways</c><00:01:38.759><c> to</c><00:01:38.880><c> get</c><00:01:39.060><c> to</c>
Street with hundreds of ways to get to
 
Street with hundreds of ways to get to
them
them
 
them
because<00:01:40.860><c> proper</c><00:01:41.460><c> nouns</c><00:01:41.880><c> are</c><00:01:42.299><c> so</c><00:01:42.600><c> tough</c><00:01:42.840><c> to</c>
because proper nouns are so tough to
 
because proper nouns are so tough to
activate<00:01:43.439><c> they</c><00:01:44.340><c> often</c><00:01:44.640><c> get</c><00:01:44.759><c> stuck</c><00:01:45.060><c> on</c><00:01:45.180><c> the</c><00:01:45.360><c> tip</c>
activate they often get stuck on the tip
 
activate they often get stuck on the tip
of<00:01:45.600><c> our</c><00:01:45.780><c> tongue</c><00:01:46.680><c> we</c><00:01:47.340><c> experience</c><00:01:47.700><c> tip</c><00:01:48.000><c> of</c><00:01:48.180><c> the</c>
of our tongue we experience tip of the
 
of our tongue we experience tip of the
tongues<00:01:48.659><c> more</c><00:01:49.079><c> often</c><00:01:49.439><c> as</c><00:01:49.680><c> we</c><00:01:49.920><c> age</c><00:01:50.220><c> but</c><00:01:51.000><c> again</c>
tongues more often as we age but again
 
tongues more often as we age but again
this<00:01:51.540><c> is</c><00:01:51.780><c> normal</c><00:01:52.140><c> it</c><00:01:52.860><c> has</c><00:01:53.040><c> to</c><00:01:53.220><c> do</c><00:01:53.280><c> with</c><00:01:53.520><c> slower</c>
this is normal it has to do with slower
 
this is normal it has to do with slower
processing<00:01:54.479><c> speeds</c><00:01:54.899><c> as</c><00:01:55.140><c> we</c><00:01:55.320><c> get</c><00:01:55.439><c> older</c>
processing speeds as we get older
 
processing speeds as we get older
it's<00:01:57.780><c> perfectly</c><00:01:58.259><c> okay</c><00:01:58.680><c> to</c><00:01:59.340><c> use</c><00:01:59.520><c> Google</c><00:01:59.939><c> to</c>
it's perfectly okay to use Google to
 
it's perfectly okay to use Google to
find<00:02:00.899><c> your</c><00:02:01.140><c> tip</c><00:02:01.320><c> of</c><00:02:01.500><c> the</c><00:02:01.619><c> tongue</c><00:02:01.979><c> words</c><00:02:02.299><c> this</c>
find your tip of the tongue words this
 
find your tip of the tongue words this
won't<00:02:03.540><c> make</c><00:02:03.720><c> your</c><00:02:03.960><c> memory</c><00:02:04.259><c> for</c><00:02:04.500><c> these</c><00:02:04.740><c> words</c>
won't make your memory for these words
 
won't make your memory for these words
worse<00:02:05.520><c> or</c><00:02:06.240><c> give</c><00:02:06.479><c> you</c><00:02:06.600><c> digital</c><00:02:07.020><c> amnesia</c><00:02:07.799><c> for</c>
worse or give you digital amnesia for
 
worse or give you digital amnesia for
example<00:02:09.060><c> looking</c><00:02:09.720><c> up</c><00:02:10.020><c> the</c><00:02:10.200><c> name</c><00:02:10.319><c> of</c><00:02:10.560><c> the</c><00:02:10.739><c> actor</c>
example looking up the name of the actor
 
example looking up the name of the actor
who<00:02:11.280><c> played</c><00:02:11.459><c> Phoebe</c><00:02:11.760><c> buffay</c><00:02:12.360><c> on</c><00:02:12.599><c> Friends</c><00:02:12.959><c> does</c>
who played Phoebe buffay on Friends does
 
who played Phoebe buffay on Friends does
not<00:02:13.920><c> weaken</c><00:02:14.459><c> my</c><00:02:14.640><c> memory's</c><00:02:15.000><c> ability</c>
not weaken my memory's ability
 
not weaken my memory's ability
whatsoever
whatsoever
 
whatsoever
likewise<00:02:18.000><c> suffering</c><00:02:18.959><c> through</c><00:02:19.200><c> the</c><00:02:19.440><c> mental</c>
likewise suffering through the mental
 
likewise suffering through the mental
pain<00:02:20.040><c> and</c><00:02:20.520><c> insisting</c><00:02:21.060><c> on</c><00:02:21.300><c> coming</c><00:02:21.540><c> up</c><00:02:21.780><c> with</c><00:02:21.900><c> her</c>
pain and insisting on coming up with her
 
pain and insisting on coming up with her
name<00:02:22.319><c> on</c><00:02:22.680><c> my</c><00:02:22.920><c> own</c><00:02:23.099><c> doesn't</c><00:02:23.819><c> make</c><00:02:24.120><c> my</c><00:02:24.360><c> memory</c>
name on my own doesn't make my memory
 
name on my own doesn't make my memory
stronger<00:02:25.340><c> in</c><00:02:26.340><c> fact</c><00:02:26.599><c> relieving</c><00:02:27.599><c> my</c><00:02:27.780><c> brain</c><00:02:28.020><c> from</c>
stronger in fact relieving my brain from
 
stronger in fact relieving my brain from
the<00:02:28.620><c> fruitless</c><00:02:28.980><c> task</c><00:02:29.280><c> of</c><00:02:29.700><c> perseverating</c><00:02:30.420><c> in</c>
the fruitless task of perseverating in
 
the fruitless task of perseverating in
the<00:02:30.900><c> wrong</c><00:02:31.080><c> neural</c><00:02:31.560><c> neighborhood</c><00:02:32.099><c> can</c><00:02:32.760><c> now</c>
the wrong neural neighborhood can now
 
the wrong neural neighborhood can now
free<00:02:33.239><c> up</c><00:02:33.480><c> my</c><00:02:33.720><c> brain</c><00:02:33.900><c> to</c><00:02:34.080><c> think</c><00:02:34.260><c> about</c><00:02:34.440><c> and</c>
free up my brain to think about and
 
free up my brain to think about and
engage<00:02:35.040><c> in</c><00:02:35.280><c> other</c><00:02:35.520><c> cognitive</c><00:02:36.120><c> experiences</c>
engage in other cognitive experiences
 
engage in other cognitive experiences
but<00:02:38.580><c> failure</c><00:02:39.060><c> to</c><00:02:39.300><c> retrieve</c><00:02:39.720><c> words</c><00:02:39.959><c> is</c><00:02:40.560><c> also</c><00:02:40.860><c> an</c>
but failure to retrieve words is also an
 
but failure to retrieve words is also an
early<00:02:41.280><c> sign</c><00:02:41.580><c> of</c><00:02:41.760><c> Alzheimer's</c><00:02:42.540><c> so</c><00:02:43.319><c> how</c><00:02:43.560><c> can</c><00:02:43.739><c> you</c>
early sign of Alzheimer's so how can you
 
early sign of Alzheimer's so how can you
know<00:02:44.099><c> if</c><00:02:44.459><c> you're</c><00:02:44.640><c> experiencing</c><00:02:45.360><c> an</c><00:02:45.720><c> ordinary</c>
know if you're experiencing an ordinary
 
know if you're experiencing an ordinary
tip<00:02:46.379><c> of</c><00:02:46.440><c> the</c><00:02:46.560><c> tongue</c><00:02:46.860><c> moment</c><00:02:47.160><c> or</c><00:02:48.060><c> a</c><00:02:48.180><c> symptom</c><00:02:48.360><c> of</c>
tip of the tongue moment or a symptom of
 
tip of the tongue moment or a symptom of
dementia
dementia
 
dementia
if<00:02:50.459><c> it's</c><00:02:50.640><c> Alzheimer's</c><00:02:51.420><c> you're</c><00:02:51.959><c> blocking</c><00:02:52.440><c> on</c>
if it's Alzheimer's you're blocking on
 
if it's Alzheimer's you're blocking on
dozens<00:02:53.280><c> of</c><00:02:53.519><c> words</c><00:02:53.700><c> a</c><00:02:54.000><c> day</c><00:02:54.239><c> and</c><00:02:55.200><c> instead</c><00:02:55.500><c> of</c>
dozens of words a day and instead of
 
dozens of words a day and instead of
blocking<00:02:56.099><c> primarily</c><00:02:56.819><c> on</c><00:02:57.120><c> proper</c><00:02:57.540><c> nouns</c>
blocking primarily on proper nouns
 
blocking primarily on proper nouns
people<00:02:58.440><c> with</c><00:02:58.680><c> Alzheimer's</c><00:02:59.340><c> will</c>
people with Alzheimer's will
 
people with Alzheimer's will
additionally<00:03:00.120><c> and</c><00:03:00.599><c> regularly</c><00:03:01.200><c> forget</c><00:03:01.560><c> common</c>
additionally and regularly forget common
 
additionally and regularly forget common
nouns<00:03:02.700><c> pen</c><00:03:03.540><c> spoon</c><00:03:04.440><c> bicycle</c>
nouns pen spoon bicycle
 
nouns pen spoon bicycle
when<00:03:06.660><c> this</c><00:03:06.959><c> kind</c><00:03:07.140><c> of</c><00:03:07.260><c> tip</c><00:03:07.620><c> of</c><00:03:07.680><c> the</c><00:03:07.860><c> tongue</c>
when this kind of tip of the tongue
 
when this kind of tip of the tongue
happens<00:03:08.400><c> all</c><00:03:09.060><c> day</c><00:03:09.239><c> long</c><00:03:09.540><c> this</c><00:03:10.440><c> is</c><00:03:10.620><c> not</c><00:03:10.860><c> just</c><00:03:11.159><c> an</c>
happens all day long this is not just an
 
happens all day long this is not just an
uncomfortable<00:03:11.819><c> moment</c><00:03:12.379><c> this</c><00:03:13.379><c> is</c><00:03:13.620><c> disruptive</c>
uncomfortable moment this is disruptive
 
uncomfortable moment this is disruptive
profound<00:03:15.239><c> memory</c><00:03:15.840><c> loss</c>
profound memory loss
 
profound memory loss
the<00:03:17.760><c> third</c><00:03:17.940><c> example</c><00:03:18.360><c> of</c><00:03:18.720><c> normal</c><00:03:19.019><c> forgetting</c>
the third example of normal forgetting
 
the third example of normal forgetting
has<00:03:20.159><c> to</c><00:03:20.340><c> do</c><00:03:20.459><c> with</c><00:03:20.940><c> all</c><00:03:21.239><c> of</c><00:03:21.360><c> our</c><00:03:21.599><c> things</c><00:03:21.900><c> that</c><00:03:22.620><c> go</c>
has to do with all of our things that go
 
has to do with all of our things that go
missing
missing
 
missing
losing<00:03:24.659><c> track</c><00:03:24.900><c> of</c><00:03:25.140><c> where</c><00:03:25.319><c> you</c><00:03:25.500><c> left</c><00:03:25.680><c> your</c><00:03:25.920><c> keys</c>
losing track of where you left your keys
 
losing track of where you left your keys
is<00:03:27.060><c> normal</c><00:03:27.500><c> and</c><00:03:28.500><c> probably</c><00:03:28.739><c> as</c><00:03:29.159><c> a</c><00:03:29.340><c> result</c><00:03:29.459><c> of</c>
is normal and probably as a result of
 
is normal and probably as a result of
not<00:03:30.000><c> paying</c><00:03:30.300><c> attention</c>
not paying attention
 
not paying attention
losing<00:03:32.340><c> your</c><00:03:32.519><c> keys</c><00:03:32.940><c> and</c><00:03:33.239><c> then</c><00:03:33.420><c> finding</c><00:03:33.900><c> them</c>
losing your keys and then finding them
 
losing your keys and then finding them
in<00:03:34.260><c> a</c><00:03:34.379><c> place</c><00:03:34.560><c> Keys</c><00:03:35.220><c> never</c><00:03:35.400><c> go</c><00:03:35.760><c> like</c><00:03:36.659><c> the</c>
in a place Keys never go like the
 
in a place Keys never go like the
refrigerator<00:03:37.620><c> or</c><00:03:38.040><c> microwave</c><00:03:38.540><c> or</c><00:03:39.540><c> finding</c>
refrigerator or microwave or finding
 
refrigerator or microwave or finding
them<00:03:40.140><c> and</c><00:03:40.379><c> wondering</c><00:03:40.799><c> who</c><00:03:41.040><c> they</c><00:03:41.280><c> belong</c><00:03:41.640><c> to</c><00:03:41.879><c> or</c>
them and wondering who they belong to or
 
them and wondering who they belong to or
what<00:03:43.019><c> they're</c><00:03:43.140><c> used</c><00:03:43.379><c> for</c><00:03:43.739><c> is</c><00:03:44.519><c> not</c><00:03:44.819><c> normal</c><00:03:45.060><c> and</c>
what they're used for is not normal and
 
what they're used for is not normal and
might<00:03:46.019><c> be</c><00:03:46.200><c> a</c><00:03:46.440><c> sign</c><00:03:46.560><c> of</c><00:03:46.799><c> Alzheimer's</c>
might be a sign of Alzheimer's
 
might be a sign of Alzheimer's
and<00:03:48.599><c> for</c><00:03:48.840><c> the</c><00:03:49.019><c> fourth</c><00:03:49.319><c> example</c><00:03:49.739><c> of</c><00:03:50.159><c> normal</c>
and for the fourth example of normal
 
and for the fourth example of normal
versus<00:03:50.940><c> Troublesome</c><00:03:51.720><c> forgetting</c><00:03:52.260><c> let's</c><00:03:52.739><c> talk</c>
versus Troublesome forgetting let's talk
 
versus Troublesome forgetting let's talk
again<00:03:53.159><c> about</c><00:03:53.459><c> muscle</c><00:03:53.819><c> memory</c>
again about muscle memory
 
again about muscle memory
muscle<00:03:55.440><c> memory</c><00:03:55.920><c> is</c><00:03:56.340><c> remarkably</c><00:03:57.180><c> stable</c><00:03:57.599><c> over</c>
muscle memory is remarkably stable over
 
muscle memory is remarkably stable over
time<00:03:58.340><c> we</c><00:03:59.340><c> remember</c><00:03:59.700><c> how</c><00:04:00.239><c> to</c><00:04:00.420><c> do</c><00:04:00.659><c> what</c><00:04:01.200><c> we've</c>
time we remember how to do what we've
 
time we remember how to do what we've
learned<00:04:01.680><c> to</c><00:04:01.799><c> do</c><00:04:01.980><c> if</c><00:04:02.940><c> you</c><00:04:03.060><c> go</c><00:04:03.180><c> to</c><00:04:03.360><c> make</c><00:04:03.480><c> a</c><00:04:03.659><c> cup</c><00:04:03.780><c> of</c>
learned to do if you go to make a cup of
 
learned to do if you go to make a cup of
coffee<00:04:04.260><c> and</c><00:04:04.980><c> don't</c><00:04:05.159><c> remember</c><00:04:05.340><c> how</c><00:04:05.700><c> to</c><00:04:05.819><c> work</c>
coffee and don't remember how to work
 
coffee and don't remember how to work
the<00:04:06.239><c> coffee</c><00:04:06.420><c> maker</c><00:04:07.019><c> or</c><00:04:07.860><c> if</c><00:04:07.980><c> you're</c><00:04:08.099><c> doing</c>
the coffee maker or if you're doing
 
the coffee maker or if you're doing
laundry<00:04:08.760><c> but</c><00:04:09.420><c> can't</c><00:04:09.599><c> remember</c><00:04:09.840><c> how</c><00:04:10.140><c> to</c><00:04:10.260><c> use</c>
laundry but can't remember how to use
 
laundry but can't remember how to use
the<00:04:10.739><c> washing</c><00:04:11.220><c> machine</c><00:04:11.659><c> if</c><00:04:12.659><c> you're</c><00:04:12.900><c> stumped</c><00:04:13.379><c> by</c>
the washing machine if you're stumped by
 
the washing machine if you're stumped by
tasks<00:04:14.280><c> you've</c><00:04:14.760><c> long</c><00:04:15.060><c> known</c><00:04:15.360><c> how</c><00:04:15.720><c> to</c><00:04:15.840><c> and</c>
tasks you've long known how to and
 
tasks you've long known how to and
regularly<00:04:16.859><c> do</c><00:04:17.280><c> this</c><00:04:18.180><c> might</c><00:04:18.419><c> be</c><00:04:18.600><c> a</c><00:04:18.840><c> sign</c><00:04:18.959><c> of</c>
regularly do this might be a sign of
 
regularly do this might be a sign of
Alzheimer's<00:04:20.000><c> forgetting</c><00:04:21.000><c> that</c><00:04:21.120><c> isn't</c><00:04:21.419><c> normal</c>
Alzheimer's forgetting that isn't normal
 
Alzheimer's forgetting that isn't normal
doesn't<00:04:22.440><c> have</c><00:04:22.800><c> to</c><00:04:22.919><c> be</c><00:04:23.100><c> due</c><00:04:23.280><c> to</c><00:04:23.460><c> alzheimer's</c><00:04:24.180><c> it</c>
doesn't have to be due to alzheimer's it
 
doesn't have to be due to alzheimer's it
could<00:04:25.199><c> be</c><00:04:25.380><c> due</c><00:04:25.620><c> to</c><00:04:25.800><c> mild</c><00:04:26.100><c> cognitive</c>
could be due to mild cognitive
 
could be due to mild cognitive
impairment<00:04:27.240><c> which</c><00:04:27.960><c> doesn't</c><00:04:28.199><c> always</c><00:04:28.680><c> progress</c>
impairment which doesn't always progress
 
impairment which doesn't always progress
to<00:04:29.340><c> alzheimer's</c><00:04:30.120><c> a</c><00:04:30.840><c> B12</c><00:04:31.259><c> deficiency</c><00:04:31.880><c> or</c><00:04:32.880><c> poor</c>
to alzheimer's a B12 deficiency or poor
 
to alzheimer's a B12 deficiency or poor
sleep<00:04:33.479><c> hygiene</c><00:04:34.020><c> to</c><00:04:34.380><c> name</c><00:04:34.500><c> a</c><00:04:34.740><c> few</c><00:04:34.880><c> just</c><00:04:35.880><c> as</c><00:04:36.000><c> you</c>
sleep hygiene to name a few just as you
 
sleep hygiene to name a few just as you
do<00:04:36.300><c> with</c><00:04:36.600><c> your</c><00:04:36.840><c> heart</c><00:04:37.020><c> health</c><00:04:37.259><c> and</c>
do with your heart health and
 
do with your heart health and
reproductive<00:04:38.340><c> parts</c><00:04:38.639><c> I</c><00:04:39.479><c> encourage</c><00:04:39.900><c> you</c><00:04:40.080><c> to</c><00:04:40.320><c> be</c>
reproductive parts I encourage you to be
 
reproductive parts I encourage you to be
in<00:04:40.680><c> conversation</c><00:04:41.220><c> with</c><00:04:41.699><c> your</c><00:04:41.880><c> doctor</c><00:04:42.120><c> about</c>
in conversation with your doctor about
 
in conversation with your doctor about
your<00:04:43.320><c> memory</c><00:04:43.680><c> and</c><00:04:44.580><c> realize</c><00:04:44.940><c> that</c><00:04:45.360><c> you</c><00:04:45.720><c> have</c><00:04:46.080><c> a</c>
your memory and realize that you have a
 
your memory and realize that you have a
lot<00:04:46.500><c> of</c><00:04:46.680><c> agency</c><00:04:47.100><c> over</c><00:04:48.000><c> your</c><00:04:48.300><c> brain</c><00:04:48.540><c> health</c>
Kind: captions
Language: en
 
let's<00:00:06.960><c> start</c><00:00:07.259><c> with</c><00:00:07.799><c> the</c><00:00:08.160><c> easiest</c><00:00:08.580><c> way</c><00:00:08.940><c> to</c>
let's start with the easiest way to
 
let's start with the easiest way to
improve<00:00:09.540><c> your</c><00:00:09.720><c> memory</c>
improve your memory
 
improve your memory
pay<00:00:11.340><c> attention</c>
pay attention
 
pay attention
the<00:00:13.440><c> first</c><00:00:13.679><c> necessary</c><00:00:14.519><c> ingredient</c><00:00:15.000><c> in</c>
the first necessary ingredient in
 
the first necessary ingredient in
creating<00:00:16.139><c> a</c><00:00:16.440><c> memory</c><00:00:16.740><c> that</c><00:00:17.279><c> lasts</c><00:00:17.640><c> longer</c><00:00:18.060><c> than</c>
creating a memory that lasts longer than
 
creating a memory that lasts longer than
this<00:00:18.660><c> present</c><00:00:19.020><c> moment</c><00:00:19.440><c> is</c><00:00:20.220><c> attention</c>
this present moment is attention
 
this present moment is attention
your<00:00:22.140><c> memory</c><00:00:22.439><c> isn't</c><00:00:22.920><c> a</c><00:00:23.160><c> video</c><00:00:23.400><c> camera</c>
your memory isn't a video camera
 
your memory isn't a video camera
recording<00:00:24.779><c> a</c><00:00:25.019><c> constant</c><00:00:25.380><c> stream</c><00:00:25.619><c> of</c><00:00:25.920><c> every</c>
recording a constant stream of every
 
recording a constant stream of every
Sight<00:00:26.400><c> and</c><00:00:26.580><c> Sound</c><00:00:26.820><c> you're</c><00:00:27.119><c> exposed</c><00:00:27.660><c> to</c>
Sight and Sound you're exposed to
 
Sight and Sound you're exposed to
think<00:00:29.279><c> about</c><00:00:29.400><c> the</c><00:00:29.880><c> vast</c><00:00:30.060><c> amount</c><00:00:30.420><c> of</c>
think about the vast amount of
 
think about the vast amount of
information<00:00:30.779><c> that</c><00:00:31.679><c> your</c><00:00:31.859><c> senses</c><00:00:32.279><c> are</c><00:00:32.460><c> exposed</c>
information that your senses are exposed
 
information that your senses are exposed
to<00:00:32.940><c> in</c><00:00:33.180><c> any</c><00:00:33.360><c> given</c><00:00:33.660><c> day</c><00:00:33.980><c> if</c><00:00:34.980><c> you're</c><00:00:35.160><c> awake</c><00:00:35.579><c> for</c>
to in any given day if you're awake for
 
to in any given day if you're awake for
 
business<00:00:39.840><c> without</c><00:00:40.500><c> a</c><00:00:40.920><c> break</c><00:00:41.040><c> for</c><00:00:41.820><c> 57</c><00:00:42.800><c> 600</c>
business without a break for 57 600
 
business without a break for 57 600
seconds
seconds
 
seconds
that's<00:00:45.660><c> a</c><00:00:45.840><c> lot</c><00:00:45.960><c> of</c><00:00:46.140><c> data</c><00:00:47.040><c> but</c><00:00:47.579><c> you</c><00:00:47.879><c> simply</c>
that's a lot of data but you simply
 
that's a lot of data but you simply
can't<00:00:48.660><c> and</c><00:00:49.079><c> won't</c><00:00:49.320><c> remember</c><00:00:49.680><c> most</c><00:00:50.280><c> of</c><00:00:50.460><c> what</c>
can't and won't remember most of what
 
can't and won't remember most of what
was<00:00:50.879><c> available</c><00:00:51.180><c> to</c><00:00:51.960><c> your</c><00:00:52.200><c> eyes</c><00:00:52.440><c> ears</c><00:00:52.980><c> nose</c><00:00:53.280><c> and</c>
was available to your eyes ears nose and
 
was available to your eyes ears nose and
brain<00:00:53.820><c> today</c>
brain today
 
brain today
it's<00:00:55.440><c> not</c><00:00:55.739><c> enough</c><00:00:55.980><c> for</c><00:00:56.520><c> your</c><00:00:56.699><c> senses</c><00:00:57.120><c> to</c>
it's not enough for your senses to
 
it's not enough for your senses to
perceive<00:00:57.840><c> information</c><00:00:58.460><c> your</c><00:00:59.460><c> hippocampus</c>
perceive information your hippocampus
 
perceive information your hippocampus
can't<00:01:00.600><c> link</c><00:01:00.960><c> any</c><00:01:01.800><c> information</c><00:01:02.100><c> into</c><00:01:03.059><c> a</c>
can't link any information into a
 
can't link any information into a
lasting<00:01:03.780><c> memory</c><00:01:04.199><c> without</c><00:01:05.159><c> the</c><00:01:05.519><c> neural</c><00:01:05.820><c> input</c>
lasting memory without the neural input
 
lasting memory without the neural input
of<00:01:06.479><c> attention</c>
of attention
 
of attention
when<00:01:08.400><c> you</c><00:01:08.700><c> can't</c><00:01:08.820><c> find</c><00:01:09.180><c> your</c><00:01:09.479><c> glasses</c><00:01:10.020><c> or</c><00:01:10.680><c> your</c>
when you can't find your glasses or your
 
when you can't find your glasses or your
keys<00:01:11.340><c> or</c><00:01:11.640><c> your</c><00:01:11.939><c> phone</c><00:01:12.180><c> I'm</c><00:01:13.140><c> betting</c><00:01:13.560><c> you</c>
keys or your phone I'm betting you
 
keys or your phone I'm betting you
actually<00:01:14.040><c> haven't</c><00:01:14.400><c> forgotten</c><00:01:15.060><c> anything</c><00:01:15.740><c> you</c>
actually haven't forgotten anything you
 
actually haven't forgotten anything you
didn't<00:01:16.860><c> pay</c><00:01:17.159><c> attention</c><00:01:17.460><c> to</c><00:01:17.760><c> where</c><00:01:17.939><c> you</c><00:01:18.180><c> set</c>
didn't pay attention to where you set
 
didn't pay attention to where you set
them<00:01:18.600><c> down</c><00:01:18.900><c> and</c><00:01:19.560><c> so</c><00:01:19.740><c> you</c><00:01:19.979><c> never</c><00:01:20.159><c> created</c><00:01:20.640><c> a</c>
them down and so you never created a
 
them down and so you never created a
memory<00:01:21.119><c> of</c><00:01:21.240><c> where</c><00:01:21.420><c> you</c><00:01:21.600><c> put</c><00:01:21.780><c> them</c><00:01:21.900><c> in</c><00:01:22.200><c> the</c>
memory of where you put them in the
 
memory of where you put them in the
first<00:01:22.560><c> place</c>
first place
 
first place
do<00:01:24.659><c> you</c><00:01:24.840><c> remember</c><00:01:24.960><c> the</c><00:01:25.439><c> details</c><00:01:25.799><c> of</c><00:01:25.979><c> what</c><00:01:26.159><c> you</c>
do you remember the details of what you
 
do you remember the details of what you
had<00:01:26.460><c> for</c><00:01:26.700><c> lunch</c><00:01:26.939><c> on</c><00:01:27.360><c> this</c><00:01:27.600><c> day</c><00:01:27.780><c> last</c><00:01:28.080><c> week</c><00:01:28.400><c> or</c>
had for lunch on this day last week or
 
had for lunch on this day last week or
everyone<00:01:29.640><c> you</c><00:01:30.000><c> emailed</c><00:01:30.420><c> two</c><00:01:30.720><c> days</c><00:01:30.960><c> ago</c>
everyone you emailed two days ago
 
everyone you emailed two days ago
probably<00:01:32.640><c> not</c>
probably not
 
probably not
have<00:01:34.259><c> you</c><00:01:34.380><c> ever</c><00:01:34.500><c> driven</c><00:01:34.920><c> a</c><00:01:35.100><c> familiar</c><00:01:35.400><c> stretch</c>
have you ever driven a familiar stretch
 
have you ever driven a familiar stretch
of<00:01:35.880><c> road</c><00:01:36.119><c> and</c><00:01:36.720><c> you</c><00:01:36.840><c> suddenly</c><00:01:37.200><c> realized</c><00:01:37.500><c> that</c>
of road and you suddenly realized that
 
of road and you suddenly realized that
you<00:01:37.860><c> have</c><00:01:38.040><c> no</c><00:01:38.340><c> memory</c><00:01:38.579><c> of</c><00:01:38.820><c> the</c><00:01:38.880><c> trip</c><00:01:39.060><c> so</c><00:01:39.360><c> far</c>
you have no memory of the trip so far
 
you have no memory of the trip so far
has<00:01:41.040><c> someone</c><00:01:41.280><c> ever</c><00:01:41.579><c> asked</c><00:01:42.060><c> you</c><00:01:42.180><c> to</c><00:01:42.360><c> do</c>
has someone ever asked you to do
 
has someone ever asked you to do
something<00:01:42.960><c> and</c><00:01:43.680><c> then</c><00:01:43.860><c> five</c><00:01:44.159><c> minutes</c><00:01:44.400><c> later</c>
something and then five minutes later
 
something and then five minutes later
you<00:01:45.600><c> can't</c><00:01:45.720><c> remember</c><00:01:45.960><c> what</c><00:01:46.320><c> she</c><00:01:46.560><c> said</c>
you can't remember what she said
 
you can't remember what she said
whether<00:01:48.420><c> it</c><00:01:48.659><c> was</c><00:01:48.780><c> because</c><00:01:48.960><c> you</c><00:01:49.320><c> were</c>
whether it was because you were
 
whether it was because you were
distracted<00:01:50.100><c> or</c><00:01:50.520><c> not</c><00:01:50.700><c> interested</c><00:01:51.180><c> you</c><00:01:52.020><c> can't</c>
distracted or not interested you can't
 
distracted or not interested you can't
remember<00:01:52.500><c> these</c><00:01:53.100><c> things</c><00:01:53.340><c> because</c><00:01:53.939><c> you</c><00:01:54.420><c> didn't</c>
remember these things because you didn't
 
remember these things because you didn't
give<00:01:54.840><c> them</c><00:01:55.020><c> your</c><00:01:55.259><c> attention</c>
give them your attention
 
give them your attention
so<00:01:57.360><c> what</c><00:01:57.659><c> do</c><00:01:57.780><c> we</c><00:01:57.899><c> humans</c><00:01:58.259><c> pay</c><00:01:58.560><c> attention</c><00:01:58.920><c> to</c>
so what do we humans pay attention to
 
so what do we humans pay attention to
and<00:02:00.119><c> therefore</c><00:02:00.479><c> remember</c>
and therefore remember
 
and therefore remember
our<00:02:02.399><c> brains</c><00:02:02.759><c> are</c><00:02:03.000><c> pretty</c><00:02:03.299><c> phenomenal</c><00:02:03.960><c> at</c>
our brains are pretty phenomenal at
 
our brains are pretty phenomenal at
attending<00:02:04.920><c> to</c><00:02:05.100><c> and</c><00:02:05.340><c> remembering</c><00:02:05.880><c> what</c><00:02:06.479><c> is</c>
attending to and remembering what is
 
attending to and remembering what is
Meaningful<00:02:07.220><c> emotional</c><00:02:08.420><c> surprising</c><00:02:09.420><c> new</c><00:02:10.200><c> and</c>
Meaningful emotional surprising new and
 
Meaningful emotional surprising new and
what<00:02:11.039><c> is</c><00:02:11.220><c> repeated</c><00:02:11.580><c> or</c><00:02:11.879><c> practiced</c><00:02:13.020><c> we</c><00:02:13.560><c> ignore</c>
what is repeated or practiced we ignore
 
what is repeated or practiced we ignore
and<00:02:14.940><c> therefore</c><00:02:15.360><c> forget</c><00:02:15.720><c> what</c><00:02:16.680><c> isn't</c>
and therefore forget what isn't
 
and therefore forget what isn't
how<00:02:18.660><c> can</c><00:02:18.780><c> we</c><00:02:18.959><c> improve</c><00:02:19.440><c> our</c><00:02:19.680><c> ability</c><00:02:19.980><c> to</c><00:02:20.340><c> pay</c>
how can we improve our ability to pay
 
how can we improve our ability to pay
attention<00:02:20.879><c> and</c><00:02:21.720><c> therefore</c><00:02:22.200><c> our</c><00:02:22.620><c> ability</c><00:02:22.980><c> to</c>
attention and therefore our ability to
 
attention and therefore our ability to
remember
remember
 
remember
decreased<00:02:25.800><c> distractions</c><00:02:27.120><c> put</c><00:02:27.900><c> down</c><00:02:28.200><c> your</c>
decreased distractions put down your
 
decreased distractions put down your
phone<00:02:29.040><c> it's</c><00:02:30.000><c> probably</c><00:02:30.300><c> your</c><00:02:30.840><c> biggest</c>
phone it's probably your biggest
 
phone it's probably your biggest
attention<00:02:31.500><c> Thief</c>
attention Thief
 
attention Thief
stop<00:02:33.780><c> multitasking</c><00:02:34.739><c> when</c><00:02:35.700><c> you</c><00:02:35.940><c> multitask</c>
stop multitasking when you multitask
 
stop multitasking when you multitask
you're<00:02:37.260><c> not</c><00:02:37.440><c> giving</c><00:02:37.680><c> your</c><00:02:38.099><c> full</c><00:02:38.220><c> attention</c><00:02:38.580><c> to</c>
you're not giving your full attention to
 
you're not giving your full attention to
each<00:02:39.120><c> task</c><00:02:39.420><c> and</c><00:02:40.140><c> so</c><00:02:40.319><c> you're</c><00:02:40.680><c> compromising</c>
each task and so you're compromising
 
each task and so you're compromising
your<00:02:41.640><c> brain's</c><00:02:41.940><c> ability</c><00:02:42.239><c> to</c><00:02:42.599><c> create</c><00:02:42.720><c> full</c>
your brain's ability to create full
 
your brain's ability to create full
memories<00:02:43.620><c> of</c><00:02:43.920><c> them</c>
memories of them
 
memories of them
practices<00:02:46.140><c> like</c><00:02:46.560><c> yoga</c><00:02:47.099><c> and</c><00:02:47.700><c> mindfulness</c>
practices like yoga and mindfulness
 
practices like yoga and mindfulness
meditation<00:02:48.840><c> can</c><00:02:49.560><c> help</c><00:02:49.860><c> you</c><00:02:49.980><c> strengthen</c><00:02:50.580><c> your</c>
meditation can help you strengthen your
 
meditation can help you strengthen your
ability<00:02:51.180><c> to</c><00:02:51.599><c> be</c><00:02:51.720><c> present</c><00:02:52.200><c> and</c><00:02:52.739><c> pay</c><00:02:52.920><c> attention</c>
ability to be present and pay attention
 
ability to be present and pay attention
and<00:02:54.239><c> in</c><00:02:54.420><c> doing</c><00:02:54.599><c> so</c><00:02:54.840><c> can</c><00:02:55.140><c> help</c><00:02:55.379><c> you</c><00:02:55.560><c> improve</c>
and in doing so can help you improve
 
and in doing so can help you improve
your<00:02:56.400><c> memory</c>
Kind: captions
Language: en
 
up<00:00:07.200><c> until</c><00:00:07.379><c> now</c><00:00:07.799><c> we've</c><00:00:08.340><c> been</c><00:00:08.460><c> talking</c><00:00:08.700><c> about</c>
up until now we've been talking about
 
up until now we've been talking about
retrospective<00:00:10.139><c> memories</c><00:00:10.620><c> your</c><00:00:11.460><c> memory</c><00:00:11.700><c> for</c>
retrospective memories your memory for
 
retrospective memories your memory for
what's<00:00:12.120><c> happened</c><00:00:12.420><c> in</c><00:00:12.780><c> the</c><00:00:12.900><c> past</c><00:00:13.139><c> but</c><00:00:14.099><c> there's</c>
what's happened in the past but there's
 
what's happened in the past but there's
another<00:00:14.580><c> kind</c><00:00:14.940><c> of</c><00:00:15.059><c> memory</c><00:00:15.859><c> prospective</c>
another kind of memory prospective
 
another kind of memory prospective
memory<00:00:17.279><c> is</c><00:00:17.760><c> your</c><00:00:18.000><c> memory</c><00:00:18.240><c> for</c><00:00:18.420><c> what</c><00:00:18.660><c> you</c><00:00:18.779><c> need</c>
memory is your memory for what you need
 
memory is your memory for what you need
to<00:00:19.080><c> do</c><00:00:19.260><c> later</c><00:00:19.560><c> this</c><00:00:20.460><c> is</c><00:00:20.580><c> your</c><00:00:20.760><c> brain's</c><00:00:21.119><c> to-do</c>
to do later this is your brain's to-do
 
to do later this is your brain's to-do
list<00:00:21.720><c> a</c><00:00:22.619><c> memory</c><00:00:22.859><c> to</c><00:00:23.100><c> be</c><00:00:23.220><c> recalled</c><00:00:23.699><c> in</c><00:00:23.880><c> a</c><00:00:24.060><c> future</c>
list a memory to be recalled in a future
 
list a memory to be recalled in a future
time<00:00:24.600><c> and</c><00:00:24.900><c> place</c>
time and place
 
time and place
and<00:00:26.340><c> it</c><00:00:26.580><c> is</c><00:00:26.760><c> fraught</c><00:00:27.359><c> with</c><00:00:27.539><c> forgetting</c><00:00:28.199><c> if</c><00:00:29.160><c> the</c>
and it is fraught with forgetting if the
 
and it is fraught with forgetting if the
right<00:00:29.640><c> cue</c><00:00:30.000><c> isn't</c><00:00:30.480><c> available</c><00:00:30.720><c> at</c><00:00:31.320><c> the</c><00:00:31.500><c> right</c>
right cue isn't available at the right
 
right cue isn't available at the right
place<00:00:32.040><c> and</c><00:00:32.399><c> at</c><00:00:32.579><c> the</c><00:00:32.759><c> right</c><00:00:32.940><c> time</c>
place and at the right time
 
place and at the right time
we<00:00:34.620><c> forget</c><00:00:34.800><c> to</c><00:00:35.219><c> do</c><00:00:35.460><c> what</c><00:00:35.880><c> we</c><00:00:36.120><c> intend</c><00:00:36.420><c> to</c><00:00:36.600><c> do</c><00:00:36.980><c> a</c>
we forget to do what we intend to do a
 
we forget to do what we intend to do a
lot
lot
 
lot
marketing<00:00:39.780><c> companies</c><00:00:40.200><c> take</c><00:00:40.620><c> advantage</c><00:00:41.100><c> of</c>
marketing companies take advantage of
 
marketing companies take advantage of
our<00:00:41.640><c> prospective</c><00:00:42.180><c> memory</c><00:00:42.540><c> failures</c><00:00:43.020><c> all</c><00:00:43.620><c> the</c>
our prospective memory failures all the
 
our prospective memory failures all the
time
time
 
time
have<00:00:45.480><c> you</c><00:00:45.600><c> ever</c><00:00:45.780><c> joined</c><00:00:46.260><c> an</c><00:00:46.440><c> online</c><00:00:46.680><c> exercise</c>
have you ever joined an online exercise
 
have you ever joined an online exercise
program<00:00:47.760><c> or</c><00:00:48.600><c> subscribed</c><00:00:49.079><c> to</c><00:00:49.320><c> something</c><00:00:49.559><c> for</c><00:00:49.980><c> a</c>
program or subscribed to something for a
 
program or subscribed to something for a
free<00:00:50.399><c> 30-day</c><00:00:50.940><c> trial</c><00:00:51.440><c> fully</c><00:00:52.440><c> planning</c><00:00:52.800><c> to</c>
free 30-day trial fully planning to
 
free 30-day trial fully planning to
cancel<00:00:53.280><c> or</c><00:00:53.700><c> unsubscribe</c><00:00:54.239><c> if</c><00:00:54.480><c> you</c><00:00:54.660><c> find</c><00:00:54.780><c> that</c>
cancel or unsubscribe if you find that
 
cancel or unsubscribe if you find that
you<00:00:55.140><c> don't</c><00:00:55.260><c> use</c><00:00:55.440><c> it</c><00:00:55.620><c> or</c><00:00:55.800><c> like</c><00:00:56.039><c> it</c>
you don't use it or like it
 
you don't use it or like it
and<00:00:57.239><c> what</c><00:00:57.420><c> happened</c>
and what happened
 
and what happened
you<00:00:58.920><c> get</c><00:00:59.100><c> your</c><00:00:59.340><c> next</c><00:00:59.520><c> credit</c><00:00:59.879><c> card</c><00:01:00.180><c> statement</c>
you get your next credit card statement
 
you get your next credit card statement
and<00:01:01.199><c> see</c><00:01:01.320><c> that</c><00:01:01.500><c> you've</c><00:01:01.739><c> been</c><00:01:01.860><c> charged</c><00:01:02.340><c> 99</c><00:01:02.760><c> for</c>
and see that you've been charged 99 for
 
and see that you've been charged 99 for
the<00:01:03.719><c> year</c><00:01:03.899><c> because</c><00:01:04.680><c> you</c><00:01:04.979><c> forgot</c><00:01:05.400><c> to</c>
the year because you forgot to
 
the year because you forgot to
unsubscribe
unsubscribe
 
unsubscribe
maybe<00:01:08.640><c> we</c><00:01:08.939><c> all</c><00:01:09.180><c> forget</c><00:01:09.360><c> to</c><00:01:09.659><c> remember</c><00:01:09.900><c> the</c>
maybe we all forget to remember the
 
maybe we all forget to remember the
little<00:01:10.619><c> things</c><00:01:11.040><c> that</c><00:01:11.760><c> aren't</c><00:01:11.880><c> life</c><00:01:12.240><c> and</c><00:01:12.420><c> death</c>
little things that aren't life and death
 
little things that aren't life and death
our<00:01:13.920><c> prospective</c><00:01:14.460><c> memories</c><00:01:14.880><c> for</c><00:01:15.240><c> high</c>
our prospective memories for high
 
our prospective memories for high
priority<00:01:16.020><c> tasks</c><00:01:16.680><c> immune</c><00:01:17.220><c> to</c><00:01:17.280><c> forgetting</c>
priority tasks immune to forgetting
 
priority tasks immune to forgetting
nope<00:01:19.520><c> prospective</c><00:01:20.520><c> memory</c><00:01:20.939><c> is</c><00:01:21.420><c> unreliable</c><00:01:22.259><c> no</c>
nope prospective memory is unreliable no
 
nope prospective memory is unreliable no
matter<00:01:23.040><c> the</c><00:01:23.340><c> stakes</c><00:01:23.759><c> no</c><00:01:24.299><c> matter</c><00:01:24.540><c> the</c><00:01:24.840><c> brain</c>
matter the stakes no matter the brain
 
matter the stakes no matter the brain
here<00:01:26.340><c> are</c><00:01:26.520><c> two</c><00:01:26.700><c> examples</c><00:01:27.320><c> the</c><00:01:28.320><c> world's</c><00:01:28.680><c> most</c>
here are two examples the world's most
 
here are two examples the world's most
famous<00:01:29.280><c> cellist</c><00:01:29.939><c> Yo-Yo</c><00:01:30.840><c> Ma</c><00:01:30.960><c> once</c><00:01:31.860><c> climbed</c>
famous cellist Yo-Yo Ma once climbed
 
famous cellist Yo-Yo Ma once climbed
into<00:01:32.400><c> a</c><00:01:32.700><c> New</c><00:01:32.820><c> York</c><00:01:32.939><c> City</c><00:01:33.119><c> Cab</c><00:01:33.560><c> wrote</c><00:01:34.560><c> about</c><00:01:34.680><c> 20</c>
into a New York City Cab wrote about 20
 
into a New York City Cab wrote about 20
minutes<00:01:35.280><c> to</c><00:01:35.579><c> the</c><00:01:35.759><c> Peninsula</c><00:01:36.299><c> Hotel</c><00:01:36.560><c> paid</c><00:01:37.560><c> the</c>
minutes to the Peninsula Hotel paid the
 
minutes to the Peninsula Hotel paid the
fare<00:01:38.220><c> and</c><00:01:38.700><c> got</c><00:01:38.880><c> out</c>
fare and got out
 
fare and got out
without<00:01:40.619><c> his</c><00:01:40.979><c> prized</c><00:01:41.400><c> possession</c><00:01:41.820><c> his</c><00:01:42.720><c> 2.5</c>
without his prized possession his 2.5
 
without his prized possession his 2.5
million<00:01:44.100><c> dollar</c><00:01:44.280><c> cello</c><00:01:44.939><c> he</c><00:01:45.840><c> forgot</c><00:01:46.140><c> to</c>
million dollar cello he forgot to
 
million dollar cello he forgot to
remember<00:01:46.680><c> to</c><00:01:47.040><c> get</c><00:01:47.220><c> it</c><00:01:47.340><c> out</c><00:01:47.520><c> of</c><00:01:47.640><c> the</c><00:01:47.759><c> trunk</c>
remember to get it out of the trunk
 
remember to get it out of the trunk
here's<00:01:50.159><c> another</c><00:01:50.280><c> between</c><00:01:51.259><c> 2005</c><00:01:52.259><c> and</c><00:01:52.500><c> 2012</c><00:01:53.220><c> in</c>
here's another between 2005 and 2012 in
 
here's another between 2005 and 2012 in
the<00:01:53.640><c> U.S</c><00:01:53.939><c> at</c><00:01:54.899><c> least</c>
the U.S at least
 
the U.S at least
 
were<00:02:01.860><c> left</c><00:02:02.159><c> inside</c><00:02:02.700><c> patients</c><00:02:04.140><c> these</c><00:02:04.799><c> surgeons</c>
were left inside patients these surgeons
 
were left inside patients these surgeons
with<00:02:06.000><c> very</c><00:02:06.299><c> smart</c><00:02:06.659><c> brains</c><00:02:07.259><c> forgot</c><00:02:08.099><c> to</c>
with very smart brains forgot to
 
with very smart brains forgot to
remember<00:02:08.640><c> to</c><00:02:09.000><c> remove</c><00:02:09.300><c> them</c>
remember to remove them
 
remember to remove them
our<00:02:11.099><c> human</c><00:02:11.280><c> brains</c><00:02:11.879><c> simply</c><00:02:12.599><c> are</c><00:02:12.959><c> not</c><00:02:13.319><c> designed</c>
our human brains simply are not designed
 
our human brains simply are not designed
to<00:02:14.400><c> remember</c><00:02:14.580><c> to</c><00:02:14.940><c> do</c><00:02:15.120><c> things</c><00:02:15.360><c> later</c><00:02:15.739><c> which</c><00:02:16.739><c> is</c>
to remember to do things later which is
 
to remember to do things later which is
why<00:02:17.280><c> it's</c><00:02:17.640><c> a</c><00:02:17.940><c> perfectly</c><00:02:18.239><c> valid</c><00:02:18.840><c> strategy</c><00:02:19.319><c> to</c>
why it's a perfectly valid strategy to
 
why it's a perfectly valid strategy to
Outsource<00:02:20.099><c> the</c><00:02:20.280><c> job</c>
Outsource the job
 
Outsource the job
make<00:02:21.780><c> to-do</c><00:02:22.260><c> lists</c><00:02:22.680><c> checklists</c><00:02:23.580><c> put</c><00:02:24.000><c> what</c><00:02:24.239><c> you</c>
make to-do lists checklists put what you
 
make to-do lists checklists put what you
want<00:02:24.540><c> to</c><00:02:24.660><c> remember</c><00:02:24.840><c> to</c><00:02:25.140><c> do</c><00:02:25.260><c> later</c><00:02:25.500><c> in</c><00:02:25.860><c> your</c>
want to remember to do later in your
 
want to remember to do later in your
calendar<00:02:26.340><c> use</c><00:02:27.239><c> pill</c><00:02:27.540><c> boxes</c><00:02:28.200><c> there</c><00:02:29.160><c> is</c><00:02:29.340><c> no</c>
calendar use pill boxes there is no
 
calendar use pill boxes there is no
shame<00:02:30.180><c> in</c><00:02:30.480><c> a</c><00:02:30.660><c> checklist</c>
shame in a checklist
 
shame in a checklist
Pilots<00:02:32.580><c> do</c><00:02:33.180><c> not</c><00:02:33.420><c> rely</c><00:02:33.840><c> on</c><00:02:34.080><c> their</c><00:02:34.319><c> unreliable</c>
Pilots do not rely on their unreliable
 
Pilots do not rely on their unreliable
prospective<00:02:35.700><c> memories</c><00:02:36.120><c> to</c><00:02:36.720><c> remember</c><00:02:36.900><c> to</c>
prospective memories to remember to
 
prospective memories to remember to
lower<00:02:37.500><c> the</c><00:02:37.860><c> wheels</c><00:02:38.160><c> of</c><00:02:38.340><c> the</c><00:02:38.580><c> plane</c><00:02:38.879><c> before</c>
lower the wheels of the plane before
 
lower the wheels of the plane before
landing
landing
 
landing
thankfully<00:02:42.599><c> they</c><00:02:43.260><c> use</c><00:02:43.440><c> checklists</c><00:02:44.640><c> surgeons</c>
thankfully they use checklists surgeons
 
thankfully they use checklists surgeons
use<00:02:45.660><c> them</c><00:02:45.900><c> now</c><00:02:46.140><c> to</c>
Kind: captions
Language: en
 
so<00:00:07.680><c> where</c><00:00:07.919><c> does</c><00:00:08.099><c> this</c><00:00:08.220><c> leave</c><00:00:08.460><c> us</c><00:00:08.639><c> with</c><00:00:09.000><c> respect</c>
so where does this leave us with respect
 
so where does this leave us with respect
to<00:00:09.599><c> our</c><00:00:09.720><c> relationship</c><00:00:10.260><c> with</c><00:00:10.620><c> memory</c>
to our relationship with memory
 
to our relationship with memory
how<00:00:12.059><c> should</c><00:00:12.240><c> we</c><00:00:12.420><c> hold</c><00:00:12.660><c> it</c>
how should we hold it
 
how should we hold it
here's<00:00:13.980><c> what</c><00:00:14.160><c> I</c><00:00:14.340><c> think</c>
here's what I think
 
here's what I think
memory<00:00:16.080><c> is</c><00:00:16.379><c> a</c><00:00:16.680><c> really</c><00:00:16.859><c> big</c><00:00:17.160><c> deal</c>
memory is a really big deal
 
memory is a really big deal
and<00:00:18.840><c> it's</c><00:00:19.199><c> not</c><00:00:19.440><c> such</c><00:00:19.680><c> a</c><00:00:19.859><c> big</c><00:00:19.920><c> deal</c>
and it's not such a big deal
 
and it's not such a big deal
maybe<00:00:21.359><c> we</c><00:00:21.720><c> can</c><00:00:21.840><c> take</c><00:00:22.080><c> it</c><00:00:22.380><c> seriously</c><00:00:23.100><c> but</c><00:00:23.880><c> hold</c>
maybe we can take it seriously but hold
 
maybe we can take it seriously but hold
it<00:00:24.420><c> lightly</c>
it lightly
 
it lightly
if<00:00:26.100><c> you</c><00:00:26.279><c> consider</c><00:00:26.640><c> memory</c><00:00:27.119><c> a</c><00:00:27.539><c> really</c><00:00:27.779><c> big</c><00:00:28.140><c> deal</c>
if you consider memory a really big deal
 
if you consider memory a really big deal
then<00:00:29.220><c> you'll</c><00:00:29.519><c> value</c><00:00:29.820><c> the</c><00:00:30.240><c> miracle</c><00:00:30.599><c> that</c><00:00:31.019><c> is</c>
then you'll value the miracle that is
 
then you'll value the miracle that is
your<00:00:31.439><c> human</c><00:00:31.679><c> memory</c><00:00:32.099><c> enough</c><00:00:32.460><c> to</c><00:00:32.759><c> take</c><00:00:32.940><c> good</c>
your human memory enough to take good
 
your human memory enough to take good
care<00:00:33.480><c> of</c><00:00:33.600><c> it</c><00:00:33.780><c> with</c><00:00:34.320><c> plenty</c><00:00:34.680><c> of</c><00:00:34.739><c> sleep</c><00:00:35.059><c> brain</c>
care of it with plenty of sleep brain
 
care of it with plenty of sleep brain
healthy<00:00:36.480><c> foods</c><00:00:36.980><c> regular</c><00:00:37.980><c> exercise</c><00:00:38.899><c> staying</c>
healthy foods regular exercise staying
 
healthy foods regular exercise staying
socially<00:00:40.379><c> and</c><00:00:40.739><c> cognitively</c><00:00:41.340><c> active</c><00:00:41.940><c> and</c>
socially and cognitively active and
 
socially and cognitively active and
lowering<00:00:43.079><c> your</c><00:00:43.320><c> reactivity</c><00:00:43.920><c> to</c><00:00:44.219><c> chronic</c>
lowering your reactivity to chronic
 
lowering your reactivity to chronic
stress
stress
 
stress
if<00:00:46.260><c> you</c><00:00:46.440><c> take</c><00:00:46.680><c> care</c><00:00:46.980><c> of</c><00:00:47.100><c> your</c><00:00:47.340><c> brain</c><00:00:47.579><c> and</c>
if you take care of your brain and
 
if you take care of your brain and
Supply<00:00:48.420><c> your</c><00:00:48.899><c> memory</c><00:00:49.140><c> with</c><00:00:49.440><c> what</c><00:00:49.620><c> it</c><00:00:49.739><c> needs</c>
Supply your memory with what it needs
 
Supply your memory with what it needs
for<00:00:50.219><c> creation</c><00:00:50.579><c> and</c><00:00:50.879><c> retrieval</c><00:00:51.899><c> it</c><00:00:52.379><c> will</c><00:00:52.500><c> serve</c>
for creation and retrieval it will serve
 
for creation and retrieval it will serve
you<00:00:52.920><c> well</c>
you well
 
you well
at<00:00:54.300><c> the</c><00:00:54.420><c> same</c><00:00:54.600><c> time</c><00:00:54.960><c> if</c><00:00:55.620><c> you</c><00:00:55.800><c> also</c><00:00:56.039><c> hold</c><00:00:56.280><c> memory</c>
at the same time if you also hold memory
 
at the same time if you also hold memory
as<00:00:57.059><c> not</c><00:00:57.420><c> such</c><00:00:57.600><c> a</c><00:00:57.780><c> big</c><00:00:57.899><c> deal</c><00:00:58.140><c> you'll</c><00:00:58.860><c> be</c><00:00:58.980><c> more</c>
as not such a big deal you'll be more
 
as not such a big deal you'll be more
forgiving<00:00:59.640><c> of</c><00:01:00.000><c> your</c><00:01:00.180><c> memory's</c><00:01:00.539><c> many</c><00:01:00.960><c> natural</c>
forgiving of your memory's many natural
 
forgiving of your memory's many natural
imperfections<00:01:02.480><c> you</c><00:01:03.480><c> won't</c><00:01:03.660><c> feel</c><00:01:03.960><c> shame</c><00:01:04.500><c> fear</c>
imperfections you won't feel shame fear
 
imperfections you won't feel shame fear
or<00:01:05.640><c> anxiety</c><00:01:06.119><c> when</c><00:01:06.780><c> it</c><00:01:07.020><c> inevitably</c><00:01:07.619><c> and</c>
or anxiety when it inevitably and
 
or anxiety when it inevitably and
regularly<00:01:08.939><c> forgets</c><00:01:09.659><c> because</c><00:01:10.380><c> you</c><00:01:10.920><c> know</c>
regularly forgets because you know
 
regularly forgets because you know
forgetting<00:01:11.880><c> is</c><00:01:12.060><c> a</c><00:01:12.299><c> normal</c><00:01:12.420><c> part</c><00:01:12.840><c> of</c><00:01:13.200><c> Being</c>
forgetting is a normal part of Being
 
forgetting is a normal part of Being
Human
Human
 
Human
while<00:01:15.240><c> the</c><00:01:15.479><c> ability</c><00:01:15.780><c> to</c><00:01:16.140><c> memorize</c><00:01:16.560><c> a</c><00:01:17.100><c> slew</c><00:01:17.400><c> of</c>
while the ability to memorize a slew of
 
while the ability to memorize a slew of
information<00:01:17.900><c> is</c><00:01:18.900><c> impressive</c><00:01:19.500><c> and</c><00:01:20.220><c> can</c><00:01:20.400><c> be</c>
information is impressive and can be
 
information is impressive and can be
useful<00:01:21.000><c> most</c><00:01:21.960><c> people</c><00:01:22.200><c> would</c><00:01:22.439><c> say</c><00:01:22.619><c> that</c>
useful most people would say that
 
useful most people would say that
remembering<00:01:23.220><c> the</c><00:01:23.520><c> details</c><00:01:23.880><c> of</c><00:01:24.119><c> what</c><00:01:24.479><c> happened</c>
remembering the details of what happened
 
remembering the details of what happened
in<00:01:25.020><c> your</c><00:01:25.200><c> life</c><00:01:25.380><c> is</c><00:01:25.979><c> more</c><00:01:26.220><c> important</c><00:01:26.659><c> but</c><00:01:27.659><c> it</c>
in your life is more important but it
 
in your life is more important but it
can't<00:01:28.020><c> be</c><00:01:28.200><c> that</c><00:01:28.439><c> important</c><00:01:28.799><c> because</c><00:01:29.220><c> you</c>
can't be that important because you
 
can't be that important because you
don't<00:01:29.759><c> actually</c><00:01:30.000><c> remember</c><00:01:30.420><c> most</c><00:01:30.900><c> of</c><00:01:31.140><c> it</c><00:01:31.259><c> our</c>
don't actually remember most of it our
 
don't actually remember most of it our
brains<00:01:32.580><c> are</c><00:01:32.880><c> not</c><00:01:33.119><c> designed</c><00:01:33.720><c> to</c><00:01:33.960><c> retain</c><00:01:34.380><c> what</c>
brains are not designed to retain what
 
brains are not designed to retain what
is<00:01:35.159><c> routine</c><00:01:35.579><c> or</c><00:01:35.759><c> predictable</c><00:01:36.240><c> and</c><00:01:37.140><c> most</c><00:01:37.439><c> of</c>
is routine or predictable and most of
 
is routine or predictable and most of
our<00:01:37.799><c> lives</c><00:01:38.100><c> are</c><00:01:38.340><c> spent</c><00:01:38.520><c> doing</c><00:01:38.820><c> routine</c>
our lives are spent doing routine
 
our lives are spent doing routine
predictable<00:01:40.020><c> things</c>
predictable things
 
predictable things
perhaps<00:01:42.299><c> a</c><00:01:42.540><c> more</c><00:01:42.720><c> reasonable</c><00:01:43.200><c> expectation</c><00:01:43.860><c> of</c>
perhaps a more reasonable expectation of
 
perhaps a more reasonable expectation of
memory<00:01:44.520><c> is</c><00:01:45.060><c> for</c><00:01:45.240><c> it</c><00:01:45.360><c> to</c><00:01:45.600><c> forget</c><00:01:45.720><c> everything</c>
memory is for it to forget everything
 
memory is for it to forget everything
except<00:01:47.400><c> for</c><00:01:47.640><c> what</c><00:01:47.880><c> is</c><00:01:48.060><c> Meaningful</c>
except for what is Meaningful
 
except for what is Meaningful
these<00:01:49.799><c> are</c><00:01:49.920><c> the</c><00:01:50.100><c> memories</c><00:01:50.399><c> that</c><00:01:50.700><c> provide</c><00:01:51.000><c> you</c>
these are the memories that provide you
 
these are the memories that provide you
with<00:01:51.360><c> a</c><00:01:51.540><c> sense</c><00:01:51.720><c> of</c><00:01:51.899><c> self</c><00:01:52.200><c> a</c><00:01:53.100><c> life</c><00:01:53.220><c> narrative</c>
with a sense of self a life narrative
 
with a sense of self a life narrative
and<00:01:54.479><c> the</c><00:01:54.600><c> potential</c><00:01:54.899><c> for</c><00:01:55.200><c> growth</c><00:01:55.619><c> and</c>
and the potential for growth and
 
and the potential for growth and
connection<00:01:55.979><c> with</c><00:01:56.460><c> others</c>
connection with others
 
connection with others
human<00:01:58.079><c> memory</c><00:01:58.560><c> wasn't</c><00:01:59.220><c> designed</c><00:01:59.820><c> to</c><00:02:00.000><c> be</c>
human memory wasn't designed to be
 
human memory wasn't designed to be
perfect<00:02:00.479><c> so</c><00:02:01.320><c> let's</c><00:02:01.500><c> let</c><00:02:01.860><c> go</c><00:02:02.100><c> of</c><00:02:02.280><c> that</c>
perfect so let's let go of that
 
perfect so let's let go of that
expectation
expectation
 
expectation
forgetting<00:02:04.860><c> can</c><00:02:05.159><c> be</c><00:02:05.340><c> a</c><00:02:05.520><c> sign</c><00:02:05.700><c> of</c><00:02:05.880><c> Alzheimer's</c>
forgetting can be a sign of Alzheimer's
 
forgetting can be a sign of Alzheimer's
and<00:02:06.960><c> it's</c><00:02:07.140><c> important</c><00:02:07.560><c> to</c><00:02:07.740><c> know</c><00:02:07.860><c> the</c><00:02:08.220><c> real</c>
and it's important to know the real
 
and it's important to know the real
signs<00:02:09.119><c> but</c><00:02:10.020><c> most</c><00:02:10.319><c> of</c><00:02:10.500><c> what</c><00:02:10.679><c> we</c><00:02:10.860><c> forget</c><00:02:11.039><c> every</c>
signs but most of what we forget every
 
signs but most of what we forget every
day<00:02:12.180><c> is</c><00:02:13.020><c> totally</c><00:02:13.440><c> normal</c>
day is totally normal
 
day is totally normal
our<00:02:15.540><c> brains</c><00:02:15.959><c> don't</c><00:02:16.500><c> remember</c><00:02:16.739><c> everything</c>
our brains don't remember everything
 
our brains don't remember everything
but<00:02:18.900><c> maybe</c><00:02:19.200><c> what</c><00:02:19.980><c> they</c><00:02:20.160><c> remember</c><00:02:20.400><c> is</c><00:02:21.300><c> enough</c>
Kind: captions
Language: en
 
information<00:00:06.960><c> that</c><00:00:07.620><c> is</c><00:00:07.799><c> paid</c><00:00:08.040><c> attention</c><00:00:08.400><c> to</c>
information that is paid attention to
 
information that is paid attention to
salvaged<00:00:10.080><c> from</c><00:00:10.320><c> the</c><00:00:10.559><c> doomed</c><00:00:10.920><c> fate</c><00:00:11.340><c> of</c><00:00:11.519><c> working</c>
salvaged from the doomed fate of working
 
salvaged from the doomed fate of working
memory<00:00:12.360><c> for</c><00:00:12.719><c> its</c><00:00:13.139><c> perceived</c><00:00:13.559><c> significance</c>
memory for its perceived significance
 
memory for its perceived significance
and<00:00:15.179><c> linked</c><00:00:15.660><c> by</c><00:00:15.839><c> the</c><00:00:16.020><c> hippocampus</c><00:00:16.740><c> can</c><00:00:17.340><c> become</c>
and linked by the hippocampus can become
 
and linked by the hippocampus can become
long-term<00:00:18.539><c> memories</c>
long-term memories
 
long-term memories
memory<00:00:20.520><c> for</c><00:00:20.820><c> the</c><00:00:21.000><c> knowledge</c><00:00:21.359><c> you've</c><00:00:21.720><c> learned</c>
memory for the knowledge you've learned
 
memory for the knowledge you've learned
the<00:00:22.920><c> facts</c><00:00:23.279><c> you</c><00:00:23.400><c> know</c><00:00:23.580><c> about</c><00:00:23.699><c> your</c><00:00:24.180><c> life</c><00:00:24.359><c> in</c>
the facts you know about your life in
 
the facts you know about your life in
the<00:00:24.840><c> world</c><00:00:25.080><c> is</c><00:00:25.800><c> called</c><00:00:26.100><c> semantic</c><00:00:26.880><c> memory</c>
the world is called semantic memory
 
the world is called semantic memory
semantic<00:00:28.560><c> memory</c><00:00:28.920><c> is</c><00:00:29.400><c> the</c><00:00:29.699><c> Wikipedia</c><00:00:30.420><c> of</c><00:00:30.720><c> your</c>
semantic memory is the Wikipedia of your
 
semantic memory is the Wikipedia of your
brain
brain
 
brain
because<00:00:32.759><c> every</c><00:00:33.180><c> piece</c><00:00:33.540><c> of</c><00:00:33.660><c> data</c><00:00:34.020><c> in</c><00:00:34.200><c> our</c><00:00:34.380><c> heads</c>
because every piece of data in our heads
 
because every piece of data in our heads
is<00:00:34.920><c> a</c><00:00:35.100><c> semantic</c><00:00:35.579><c> memory</c><00:00:36.059><c> if</c><00:00:36.660><c> we</c><00:00:36.840><c> want</c><00:00:37.079><c> to</c>
is a semantic memory if we want to
 
is a semantic memory if we want to
remember<00:00:37.440><c> a</c><00:00:37.920><c> lot</c><00:00:38.040><c> of</c><00:00:38.219><c> information</c><00:00:38.540><c> we</c><00:00:39.540><c> have</c><00:00:39.719><c> to</c>
remember a lot of information we have to
 
remember a lot of information we have to
be<00:00:40.200><c> really</c><00:00:40.559><c> good</c><00:00:40.920><c> at</c><00:00:41.700><c> creating</c><00:00:42.059><c> and</c>
be really good at creating and
 
be really good at creating and
retrieving<00:00:43.260><c> semantic</c><00:00:44.100><c> memories</c>
retrieving semantic memories
 
retrieving semantic memories
meaning<00:00:46.559><c> is</c><00:00:47.219><c> your</c><00:00:47.579><c> magical</c><00:00:48.059><c> ingredient</c><00:00:48.480><c> when</c>
meaning is your magical ingredient when
 
meaning is your magical ingredient when
it<00:00:49.440><c> comes</c><00:00:49.620><c> to</c><00:00:49.860><c> creating</c><00:00:50.280><c> and</c><00:00:50.460><c> recalling</c><00:00:51.059><c> any</c>
it comes to creating and recalling any
 
it comes to creating and recalling any
kind<00:00:51.660><c> of</c><00:00:51.840><c> memory</c>
kind of memory
 
kind of memory
here's<00:00:53.520><c> a</c><00:00:53.700><c> classic</c><00:00:53.879><c> study</c><00:00:54.420><c> illustrating</c><00:00:54.960><c> how</c>
here's a classic study illustrating how
 
here's a classic study illustrating how
this<00:00:55.559><c> is</c><00:00:55.680><c> true</c><00:00:55.860><c> for</c><00:00:56.160><c> semantic</c><00:00:56.760><c> memory</c>
this is true for semantic memory
 
this is true for semantic memory
veteran<00:00:59.520><c> taxi</c><00:00:59.940><c> drivers</c><00:01:00.420><c> and</c><00:01:00.719><c> drivers</c>
veteran taxi drivers and drivers
 
veteran taxi drivers and drivers
students<00:01:01.559><c> in</c><00:01:01.800><c> Helsinki</c><00:01:02.460><c> were</c><00:01:02.940><c> asked</c><00:01:03.239><c> to</c>
students in Helsinki were asked to
 
students in Helsinki were asked to
recall<00:01:03.660><c> a</c><00:01:03.960><c> list</c><00:01:04.080><c> of</c><00:01:04.260><c> streets</c><00:01:04.680><c> if</c><00:01:05.400><c> the</c><00:01:05.580><c> streets</c>
recall a list of streets if the streets
 
recall a list of streets if the streets
were<00:01:06.119><c> listed</c><00:01:06.479><c> in</c><00:01:06.720><c> an</c><00:01:06.900><c> order</c><00:01:07.020><c> that</c><00:01:07.380><c> could</c>
were listed in an order that could
 
were listed in an order that could
actually<00:01:07.860><c> be</c><00:01:08.220><c> driven</c><00:01:08.640><c> the</c><00:01:09.420><c> experienced</c><00:01:09.960><c> taxi</c>
actually be driven the experienced taxi
 
actually be driven the experienced taxi
drivers<00:01:10.799><c> could</c><00:01:11.040><c> recall</c><00:01:11.400><c> 87</c><00:01:12.119><c> percent</c><00:01:12.420><c> of</c><00:01:12.720><c> the</c>
drivers could recall 87 percent of the
 
drivers could recall 87 percent of the
streets<00:01:13.140><c> on</c><00:01:13.320><c> the</c><00:01:13.439><c> list</c><00:01:13.939><c> the</c><00:01:14.939><c> untrained</c>
streets on the list the untrained
 
streets on the list the untrained
drivers<00:01:15.960><c> only</c><00:01:16.200><c> remembered</c><00:01:16.799><c> 45</c><00:01:17.159><c> percent</c><00:01:17.700><c> but</c>
drivers only remembered 45 percent but
 
drivers only remembered 45 percent but
if<00:01:18.780><c> the</c><00:01:19.080><c> same</c><00:01:19.380><c> list</c><00:01:19.619><c> of</c><00:01:19.860><c> street</c><00:01:20.100><c> names</c><00:01:20.400><c> were</c>
if the same list of street names were
 
if the same list of street names were
presented<00:01:21.299><c> in</c><00:01:21.840><c> random</c><00:01:22.259><c> order</c><00:01:22.500><c> so</c><00:01:23.460><c> now</c><00:01:23.759><c> there</c>
presented in random order so now there
 
presented in random order so now there
was<00:01:24.180><c> no</c><00:01:24.540><c> meaningful</c><00:01:24.960><c> driving</c><00:01:25.259><c> route</c><00:01:25.619><c> between</c>
was no meaningful driving route between
 
was no meaningful driving route between
the<00:01:26.400><c> streets</c><00:01:26.820><c> then</c><00:01:27.600><c> the</c><00:01:27.900><c> veteran</c><00:01:28.259><c> drivers</c>
the streets then the veteran drivers
 
the streets then the veteran drivers
lost<00:01:29.159><c> their</c><00:01:29.520><c> retrieval</c><00:01:30.000><c> advantage</c><00:01:30.540><c> and</c>
lost their retrieval advantage and
 
lost their retrieval advantage and
remembered<00:01:31.680><c> the</c><00:01:32.100><c> same</c><00:01:32.340><c> number</c><00:01:32.640><c> of</c><00:01:32.880><c> streets</c><00:01:33.360><c> as</c>
remembered the same number of streets as
 
remembered the same number of streets as
the<00:01:34.140><c> students</c>
Kind: captions
Language: en
 
the<00:00:07.200><c> science</c><00:00:07.440><c> on</c><00:00:07.919><c> sleep</c><00:00:08.300><c> is</c><00:00:09.300><c> very</c><00:00:09.660><c> clear</c><00:00:09.960><c> on</c>
the science on sleep is very clear on
 
the science on sleep is very clear on
the<00:00:10.740><c> fact</c><00:00:10.860><c> that</c><00:00:11.160><c> human</c><00:00:11.460><c> adults</c><00:00:12.059><c> need</c><00:00:12.360><c> seven</c><00:00:12.840><c> to</c>
the fact that human adults need seven to
 
the fact that human adults need seven to
nine<00:00:13.259><c> hours</c><00:00:13.559><c> of</c><00:00:13.920><c> sleep</c><00:00:14.099><c> a</c><00:00:14.340><c> night</c><00:00:14.519><c> to</c><00:00:14.820><c> function</c>
nine hours of sleep a night to function
 
nine hours of sleep a night to function
optimally
optimally
 
optimally
here<00:00:16.980><c> are</c><00:00:17.220><c> three</c><00:00:17.640><c> reasons</c><00:00:18.119><c> why</c><00:00:18.420><c> sleep</c><00:00:18.720><c> is</c>
here are three reasons why sleep is
 
here are three reasons why sleep is
essential<00:00:19.800><c> for</c><00:00:20.100><c> optimal</c><00:00:20.580><c> memory</c>
essential for optimal memory
 
essential for optimal memory
number<00:00:22.080><c> one</c>
number one
 
number one
the<00:00:23.820><c> information</c><00:00:24.000><c> that</c><00:00:24.480><c> we</c><00:00:24.660><c> paid</c><00:00:24.900><c> attention</c>
the information that we paid attention
 
the information that we paid attention
to<00:00:25.680><c> cared</c><00:00:26.580><c> about</c><00:00:26.840><c> learned</c><00:00:27.840><c> and</c><00:00:28.080><c> practiced</c>
to cared about learned and practiced
 
to cared about learned and practiced
today<00:00:29.180><c> becomes</c><00:00:30.180><c> linked</c><00:00:30.720><c> into</c><00:00:30.900><c> a</c><00:00:31.320><c> lasting</c>
today becomes linked into a lasting
 
today becomes linked into a lasting
memory<00:00:32.160><c> while</c><00:00:33.059><c> we</c><00:00:33.360><c> sleep</c><00:00:33.600><c> if</c><00:00:34.440><c> you</c><00:00:34.620><c> didn't</c><00:00:34.739><c> get</c>
memory while we sleep if you didn't get
 
memory while we sleep if you didn't get
enough<00:00:35.100><c> sleep</c><00:00:35.399><c> last</c><00:00:35.820><c> night</c><00:00:36.059><c> your</c><00:00:36.719><c> hippocampus</c>
enough sleep last night your hippocampus
 
enough sleep last night your hippocampus
and<00:00:37.620><c> basal</c><00:00:38.100><c> ganglia</c><00:00:38.579><c> might</c><00:00:39.239><c> not</c><00:00:39.420><c> have</c><00:00:39.600><c> had</c>
and basal ganglia might not have had
 
and basal ganglia might not have had
enough<00:00:39.960><c> time</c><00:00:40.260><c> to</c><00:00:40.500><c> complete</c><00:00:40.920><c> their</c><00:00:41.160><c> jobs</c><00:00:41.399><c> and</c>
enough time to complete their jobs and
 
enough time to complete their jobs and
so<00:00:42.420><c> your</c><00:00:42.600><c> memories</c><00:00:43.020><c> from</c><00:00:43.320><c> yesterday</c><00:00:43.620><c> might</c><00:00:44.520><c> be</c>
so your memories from yesterday might be
 
so your memories from yesterday might be
only<00:00:44.940><c> partially</c><00:00:45.480><c> formed</c><00:00:46.079><c> weak</c><00:00:46.680><c> or</c><00:00:47.280><c> even</c>
only partially formed weak or even
 
only partially formed weak or even
missing
missing
 
missing
number<00:00:49.739><c> two</c><00:00:50.039><c> a</c><00:00:50.940><c> good</c><00:00:51.059><c> night's</c><00:00:51.480><c> sleep</c>
number two a good night's sleep
 
number two a good night's sleep
recharges<00:00:52.620><c> your</c><00:00:52.920><c> brain</c><00:00:53.219><c> allowing</c><00:00:54.059><c> you</c><00:00:54.180><c> to</c>
recharges your brain allowing you to
 
recharges your brain allowing you to
feel<00:00:54.660><c> refreshed</c><00:00:55.379><c> alert</c><00:00:55.980><c> and</c><00:00:56.579><c> able</c><00:00:56.879><c> to</c><00:00:57.000><c> pay</c>
feel refreshed alert and able to pay
 
feel refreshed alert and able to pay
attention<00:00:57.660><c> when</c><00:00:58.079><c> you're</c><00:00:58.199><c> awake</c>
attention when you're awake
 
attention when you're awake
if<00:00:59.699><c> you</c><00:00:59.820><c> didn't</c><00:00:59.940><c> get</c><00:01:00.239><c> enough</c><00:01:00.360><c> sleep</c><00:01:00.719><c> last</c>
if you didn't get enough sleep last
 
if you didn't get enough sleep last
night<00:01:01.320><c> you</c><00:01:01.980><c> might</c><00:01:02.100><c> not</c><00:01:02.280><c> feel</c><00:01:02.640><c> so</c><00:01:02.879><c> alert</c><00:01:03.239><c> or</c>
night you might not feel so alert or
 
night you might not feel so alert or
able<00:01:03.960><c> to</c><00:01:04.080><c> focus</c><00:01:04.500><c> your</c><00:01:04.799><c> attention</c><00:01:05.159><c> today</c>
able to focus your attention today
 
able to focus your attention today
and<00:01:06.600><c> if</c><00:01:06.780><c> you</c><00:01:06.960><c> can't</c><00:01:07.140><c> pay</c><00:01:07.439><c> attention</c><00:01:07.799><c> today</c>
and if you can't pay attention today
 
and if you can't pay attention today
what<00:01:09.240><c> are</c><00:01:09.360><c> you</c><00:01:09.479><c> gonna</c><00:01:09.600><c> have</c><00:01:09.840><c> a</c><00:01:10.020><c> hard</c><00:01:10.140><c> time</c>
what are you gonna have a hard time
 
what are you gonna have a hard time
creating
creating
 
creating
new<00:01:12.060><c> memories</c>
new memories
 
new memories
number<00:01:13.799><c> three</c>
number three
 
number three
a<00:01:15.420><c> growing</c><00:01:15.720><c> body</c><00:01:16.020><c> of</c><00:01:16.380><c> evidence</c><00:01:16.680><c> suggests</c><00:01:17.400><c> that</c>
a growing body of evidence suggests that
 
a growing body of evidence suggests that
sleep<00:01:18.060><c> is</c><00:01:18.960><c> critical</c><00:01:19.320><c> for</c><00:01:19.560><c> reducing</c><00:01:20.100><c> your</c><00:01:20.280><c> risk</c>
sleep is critical for reducing your risk
 
sleep is critical for reducing your risk
of<00:01:20.700><c> Alzheimer's</c><00:01:21.360><c> disease</c>
of Alzheimer's disease
 
of Alzheimer's disease
Alzheimer's<00:01:23.580><c> is</c><00:01:23.759><c> triggered</c><00:01:24.240><c> by</c><00:01:24.540><c> an</c>
Alzheimer's is triggered by an
 
Alzheimer's is triggered by an
accumulation<00:01:25.259><c> of</c><00:01:25.560><c> amyloid</c><00:01:26.100><c> plaques</c>
accumulation of amyloid plaques
 
accumulation of amyloid plaques
normally<00:01:27.900><c> amyloid</c><00:01:28.619><c> is</c><00:01:28.799><c> cleared</c><00:01:29.280><c> away</c><00:01:29.400><c> and</c>
normally amyloid is cleared away and
 
normally amyloid is cleared away and
metabolized<00:01:30.720><c> by</c><00:01:30.900><c> glial</c><00:01:31.320><c> cells</c><00:01:31.799><c> your</c><00:01:32.520><c> brain's</c>
metabolized by glial cells your brain's
 
metabolized by glial cells your brain's
sewage<00:01:33.299><c> and</c><00:01:33.540><c> sanitation</c><00:01:34.020><c> department</c><00:01:34.880><c> this</c>
sewage and sanitation department this
 
sewage and sanitation department this
happens<00:01:36.299><c> while</c><00:01:37.140><c> you</c><00:01:37.380><c> sleep</c>
happens while you sleep
 
happens while you sleep
deep<00:01:39.180><c> sleep</c><00:01:39.420><c> in</c><00:01:39.960><c> particular</c><00:01:40.320><c> is</c><00:01:40.860><c> like</c><00:01:41.100><c> a</c><00:01:41.340><c> power</c>
deep sleep in particular is like a power
 
deep sleep in particular is like a power
cleanse<00:01:42.000><c> for</c><00:01:42.119><c> your</c><00:01:42.360><c> brain</c>
cleanse for your brain
 
cleanse for your brain
if<00:01:43.680><c> you</c><00:01:43.799><c> shortchange</c><00:01:44.400><c> yourself</c><00:01:44.640><c> on</c><00:01:45.000><c> deep</c>
if you shortchange yourself on deep
 
if you shortchange yourself on deep
sleep<00:01:45.479><c> your</c><00:01:46.020><c> glial</c><00:01:46.259><c> cells</c><00:01:46.680><c> won't</c><00:01:46.799><c> have</c><00:01:47.040><c> enough</c>
sleep your glial cells won't have enough
 
sleep your glial cells won't have enough
time<00:01:47.460><c> to</c><00:01:47.640><c> finish</c><00:01:47.820><c> cleaning</c><00:01:48.299><c> your</c><00:01:48.540><c> brain</c><00:01:48.840><c> and</c>
time to finish cleaning your brain and
 
time to finish cleaning your brain and
you'll<00:01:49.500><c> wake</c><00:01:49.680><c> up</c><00:01:49.860><c> in</c><00:01:50.040><c> the</c><00:01:50.159><c> morning</c><00:01:50.280><c> with</c>
you'll wake up in the morning with
 
you'll wake up in the morning with
uncleared<00:01:51.299><c> amyloid</c><00:01:51.780><c> plaques</c><00:01:52.259><c> and</c><00:01:52.380><c> your</c>
uncleared amyloid plaques and your
 
uncleared amyloid plaques and your
synapses<00:01:53.040><c> from</c><00:01:53.399><c> yesterday</c>
synapses from yesterday
 
synapses from yesterday
increasing<00:01:55.259><c> your</c><00:01:55.439><c> risk</c><00:01:55.680><c> of</c><00:01:55.860><c> developing</c>
increasing your risk of developing
 
increasing your risk of developing
Alzheimer's
Alzheimer's
 
Alzheimer's
I<00:01:58.380><c> don't</c><00:01:58.439><c> know</c><00:01:58.619><c> about</c><00:01:58.740><c> you</c><00:01:59.100><c> but</c><00:01:59.520><c> I've</c><00:01:59.759><c> been</c>
I don't know about you but I've been
 
I don't know about you but I've been
sleep<00:02:00.180><c> deprived</c><00:02:00.780><c> for</c><00:02:01.200><c> decades</c><00:02:02.159><c> work</c><00:02:03.000><c> birthing</c>
sleep deprived for decades work birthing
 
sleep deprived for decades work birthing
and<00:02:03.780><c> raising</c><00:02:04.200><c> three</c><00:02:04.439><c> children</c><00:02:04.799><c> Netflix</c>
and raising three children Netflix
 
and raising three children Netflix
binging<00:02:06.619><c> worrying</c><00:02:07.700><c> perimenopause</c><00:02:08.700><c> I'm</c><00:02:09.599><c> 51.</c>
binging worrying perimenopause I'm 51.
 
binging worrying perimenopause I'm 51.
is<00:02:11.160><c> it</c><00:02:11.400><c> too</c><00:02:11.580><c> late</c><00:02:11.700><c> for</c><00:02:12.000><c> me</c>
is it too late for me
 
is it too late for me
here's<00:02:13.739><c> the</c><00:02:13.980><c> very</c><00:02:14.220><c> good</c><00:02:14.400><c> news</c><00:02:14.840><c> however</c><00:02:15.840><c> sleep</c>
here's the very good news however sleep
 
here's the very good news however sleep
deprived<00:02:16.800><c> you've</c><00:02:17.160><c> already</c><00:02:17.459><c> been</c><00:02:17.760><c> in</c><00:02:17.940><c> your</c>
deprived you've already been in your
 
deprived you've already been in your
life<00:02:18.300><c> is</c><00:02:19.020><c> water</c><00:02:19.319><c> under</c><00:02:19.620><c> the</c><00:02:19.920><c> bridge</c><00:02:20.300><c> you</c><00:02:21.300><c> can</c>
life is water under the bridge you can
 
life is water under the bridge you can
secure<00:02:21.900><c> what</c><00:02:22.140><c> you've</c><00:02:22.379><c> learned</c><00:02:22.620><c> today</c><00:02:22.920><c> and</c>
secure what you've learned today and
 
secure what you've learned today and
reduce<00:02:23.879><c> your</c><00:02:24.239><c> risk</c><00:02:24.480><c> of</c><00:02:24.599><c> developing</c>
reduce your risk of developing
 
reduce your risk of developing
Alzheimer's<00:02:25.739><c> in</c><00:02:25.920><c> the</c><00:02:26.040><c> future</c><00:02:26.220><c> by</c><00:02:26.940><c> getting</c>
Alzheimer's in the future by getting
 
Alzheimer's in the future by getting
enough<00:02:27.420><c> sleep</c><00:02:27.780><c> tonight</c>
Kind: captions
Language: en
 
an<00:00:07.140><c> average</c><00:00:07.319><c> brain</c><00:00:07.859><c> is</c><00:00:08.220><c> estimated</c><00:00:08.700><c> to</c><00:00:09.000><c> contain</c>
an average brain is estimated to contain
 
an average brain is estimated to contain
over<00:00:09.900><c> a</c><00:00:10.320><c> hundred</c><00:00:10.800><c> trillion</c><00:00:11.519><c> neural</c>
over a hundred trillion neural
 
over a hundred trillion neural
connections<00:00:12.660><c> called</c><00:00:13.380><c> synapses</c><00:00:14.160><c> and</c><00:00:15.000><c> this</c>
connections called synapses and this
 
connections called synapses and this
isn't<00:00:15.480><c> a</c><00:00:15.719><c> static</c><00:00:16.020><c> number</c><00:00:16.279><c> we</c><00:00:17.279><c> gain</c><00:00:17.580><c> and</c><00:00:17.820><c> lose</c>
isn't a static number we gain and lose
 
isn't a static number we gain and lose
synapses<00:00:18.660><c> all</c><00:00:19.140><c> the</c><00:00:19.320><c> time</c>
synapses all the time
 
synapses all the time
every<00:00:20.820><c> time</c><00:00:21.000><c> we</c><00:00:21.180><c> learn</c><00:00:21.359><c> something</c><00:00:21.720><c> new</c><00:00:22.140><c> we're</c>
every time we learn something new we're
 
every time we learn something new we're
creating<00:00:23.340><c> new</c><00:00:23.760><c> synapses</c>
creating new synapses
 
creating new synapses
so<00:00:25.740><c> how</c><00:00:25.920><c> might</c><00:00:26.100><c> learning</c><00:00:26.580><c> something</c><00:00:26.760><c> new</c><00:00:27.060><c> help</c>
so how might learning something new help
 
so how might learning something new help
us<00:00:27.840><c> when</c><00:00:28.140><c> it</c><00:00:28.260><c> comes</c><00:00:28.439><c> to</c><00:00:28.680><c> Alzheimer's</c>
us when it comes to Alzheimer's
 
us when it comes to Alzheimer's
the<00:00:30.660><c> symptoms</c><00:00:30.840><c> of</c><00:00:31.199><c> Alzheimer's</c><00:00:31.920><c> are</c>
the symptoms of Alzheimer's are
 
the symptoms of Alzheimer's are
ultimately<00:00:32.579><c> caused</c><00:00:33.120><c> by</c><00:00:33.420><c> a</c><00:00:33.600><c> loss</c><00:00:33.899><c> of</c><00:00:34.020><c> synapses</c>
ultimately caused by a loss of synapses
 
ultimately caused by a loss of synapses
but<00:00:35.940><c> what</c><00:00:36.239><c> if</c><00:00:36.420><c> for</c><00:00:36.840><c> every</c><00:00:37.020><c> synapse</c><00:00:37.559><c> we</c><00:00:37.739><c> lose</c>
but what if for every synapse we lose
 
but what if for every synapse we lose
we've<00:00:39.000><c> already</c><00:00:39.120><c> created</c><00:00:39.660><c> backup</c>
we've already created backup
 
we've already created backup
we<00:00:41.640><c> call</c><00:00:41.820><c> this</c><00:00:42.059><c> backup</c><00:00:42.480><c> cognitive</c><00:00:43.079><c> reserve</c>
we call this backup cognitive reserve
 
we call this backup cognitive reserve
and<00:00:44.280><c> you</c><00:00:44.399><c> create</c><00:00:44.640><c> it</c><00:00:44.879><c> by</c><00:00:45.059><c> learning</c><00:00:45.420><c> new</c><00:00:45.660><c> things</c>
and you create it by learning new things
 
and you create it by learning new things
people<00:00:47.879><c> who</c><00:00:48.180><c> have</c><00:00:48.360><c> more</c><00:00:48.600><c> years</c><00:00:48.780><c> of</c><00:00:49.079><c> formal</c>
people who have more years of formal
 
people who have more years of formal
education<00:00:49.920><c> who</c><00:00:50.460><c> have</c><00:00:50.640><c> a</c><00:00:50.760><c> greater</c><00:00:51.059><c> degree</c><00:00:51.300><c> of</c>
education who have a greater degree of
 
education who have a greater degree of
literacy<00:00:52.079><c> and</c><00:00:52.680><c> who</c><00:00:52.920><c> engage</c><00:00:53.460><c> regularly</c><00:00:54.239><c> and</c>
literacy and who engage regularly and
 
literacy and who engage regularly and
socially<00:00:55.199><c> and</c><00:00:55.620><c> mentally</c><00:00:56.039><c> stimulating</c>
socially and mentally stimulating
 
socially and mentally stimulating
activities<00:00:57.420><c> have</c><00:00:58.320><c> more</c><00:00:58.739><c> cognitive</c><00:00:59.160><c> Reserve</c>
activities have more cognitive Reserve
 
activities have more cognitive Reserve
so<00:01:00.960><c> if</c><00:01:01.199><c> Alzheimer's</c><00:01:01.860><c> begins</c><00:01:02.219><c> attacking</c>
so if Alzheimer's begins attacking
 
so if Alzheimer's begins attacking
synapses<00:01:03.420><c> in</c><00:01:03.660><c> these</c><00:01:03.899><c> brains</c><00:01:04.320><c> the</c><00:01:05.220><c> backup</c>
synapses in these brains the backup
 
synapses in these brains the backup
synapses<00:01:06.119><c> might</c><00:01:06.420><c> buffer</c><00:01:06.840><c> these</c><00:01:07.080><c> folks</c><00:01:07.320><c> from</c>
synapses might buffer these folks from
 
synapses might buffer these folks from
noticing<00:01:07.920><c> that</c><00:01:08.159><c> anything</c><00:01:08.340><c> is</c><00:01:08.640><c> amiss</c>
noticing that anything is amiss
 
noticing that anything is amiss
as<00:01:10.320><c> a</c><00:01:10.560><c> result</c><00:01:10.680><c> people</c><00:01:11.520><c> with</c><00:01:11.880><c> a</c><00:01:12.119><c> lot</c><00:01:12.180><c> of</c>
as a result people with a lot of
 
as a result people with a lot of
cognitive<00:01:12.780><c> Reserve</c><00:01:13.380><c> have</c><00:01:13.920><c> a</c><00:01:14.100><c> reduced</c><00:01:14.520><c> risk</c><00:01:14.820><c> of</c>
cognitive Reserve have a reduced risk of
 
cognitive Reserve have a reduced risk of
being<00:01:15.299><c> diagnosed</c><00:01:16.020><c> with</c><00:01:16.260><c> Alzheimer's</c><00:01:16.979><c> even</c><00:01:17.700><c> if</c>
being diagnosed with Alzheimer's even if
 
being diagnosed with Alzheimer's even if
the<00:01:18.119><c> disease</c><00:01:18.479><c> pathology</c><00:01:18.960><c> is</c><00:01:19.500><c> present</c><00:01:19.799><c> in</c>
the disease pathology is present in
 
the disease pathology is present in
their<00:01:20.220><c> brains</c>
their brains
 
their brains
by<00:01:21.840><c> the</c><00:01:22.020><c> way</c><00:01:22.140><c> there</c><00:01:23.100><c> is</c><00:01:23.280><c> zero</c><00:01:23.700><c> evidence</c><00:01:24.000><c> that</c>
by the way there is zero evidence that
 
by the way there is zero evidence that
doing<00:01:24.479><c> crossword</c><00:01:24.840><c> puzzles</c><00:01:25.500><c> improves</c><00:01:25.979><c> your</c>
doing crossword puzzles improves your
 
doing crossword puzzles improves your
memory<00:01:26.580><c> or</c><00:01:27.360><c> reduces</c><00:01:27.780><c> your</c><00:01:28.020><c> risk</c><00:01:28.200><c> of</c>
memory or reduces your risk of
 
memory or reduces your risk of
developing<00:01:28.740><c> Alzheimer's</c><00:01:30.000><c> you'll</c><00:01:30.479><c> get</c><00:01:30.659><c> better</c>
developing Alzheimer's you'll get better
 
developing Alzheimer's you'll get better
at<00:01:31.140><c> doing</c><00:01:31.380><c> crosswords</c><00:01:32.220><c> if</c><00:01:32.400><c> you</c><00:01:32.580><c> do</c><00:01:32.700><c> crosswords</c>
at doing crosswords if you do crosswords
 
at doing crosswords if you do crosswords
but<00:01:34.320><c> this</c><00:01:34.560><c> skill</c><00:01:34.740><c> doesn't</c><00:01:35.040><c> transfer</c><00:01:35.579><c> to</c><00:01:35.759><c> being</c>
but this skill doesn't transfer to being
 
but this skill doesn't transfer to being
better<00:01:36.180><c> able</c><00:01:36.540><c> to</c><00:01:36.659><c> remember</c><00:01:36.900><c> where</c><00:01:37.259><c> you</c><00:01:37.380><c> left</c>
better able to remember where you left
 
better able to remember where you left
your<00:01:37.740><c> glasses</c><00:01:38.220><c> or</c><00:01:39.000><c> remembering</c><00:01:39.420><c> more</c><00:01:39.600><c> of</c><00:01:39.720><c> what</c>
your glasses or remembering more of what
 
your glasses or remembering more of what
happened<00:01:40.079><c> yesterday</c>
happened yesterday
 
happened yesterday
to<00:01:42.060><c> create</c><00:01:42.240><c> more</c><00:01:42.600><c> synapses</c><00:01:43.320><c> and</c><00:01:44.159><c> a</c><00:01:44.280><c> cognitive</c>
to create more synapses and a cognitive
 
to create more synapses and a cognitive
Reserve<00:01:45.299><c> you're</c><00:01:46.079><c> better</c><00:01:46.320><c> off</c><00:01:46.619><c> learning</c><00:01:47.340><c> new</c>
Reserve you're better off learning new
 
Reserve you're better off learning new
things
Kind: captions
Language: en
 
remember<00:00:06.660><c> Henry</c><00:00:07.200><c> malleason</c><00:00:07.880><c> without</c><00:00:08.880><c> a</c>
remember Henry malleason without a
 
remember Henry malleason without a
hippocampus<00:00:09.840><c> he</c><00:00:10.440><c> could</c><00:00:10.679><c> not</c><00:00:10.860><c> create</c><00:00:11.219><c> any</c><00:00:11.820><c> new</c>
hippocampus he could not create any new
 
hippocampus he could not create any new
consciously<00:00:12.660><c> held</c><00:00:13.019><c> long-term</c><00:00:13.559><c> memories</c><00:00:14.460><c> but</c>
consciously held long-term memories but
 
consciously held long-term memories but
he<00:00:15.240><c> didn't</c><00:00:15.420><c> lose</c><00:00:15.780><c> his</c><00:00:16.080><c> memory</c><00:00:16.379><c> for</c><00:00:16.680><c> everything</c>
he didn't lose his memory for everything
 
he didn't lose his memory for everything
he<00:00:18.240><c> could</c><00:00:18.420><c> remember</c><00:00:18.720><c> information</c><00:00:19.199><c> long</c>
he could remember information long
 
he could remember information long
enough<00:00:20.160><c> to</c><00:00:20.520><c> comprehend</c><00:00:21.000><c> what</c><00:00:21.359><c> someone</c><00:00:21.600><c> just</c>
enough to comprehend what someone just
 
enough to comprehend what someone just
said<00:00:22.140><c> to</c><00:00:22.320><c> him</c><00:00:22.500><c> as</c><00:00:23.340><c> long</c><00:00:23.520><c> as</c><00:00:23.699><c> what</c><00:00:24.000><c> was</c><00:00:24.180><c> said</c><00:00:24.480><c> was</c>
said to him as long as what was said was
 
said to him as long as what was said was
brief<00:00:25.560><c> and</c><00:00:25.920><c> Henry</c><00:00:26.279><c> wasn't</c><00:00:26.519><c> distracted</c>
brief and Henry wasn't distracted
 
brief and Henry wasn't distracted
if<00:00:28.439><c> his</c><00:00:28.619><c> doctor</c><00:00:28.920><c> had</c><00:00:29.220><c> said</c><00:00:29.460><c> to</c><00:00:29.640><c> him</c><00:00:29.820><c> Henry</c>
if his doctor had said to him Henry
 
if his doctor had said to him Henry
repeat<00:00:30.840><c> this</c><00:00:31.260><c> sentence</c><00:00:31.679><c> I</c><00:00:32.520><c> love</c><00:00:32.640><c> to</c><00:00:32.880><c> eat</c>
repeat this sentence I love to eat
 
repeat this sentence I love to eat
spaghetti<00:00:34.140><c> Henry</c><00:00:34.860><c> would</c><00:00:35.160><c> have</c><00:00:35.280><c> been</c><00:00:35.399><c> able</c><00:00:35.640><c> to</c>
spaghetti Henry would have been able to
 
spaghetti Henry would have been able to
successfully<00:00:36.420><c> remember</c><00:00:36.600><c> and</c><00:00:37.020><c> repeat</c><00:00:37.260><c> it</c><00:00:37.500><c> back</c>
successfully remember and repeat it back
 
successfully remember and repeat it back
but<00:00:38.640><c> he</c><00:00:38.880><c> would</c><00:00:39.059><c> have</c><00:00:39.239><c> completely</c><00:00:39.960><c> forgotten</c>
but he would have completely forgotten
 
but he would have completely forgotten
both<00:00:41.340><c> I</c><00:00:41.879><c> love</c><00:00:42.059><c> to</c><00:00:42.239><c> eat</c><00:00:42.420><c> spaghetti</c><00:00:43.020><c> and</c><00:00:43.739><c> that</c>
both I love to eat spaghetti and that
 
both I love to eat spaghetti and that
his<00:00:44.100><c> doctor</c><00:00:44.280><c> had</c><00:00:44.700><c> ever</c><00:00:44.940><c> asked</c><00:00:45.360><c> him</c><00:00:45.480><c> to</c>
his doctor had ever asked him to
 
his doctor had ever asked him to
remember<00:00:45.899><c> this</c><00:00:46.320><c> a</c><00:00:46.920><c> minute</c><00:00:47.040><c> later</c>
remember this a minute later
 
remember this a minute later
but<00:00:48.719><c> how</c><00:00:48.899><c> could</c><00:00:49.079><c> he</c><00:00:49.260><c> remember</c><00:00:49.440><c> anything</c>
but how could he remember anything
 
but how could he remember anything
without<00:00:50.940><c> a</c><00:00:51.180><c> hippocampus</c><00:00:51.899><c> well</c><00:00:52.739><c> Henry</c><00:00:53.160><c> still</c>
without a hippocampus well Henry still
 
without a hippocampus well Henry still
had<00:00:53.760><c> his</c><00:00:54.000><c> prefrontal</c><00:00:54.660><c> cortex</c><00:00:55.260><c> and</c><00:00:56.039><c> this</c><00:00:56.280><c> is</c>
had his prefrontal cortex and this is
 
had his prefrontal cortex and this is
the<00:00:56.760><c> primary</c><00:00:57.180><c> place</c><00:00:57.539><c> where</c><00:00:58.140><c> the</c><00:00:58.379><c> present</c>
the primary place where the present
 
the primary place where the present
moment<00:00:59.160><c> is</c><00:00:59.460><c> remembered</c>
moment is remembered
 
moment is remembered
whatever<00:01:01.559><c> is</c><00:01:01.980><c> held</c><00:01:02.280><c> in</c><00:01:02.399><c> your</c><00:01:02.579><c> awareness</c><00:01:03.059><c> right</c>
whatever is held in your awareness right
 
whatever is held in your awareness right
now<00:01:03.899><c> is</c><00:01:04.559><c> called</c><00:01:04.799><c> your</c><00:01:05.159><c> working</c><00:01:05.339><c> memory</c><00:01:05.960><c> it's</c><00:01:06.960><c> a</c>
now is called your working memory it's a
 
now is called your working memory it's a
small<00:01:07.619><c> and</c><00:01:07.860><c> short-lived</c><00:01:08.460><c> holding</c><00:01:08.820><c> space</c><00:01:09.060><c> for</c>
small and short-lived holding space for
 
small and short-lived holding space for
the<00:01:09.900><c> sights</c><00:01:10.439><c> sound</c><00:01:10.740><c> smells</c><00:01:11.340><c> tastes</c><00:01:11.820><c> emotions</c>
the sights sound smells tastes emotions
 
the sights sound smells tastes emotions
and<00:01:12.540><c> language</c><00:01:12.840><c> of</c><00:01:13.740><c> right</c><00:01:14.040><c> now</c><00:01:14.299><c> keeping</c>
and language of right now keeping
 
and language of right now keeping
whatever<00:01:15.600><c> you</c><00:01:16.080><c> just</c><00:01:16.260><c> experienced</c><00:01:17.040><c> only</c><00:01:17.580><c> long</c>
whatever you just experienced only long
 
whatever you just experienced only long
enough<00:01:18.060><c> to</c><00:01:18.420><c> use</c><00:01:18.659><c> it</c><00:01:18.900><c> or</c><00:01:19.380><c> not</c>
enough to use it or not
 
enough to use it or not
working<00:01:21.119><c> memory</c><00:01:21.600><c> for</c><00:01:21.840><c> what</c><00:01:22.140><c> you</c><00:01:22.320><c> see</c><00:01:22.619><c> is</c>
working memory for what you see is
 
working memory for what you see is
called<00:01:23.520><c> the</c><00:01:23.759><c> visual</c><00:01:24.180><c> spatial</c><00:01:24.780><c> scratch</c><00:01:25.200><c> pad</c>
called the visual spatial scratch pad
 
called the visual spatial scratch pad
imagine<00:01:26.700><c> words</c><00:01:27.119><c> on</c><00:01:27.420><c> a</c><00:01:27.600><c> Post-It</c><00:01:27.900><c> note</c><00:01:28.080><c> written</c>
imagine words on a Post-It note written
 
imagine words on a Post-It note written
in<00:01:28.860><c> disappearing</c><00:01:29.400><c> ink</c>
in disappearing ink
 
in disappearing ink
working<00:01:31.020><c> memory</c><00:01:31.439><c> for</c><00:01:31.619><c> what</c><00:01:31.860><c> you</c><00:01:31.979><c> hear</c><00:01:32.220><c> is</c>
working memory for what you hear is
 
working memory for what you hear is
called<00:01:32.820><c> your</c><00:01:33.060><c> phonological</c><00:01:33.840><c> loop</c><00:01:34.380><c> it's</c><00:01:35.159><c> that</c>
called your phonological loop it's that
 
called your phonological loop it's that
brief<00:01:35.820><c> echo</c><00:01:36.299><c> in</c><00:01:36.420><c> your</c><00:01:36.600><c> head</c><00:01:36.780><c> of</c><00:01:37.020><c> what</c><00:01:37.200><c> you</c><00:01:37.320><c> just</c>
brief echo in your head of what you just
 
brief echo in your head of what you just
heard<00:01:37.799><c> the</c><00:01:38.579><c> world's</c><00:01:38.939><c> shortest</c><00:01:39.360><c> soundtrack</c>
heard the world's shortest soundtrack
 
heard the world's shortest soundtrack
working<00:01:41.280><c> memory</c><00:01:41.759><c> has</c><00:01:42.119><c> a</c><00:01:42.420><c> really</c><00:01:42.600><c> short</c><00:01:42.960><c> life</c>
working memory has a really short life
 
working memory has a really short life
span<00:01:43.619><c> it</c><00:01:44.220><c> doesn't</c><00:01:44.520><c> hold</c><00:01:44.759><c> a</c><00:01:45.000><c> lot</c><00:01:45.119><c> of</c><00:01:45.240><c> stuff</c>
span it doesn't hold a lot of stuff
 
span it doesn't hold a lot of stuff
we<00:01:46.799><c> can</c><00:01:47.040><c> only</c><00:01:47.220><c> remember</c><00:01:47.579><c> at</c><00:01:48.060><c> most</c><00:01:48.299><c> seven</c><00:01:48.960><c> plus</c>
we can only remember at most seven plus
 
we can only remember at most seven plus
or<00:01:49.500><c> minus</c><00:01:49.860><c> two</c><00:01:50.159><c> things</c><00:01:50.460><c> for</c><00:01:51.360><c> 15</c><00:01:51.720><c> to</c><00:01:52.079><c> 30</c><00:01:52.320><c> seconds</c>
or minus two things for 15 to 30 seconds
 
or minus two things for 15 to 30 seconds
inside<00:01:53.220><c> working</c><00:01:53.640><c> memory</c>
inside working memory
 
inside working memory
that's<00:01:55.619><c> it</c><00:01:55.860><c> and</c><00:01:56.700><c> then</c><00:01:56.820><c> the</c><00:01:57.119><c> contents</c><00:01:57.600><c> are</c>
that's it and then the contents are
 
that's it and then the contents are
displaced<00:01:58.259><c> by</c><00:01:58.500><c> the</c><00:01:58.740><c> next</c><00:01:58.860><c> piece</c><00:01:59.280><c> of</c><00:01:59.340><c> incoming</c>
displaced by the next piece of incoming
 
displaced by the next piece of incoming
information
information
 
information
life<00:02:01.619><c> keeps</c><00:02:02.040><c> happening</c><00:02:02.540><c> the</c><00:02:03.540><c> next</c><00:02:03.720><c> piece</c><00:02:04.079><c> of</c>
life keeps happening the next piece of
 
life keeps happening the next piece of
data<00:02:04.500><c> enters</c><00:02:04.920><c> your</c><00:02:05.100><c> working</c><00:02:05.280><c> memory</c><00:02:05.759><c> and</c><00:02:06.180><c> it</c>
data enters your working memory and it
 
data enters your working memory and it
elbows<00:02:06.780><c> out</c><00:02:06.899><c> whatever</c><00:02:07.140><c> was</c><00:02:07.439><c> in</c><00:02:07.619><c> there</c><00:02:07.799><c> before</c>
elbows out whatever was in there before
 
elbows out whatever was in there before
but<00:02:09.420><c> wait</c><00:02:09.780><c> if</c><00:02:10.619><c> everything</c><00:02:10.800><c> vanishes</c><00:02:11.520><c> from</c>
but wait if everything vanishes from
 
but wait if everything vanishes from
working<00:02:11.879><c> memory</c><00:02:12.300><c> within</c><00:02:12.660><c> a</c><00:02:12.780><c> few</c><00:02:12.900><c> seconds</c><00:02:13.140><c> how</c>
working memory within a few seconds how
 
working memory within a few seconds how
can<00:02:14.280><c> I</c><00:02:14.459><c> remember</c><00:02:14.580><c> what</c><00:02:14.879><c> I</c><00:02:15.060><c> ate</c><00:02:15.180><c> for</c><00:02:15.360><c> breakfast</c>
can I remember what I ate for breakfast
 
can I remember what I ate for breakfast
this<00:02:16.020><c> morning</c><00:02:16.200><c> the</c><00:02:16.980><c> movie</c><00:02:17.160><c> I</c><00:02:17.459><c> saw</c><00:02:17.700><c> last</c><00:02:18.000><c> night</c>
this morning the movie I saw last night
 
this morning the movie I saw last night
or<00:02:18.840><c> the</c><00:02:19.080><c> vacation</c><00:02:19.379><c> to</c><00:02:19.620><c> Rome</c><00:02:19.920><c> I</c><00:02:20.160><c> took</c><00:02:20.400><c> last</c><00:02:20.640><c> year</c>
or the vacation to Rome I took last year
 
or the vacation to Rome I took last year
your<00:02:22.500><c> working</c><00:02:22.680><c> memory</c><00:02:23.160><c> is</c><00:02:23.580><c> the</c><00:02:23.819><c> gateway</c><00:02:24.180><c> to</c>
your working memory is the gateway to
 
your working memory is the gateway to
memory<00:02:24.780><c> as</c><00:02:25.080><c> most</c><00:02:25.319><c> of</c><00:02:25.500><c> us</c><00:02:25.560><c> think</c><00:02:25.860><c> of</c><00:02:26.040><c> it</c>
memory as most of us think of it
 
memory as most of us think of it
information<00:02:27.360><c> available</c><00:02:28.080><c> in</c><00:02:28.560><c> your</c><00:02:28.739><c> present</c>
information available in your present
 
information available in your present
moment<00:02:29.400><c> that</c><00:02:30.060><c> captures</c><00:02:30.480><c> your</c><00:02:30.780><c> attention</c><00:02:31.140><c> can</c>
moment that captures your attention can
 
moment that captures your attention can
be<00:02:32.040><c> flagged</c><00:02:32.580><c> and</c><00:02:32.819><c> funneled</c><00:02:33.239><c> from</c><00:02:33.540><c> the</c><00:02:33.780><c> tiny</c>
be flagged and funneled from the tiny
 
be flagged and funneled from the tiny
temporary<00:02:34.560><c> space</c><00:02:34.800><c> of</c><00:02:35.099><c> working</c><00:02:35.280><c> memory</c><00:02:35.819><c> and</c>
temporary space of working memory and
 
temporary space of working memory and
sent<00:02:36.660><c> to</c><00:02:36.900><c> your</c><00:02:37.020><c> hippocampus</c>
sent to your hippocampus
 
sent to your hippocampus
there<00:02:39.780><c> it</c><00:02:40.140><c> can</c><00:02:40.319><c> become</c><00:02:40.739><c> linked</c><00:02:41.220><c> into</c><00:02:41.400><c> a</c>
there it can become linked into a
 
there it can become linked into a
long-term<00:02:42.239><c> memory</c><00:02:42.599><c> which</c><00:02:43.560><c> unlike</c><00:02:43.980><c> your</c>
long-term memory which unlike your
 
long-term memory which unlike your
working<00:02:44.400><c> memory</c><00:02:44.940><c> is</c><00:02:45.540><c> thought</c><00:02:45.720><c> to</c><00:02:45.900><c> have</c>
working memory is thought to have
 
working memory is thought to have
Limitless<00:02:46.920><c> duration</c><00:02:47.519><c> and</c><00:02:48.360><c> capacity</c>

```

# How to boost your brain and memory/Muscle Memory.en.vtt

```vtt
WEBVTT
Kind: captions
Language: en

00:00:06.540 --> 00:00:10.070 align:start position:0%
 
with<00:00:07.500><c> focused</c><00:00:07.980><c> practice</c><00:00:08.660><c> sequences</c><00:00:09.660><c> of</c>

00:00:10.070 --> 00:00:10.080 align:start position:0%
with focused practice sequences of
 

00:00:10.080 --> 00:00:12.470 align:start position:0%
with focused practice sequences of
previously<00:00:10.679><c> unrelated</c><00:00:11.460><c> physical</c><00:00:11.760><c> movements</c>

00:00:12.470 --> 00:00:12.480 align:start position:0%
previously unrelated physical movements
 

00:00:12.480 --> 00:00:15.950 align:start position:0%
previously unrelated physical movements
can<00:00:13.019><c> be</c><00:00:13.200><c> linked</c><00:00:13.620><c> together</c><00:00:13.860><c> and</c><00:00:14.759><c> executed</c><00:00:15.299><c> as</c><00:00:15.660><c> a</c>

00:00:15.950 --> 00:00:15.960 align:start position:0%
can be linked together and executed as a
 

00:00:15.960 --> 00:00:18.830 align:start position:0%
can be linked together and executed as a
single<00:00:16.320><c> action</c><00:00:16.760><c> instead</c><00:00:17.760><c> of</c><00:00:17.880><c> as</c><00:00:18.119><c> a</c><00:00:18.300><c> series</c><00:00:18.480><c> of</c>

00:00:18.830 --> 00:00:18.840 align:start position:0%
single action instead of as a series of
 

00:00:18.840 --> 00:00:20.870 align:start position:0%
single action instead of as a series of
separate<00:00:19.199><c> labored</c><00:00:19.740><c> steps</c>

00:00:20.870 --> 00:00:20.880 align:start position:0%
separate labored steps
 

00:00:20.880 --> 00:00:23.450 align:start position:0%
separate labored steps
popular<00:00:21.359><c> culture</c><00:00:21.960><c> calls</c><00:00:22.439><c> this</c><00:00:22.619><c> muscle</c><00:00:22.980><c> memory</c>

00:00:23.450 --> 00:00:23.460 align:start position:0%
popular culture calls this muscle memory
 

00:00:23.460 --> 00:00:26.570 align:start position:0%
popular culture calls this muscle memory
but<00:00:24.119><c> the</c><00:00:24.359><c> term</c><00:00:24.480><c> is</c><00:00:24.720><c> a</c><00:00:24.960><c> misnomer</c><00:00:25.619><c> and</c><00:00:26.160><c> I'm</c><00:00:26.340><c> here</c>

00:00:26.570 --> 00:00:26.580 align:start position:0%
but the term is a misnomer and I'm here
 

00:00:26.580 --> 00:00:29.210 align:start position:0%
but the term is a misnomer and I'm here
to<00:00:26.760><c> restore</c><00:00:27.119><c> credit</c><00:00:27.359><c> to</c><00:00:27.660><c> its</c><00:00:27.900><c> rightful</c><00:00:28.199><c> owner</c>

00:00:29.210 --> 00:00:29.220 align:start position:0%
to restore credit to its rightful owner
 

00:00:29.220 --> 00:00:31.669 align:start position:0%
to restore credit to its rightful owner
your<00:00:29.820><c> body</c><00:00:30.000><c> can</c><00:00:30.240><c> perform</c><00:00:30.420><c> the</c><00:00:30.900><c> Electric</c><00:00:31.080><c> Slide</c>

00:00:31.669 --> 00:00:31.679 align:start position:0%
your body can perform the Electric Slide
 

00:00:31.679 --> 00:00:33.889 align:start position:0%
your body can perform the Electric Slide
once<00:00:32.040><c> you've</c><00:00:32.160><c> learned</c><00:00:32.460><c> the</c><00:00:32.579><c> routine</c><00:00:33.000><c> and</c><00:00:33.719><c> it</c>

00:00:33.889 --> 00:00:33.899 align:start position:0%
once you've learned the routine and it
 

00:00:33.899 --> 00:00:36.229 align:start position:0%
once you've learned the routine and it
might<00:00:34.079><c> feel</c><00:00:34.559><c> as</c><00:00:34.800><c> if</c><00:00:34.980><c> your</c><00:00:35.280><c> arms</c><00:00:35.640><c> and</c><00:00:35.820><c> legs</c>

00:00:36.229 --> 00:00:36.239 align:start position:0%
might feel as if your arms and legs
 

00:00:36.239 --> 00:00:38.690 align:start position:0%
might feel as if your arms and legs
remember<00:00:36.600><c> how</c><00:00:37.079><c> to</c><00:00:37.200><c> do</c><00:00:37.320><c> the</c><00:00:37.559><c> steps</c><00:00:37.920><c> but</c><00:00:38.460><c> the</c>

00:00:38.690 --> 00:00:38.700 align:start position:0%
remember how to do the steps but the
 

00:00:38.700 --> 00:00:40.430 align:start position:0%
remember how to do the steps but the
program<00:00:38.880><c> for</c><00:00:39.239><c> this</c><00:00:39.480><c> choreography</c><00:00:40.140><c> doesn't</c>

00:00:40.430 --> 00:00:40.440 align:start position:0%
program for this choreography doesn't
 

00:00:40.440 --> 00:00:43.729 align:start position:0%
program for this choreography doesn't
live<00:00:40.680><c> in</c><00:00:40.860><c> your</c><00:00:41.040><c> muscles</c><00:00:41.399><c> it's</c><00:00:42.120><c> in</c><00:00:42.420><c> your</c><00:00:42.660><c> brain</c>

00:00:43.729 --> 00:00:43.739 align:start position:0%
live in your muscles it's in your brain
 

00:00:43.739 --> 00:00:46.010 align:start position:0%
live in your muscles it's in your brain
the<00:00:44.399><c> sequence</c><00:00:44.760><c> of</c><00:00:45.059><c> individual</c><00:00:45.660><c> physical</c>

00:00:46.010 --> 00:00:46.020 align:start position:0%
the sequence of individual physical
 

00:00:46.020 --> 00:00:48.709 align:start position:0%
the sequence of individual physical
steps<00:00:46.620><c> that</c><00:00:46.800><c> become</c><00:00:47.160><c> connected</c><00:00:47.760><c> to</c><00:00:48.360><c> make</c><00:00:48.480><c> a</c>

00:00:48.709 --> 00:00:48.719 align:start position:0%
steps that become connected to make a
 

00:00:48.719 --> 00:00:51.049 align:start position:0%
steps that become connected to make a
muscle<00:00:48.899><c> memory</c><00:00:49.379><c> are</c><00:00:49.920><c> linked</c><00:00:50.280><c> together</c><00:00:50.579><c> and</c>

00:00:51.049 --> 00:00:51.059 align:start position:0%
muscle memory are linked together and
 

00:00:51.059 --> 00:00:54.470 align:start position:0%
muscle memory are linked together and
refined<00:00:51.660><c> not</c><00:00:52.320><c> by</c><00:00:52.620><c> the</c><00:00:52.800><c> hippocampus</c><00:00:53.579><c> as</c><00:00:54.120><c> with</c>

00:00:54.470 --> 00:00:54.480 align:start position:0%
refined not by the hippocampus as with
 

00:00:54.480 --> 00:00:57.290 align:start position:0%
refined not by the hippocampus as with
semantic<00:00:55.079><c> and</c><00:00:55.260><c> episodic</c><00:00:55.980><c> memories</c><00:00:56.399><c> but</c><00:00:57.059><c> by</c>

00:00:57.290 --> 00:00:57.300 align:start position:0%
semantic and episodic memories but by
 

00:00:57.300 --> 00:01:00.650 align:start position:0%
semantic and episodic memories but by
your<00:00:57.480><c> basal</c><00:00:57.960><c> ganglia</c><00:00:58.500><c> and</c><00:00:58.980><c> cerebellum</c>

00:01:00.650 --> 00:01:00.660 align:start position:0%
your basal ganglia and cerebellum
 

00:01:00.660 --> 00:01:03.229 align:start position:0%
your basal ganglia and cerebellum
Henry<00:01:01.260><c> malleason</c><00:01:01.860><c> couldn't</c><00:01:02.399><c> make</c><00:01:02.699><c> any</c><00:01:03.000><c> new</c>

00:01:03.229 --> 00:01:03.239 align:start position:0%
Henry malleason couldn't make any new
 

00:01:03.239 --> 00:01:05.630 align:start position:0%
Henry malleason couldn't make any new
memories<00:01:03.660><c> for</c><00:01:03.960><c> information</c><00:01:04.339><c> or</c><00:01:05.339><c> what</c>

00:01:05.630 --> 00:01:05.640 align:start position:0%
memories for information or what
 

00:01:05.640 --> 00:01:08.330 align:start position:0%
memories for information or what
happened<00:01:05.939><c> because</c><00:01:06.720><c> the</c><00:01:07.080><c> hippocampus</c><00:01:07.799><c> on</c><00:01:08.100><c> both</c>

00:01:08.330 --> 00:01:08.340 align:start position:0%
happened because the hippocampus on both
 

00:01:08.340 --> 00:01:11.090 align:start position:0%
happened because the hippocampus on both
sides<00:01:08.760><c> of</c><00:01:08.880><c> his</c><00:01:09.060><c> brain</c><00:01:09.360><c> was</c><00:01:09.600><c> removed</c><00:01:10.260><c> but</c>

00:01:11.090 --> 00:01:11.100 align:start position:0%
sides of his brain was removed but
 

00:01:11.100 --> 00:01:13.490 align:start position:0%
sides of his brain was removed but
because<00:01:11.340><c> he</c><00:01:11.820><c> still</c><00:01:12.060><c> had</c><00:01:12.360><c> his</c><00:01:12.540><c> basal</c><00:01:13.020><c> ganglia</c>

00:01:13.490 --> 00:01:13.500 align:start position:0%
because he still had his basal ganglia
 

00:01:13.500 --> 00:01:16.490 align:start position:0%
because he still had his basal ganglia
and<00:01:13.740><c> cerebellum</c><00:01:14.460><c> he</c><00:01:15.119><c> could</c><00:01:15.360><c> still</c><00:01:15.600><c> create</c><00:01:15.960><c> new</c>

00:01:16.490 --> 00:01:16.500 align:start position:0%
and cerebellum he could still create new
 

00:01:16.500 --> 00:01:18.350 align:start position:0%
and cerebellum he could still create new
muscle<00:01:16.740><c> memories</c>

00:01:18.350 --> 00:01:18.360 align:start position:0%
muscle memories
 

00:01:18.360 --> 00:01:21.230 align:start position:0%
muscle memories
for<00:01:19.020><c> example</c><00:01:19.380><c> he</c><00:01:20.100><c> learned</c><00:01:20.400><c> how</c><00:01:20.700><c> to</c><00:01:20.820><c> mirror</c>

00:01:21.230 --> 00:01:21.240 align:start position:0%
for example he learned how to mirror
 

00:01:21.240 --> 00:01:24.109 align:start position:0%
for example he learned how to mirror
draw<00:01:21.420><c> and</c><00:01:22.020><c> got</c><00:01:22.200><c> better</c><00:01:22.439><c> with</c><00:01:22.799><c> practice</c><00:01:23.119><c> even</c>

00:01:24.109 --> 00:01:24.119 align:start position:0%
draw and got better with practice even
 

00:01:24.119 --> 00:01:25.670 align:start position:0%
draw and got better with practice even
though<00:01:24.360><c> he</c><00:01:24.600><c> could</c><00:01:24.840><c> never</c><00:01:25.080><c> consciously</c>

00:01:25.670 --> 00:01:25.680 align:start position:0%
though he could never consciously
 

00:01:25.680 --> 00:01:28.929 align:start position:0%
though he could never consciously
remember<00:01:25.979><c> that</c><00:01:26.400><c> he'd</c><00:01:26.700><c> done</c><00:01:26.939><c> this</c><00:01:27.180><c> task</c><00:01:27.360><c> before</c>

00:01:28.929 --> 00:01:28.939 align:start position:0%
remember that he'd done this task before
 

00:01:28.939 --> 00:01:31.789 align:start position:0%
remember that he'd done this task before
retrieving<00:01:29.939><c> muscle</c><00:01:30.180><c> memories</c><00:01:30.659><c> is</c><00:01:31.140><c> also</c><00:01:31.560><c> a</c><00:01:31.740><c> bit</c>

00:01:31.789 --> 00:01:31.799 align:start position:0%
retrieving muscle memories is also a bit
 

00:01:31.799 --> 00:01:33.830 align:start position:0%
retrieving muscle memories is also a bit
different<00:01:32.040><c> from</c><00:01:32.400><c> how</c><00:01:32.640><c> we</c><00:01:32.759><c> recall</c><00:01:33.119><c> semantic</c>

00:01:33.830 --> 00:01:33.840 align:start position:0%
different from how we recall semantic
 

00:01:33.840 --> 00:01:35.870 align:start position:0%
different from how we recall semantic
and<00:01:34.080><c> episodic</c><00:01:34.680><c> memories</c>

00:01:35.870 --> 00:01:35.880 align:start position:0%
and episodic memories
 

00:01:35.880 --> 00:01:38.270 align:start position:0%
and episodic memories
semantic<00:01:36.840><c> and</c><00:01:37.020><c> episodic</c><00:01:37.619><c> memories</c><00:01:37.979><c> are</c>

00:01:38.270 --> 00:01:38.280 align:start position:0%
semantic and episodic memories are
 

00:01:38.280 --> 00:01:40.789 align:start position:0%
semantic and episodic memories are
called<00:01:38.460><c> declarative</c><00:01:39.119><c> you</c><00:01:39.960><c> can</c><00:01:40.079><c> declare</c><00:01:40.500><c> that</c>

00:01:40.789 --> 00:01:40.799 align:start position:0%
called declarative you can declare that
 

00:01:40.799 --> 00:01:43.190 align:start position:0%
called declarative you can declare that
you<00:01:41.040><c> remember</c><00:01:41.220><c> or</c><00:01:41.700><c> know</c><00:01:41.939><c> something</c><00:01:42.299><c> you're</c>

00:01:43.190 --> 00:01:43.200 align:start position:0%
you remember or know something you're
 

00:01:43.200 --> 00:01:45.230 align:start position:0%
you remember or know something you're
conscious<00:01:43.680><c> of</c><00:01:43.860><c> it</c>

00:01:45.230 --> 00:01:45.240 align:start position:0%
conscious of it
 

00:01:45.240 --> 00:01:47.690 align:start position:0%
conscious of it
retrieving<00:01:46.140><c> the</c><00:01:46.380><c> stuff</c><00:01:46.560><c> you</c><00:01:46.860><c> know</c><00:01:47.040><c> and</c><00:01:47.579><c> the</c>

00:01:47.690 --> 00:01:47.700 align:start position:0%
retrieving the stuff you know and the
 

00:01:47.700 --> 00:01:49.910 align:start position:0%
retrieving the stuff you know and the
stuff<00:01:47.880><c> that</c><00:01:48.119><c> happened</c><00:01:48.360><c> often</c><00:01:49.320><c> requires</c>

00:01:49.910 --> 00:01:49.920 align:start position:0%
stuff that happened often requires
 

00:01:49.920 --> 00:01:53.030 align:start position:0%
stuff that happened often requires
conscious<00:01:50.520><c> effort</c><00:01:51.200><c> concentration</c><00:01:52.200><c> even</c>

00:01:53.030 --> 00:01:53.040 align:start position:0%
conscious effort concentration even
 

00:01:53.040 --> 00:01:56.389 align:start position:0%
conscious effort concentration even
struggle<00:01:53.899><c> recall</c><00:01:54.899><c> of</c><00:01:55.140><c> muscle</c><00:01:55.439><c> memory</c><00:01:55.979><c> is</c>

00:01:56.389 --> 00:01:56.399 align:start position:0%
struggle recall of muscle memory is
 

00:01:56.399 --> 00:01:59.810 align:start position:0%
struggle recall of muscle memory is
different<00:01:56.720><c> it</c><00:01:57.720><c> is</c><00:01:57.899><c> unconscious</c><00:01:58.820><c> remembered</c>

00:01:59.810 --> 00:01:59.820 align:start position:0%
different it is unconscious remembered
 

00:01:59.820 --> 00:02:01.730 align:start position:0%
different it is unconscious remembered
below<00:02:00.299><c> your</c><00:02:00.600><c> awareness</c>

00:02:01.730 --> 00:02:01.740 align:start position:0%
below your awareness
 

00:02:01.740 --> 00:02:05.270 align:start position:0%
below your awareness
driving<00:02:02.399><c> a</c><00:02:02.820><c> car</c><00:02:03.000><c> brushing</c><00:02:03.899><c> your</c><00:02:04.020><c> teeth</c><00:02:04.320><c> tying</c>

00:02:05.270 --> 00:02:05.280 align:start position:0%
driving a car brushing your teeth tying
 

00:02:05.280 --> 00:02:08.630 align:start position:0%
driving a car brushing your teeth tying
your<00:02:05.399><c> shoes</c><00:02:05.700><c> or</c><00:02:06.240><c> all</c><00:02:06.479><c> muscle</c><00:02:06.719><c> memories</c><00:02:07.640><c> Once</c>

00:02:08.630 --> 00:02:08.640 align:start position:0%
your shoes or all muscle memories Once
 

00:02:08.640 --> 00:02:10.910 align:start position:0%
your shoes or all muscle memories Once
Upon<00:02:08.880><c> a</c><00:02:09.000><c> Time</c><00:02:09.179><c> you</c><00:02:10.080><c> didn't</c><00:02:10.259><c> know</c><00:02:10.500><c> how</c><00:02:10.679><c> to</c><00:02:10.800><c> do</c>

00:02:10.910 --> 00:02:10.920 align:start position:0%
Upon a Time you didn't know how to do
 

00:02:10.920 --> 00:02:12.229 align:start position:0%
Upon a Time you didn't know how to do
these<00:02:11.280><c> things</c>

00:02:12.229 --> 00:02:12.239 align:start position:0%
these things
 

00:02:12.239 --> 00:02:14.510 align:start position:0%
these things
then<00:02:12.840><c> through</c><00:02:13.260><c> a</c><00:02:13.440><c> lot</c><00:02:13.560><c> of</c><00:02:13.680><c> repetition</c><00:02:14.220><c> and</c>

00:02:14.510 --> 00:02:14.520 align:start position:0%
then through a lot of repetition and
 

00:02:14.520 --> 00:02:16.670 align:start position:0%
then through a lot of repetition and
refinement<00:02:15.060><c> you</c><00:02:15.420><c> learned</c>

00:02:16.670 --> 00:02:16.680 align:start position:0%
refinement you learned
 

00:02:16.680 --> 00:02:19.910 align:start position:0%
refinement you learned
you<00:02:17.220><c> committed</c><00:02:17.640><c> the</c><00:02:17.819><c> steps</c><00:02:18.180><c> to</c><00:02:18.360><c> memory</c><00:02:18.920><c> and</c>

00:02:19.910 --> 00:02:19.920 align:start position:0%
you committed the steps to memory and
 

00:02:19.920 --> 00:02:22.309 align:start position:0%
you committed the steps to memory and
now<00:02:20.160><c> when</c><00:02:20.580><c> you</c><00:02:20.760><c> go</c><00:02:20.879><c> to</c><00:02:21.000><c> ride</c><00:02:21.239><c> a</c><00:02:21.480><c> bike</c><00:02:21.599><c> you</c><00:02:22.260><c> don't</c>

00:02:22.309 --> 00:02:22.319 align:start position:0%
now when you go to ride a bike you don't
 

00:02:22.319 --> 00:02:24.830 align:start position:0%
now when you go to ride a bike you don't
have<00:02:22.500><c> to</c><00:02:22.680><c> stop</c><00:02:22.920><c> and</c><00:02:23.220><c> think</c><00:02:23.459><c> wait</c><00:02:24.239><c> let</c><00:02:24.720><c> me</c>

00:02:24.830 --> 00:02:24.840 align:start position:0%
have to stop and think wait let me
 

00:02:24.840 --> 00:02:26.630 align:start position:0%
have to stop and think wait let me
recall<00:02:25.260><c> all</c><00:02:25.620><c> of</c><00:02:25.680><c> the</c><00:02:25.800><c> steps</c><00:02:26.099><c> of</c><00:02:26.220><c> how</c><00:02:26.340><c> to</c><00:02:26.520><c> do</c>

00:02:26.630 --> 00:02:26.640 align:start position:0%
recall all of the steps of how to do
 

00:02:26.640 --> 00:02:29.930 align:start position:0%
recall all of the steps of how to do
this<00:02:26.819><c> first</c><00:02:27.319><c> you</c><00:02:28.319><c> are</c><00:02:28.440><c> utterly</c><00:02:29.040><c> unaware</c><00:02:29.760><c> of</c>

00:02:29.930 --> 00:02:29.940 align:start position:0%
this first you are utterly unaware of
 

00:02:29.940 --> 00:02:32.809 align:start position:0%
this first you are utterly unaware of
these<00:02:30.300><c> memories</c><00:02:30.660><c> while</c><00:02:31.080><c> recalling</c><00:02:31.800><c> them</c><00:02:32.040><c> they</c>

00:02:32.809 --> 00:02:32.819 align:start position:0%
these memories while recalling them they
 

00:02:32.819 --> 00:02:35.750 align:start position:0%
these memories while recalling them they
are<00:02:33.000><c> automatic</c><00:02:33.780><c> you</c><00:02:34.440><c> hop</c><00:02:34.680><c> on</c><00:02:34.920><c> the</c><00:02:35.040><c> bike</c><00:02:35.220><c> and</c><00:02:35.520><c> go</c>

00:02:35.750 --> 00:02:35.760 align:start position:0%
are automatic you hop on the bike and go
 

00:02:35.760 --> 00:02:38.990 align:start position:0%
are automatic you hop on the bike and go
it's<00:02:36.660><c> phenomenally</c><00:02:37.440><c> beneficial</c><00:02:38.160><c> that</c><00:02:38.819><c> our</c>

00:02:38.990 --> 00:02:39.000 align:start position:0%
it's phenomenally beneficial that our
 

00:02:39.000 --> 00:02:41.509 align:start position:0%
it's phenomenally beneficial that our
brains<00:02:39.360><c> are</c><00:02:39.540><c> designed</c><00:02:40.020><c> in</c><00:02:40.260><c> this</c><00:02:40.379><c> way</c><00:02:40.560><c> in</c>

00:02:41.509 --> 00:02:41.519 align:start position:0%
brains are designed in this way in
 

00:02:41.519 --> 00:02:43.910 align:start position:0%
brains are designed in this way in
delegating<00:02:42.000><c> muscle</c><00:02:42.300><c> memory</c><00:02:42.780><c> to</c><00:02:43.140><c> subconscious</c>

00:02:43.910 --> 00:02:43.920 align:start position:0%
delegating muscle memory to subconscious
 

00:02:43.920 --> 00:02:46.130 align:start position:0%
delegating muscle memory to subconscious
neural<00:02:44.280><c> circuitry</c><00:02:44.819><c> the</c><00:02:45.420><c> brain's</c><00:02:45.840><c> president</c>

00:02:46.130 --> 00:02:46.140 align:start position:0%
neural circuitry the brain's president
 

00:02:46.140 --> 00:02:49.250 align:start position:0%
neural circuitry the brain's president
CEO<00:02:46.980><c> and</c><00:02:47.220><c> other</c><00:02:47.459><c> higher-ups</c><00:02:48.239><c> are</c><00:02:48.780><c> free</c><00:02:49.019><c> to</c>

00:02:49.250 --> 00:02:49.260 align:start position:0%
CEO and other higher-ups are free to
 

00:02:49.260 --> 00:02:51.290 align:start position:0%
CEO and other higher-ups are free to
continue<00:02:49.440><c> their</c><00:02:49.980><c> executive</c><00:02:50.459><c> functions</c><00:02:51.000><c> of</c>

00:02:51.290 --> 00:02:51.300 align:start position:0%
continue their executive functions of
 

00:02:51.300 --> 00:02:53.869 align:start position:0%
continue their executive functions of
thinking<00:02:51.980><c> imagining</c><00:02:52.980><c> and</c><00:02:53.340><c> decision</c><00:02:53.640><c> making</c>

00:02:53.869 --> 00:02:53.879 align:start position:0%
thinking imagining and decision making
 

00:02:53.879 --> 00:02:56.330 align:start position:0%
thinking imagining and decision making
while<00:02:54.720><c> you're</c><00:02:55.019><c> doing</c><00:02:55.319><c> what</c><00:02:55.620><c> you</c><00:02:55.860><c> already</c><00:02:56.040><c> know</c>

00:02:56.330 --> 00:02:56.340 align:start position:0%
while you're doing what you already know
 

00:02:56.340 --> 00:02:57.650 align:start position:0%
while you're doing what you already know
how<00:02:56.519><c> to</c><00:02:56.700><c> do</c>

00:02:57.650 --> 00:02:57.660 align:start position:0%
how to do
 

00:02:57.660 --> 00:03:01.190 align:start position:0%
how to do
so<00:02:58.260><c> you</c><00:02:58.680><c> can</c><00:02:58.860><c> walk</c><00:02:59.280><c> chew</c><00:03:00.000><c> gum</c><00:03:00.180><c> and</c><00:03:00.840><c> have</c><00:03:01.019><c> a</c>

00:03:01.190 --> 00:03:01.200 align:start position:0%
so you can walk chew gum and have a
 

00:03:01.200 --> 00:03:05.060 align:start position:0%
so you can walk chew gum and have a
conversation<00:03:01.739><c> at</c><00:03:02.459><c> the</c><00:03:02.580><c> same</c><00:03:02.760><c> time</c>


```

# How to boost your brain and memory/Normal Forgetting.en.vtt

```vtt
WEBVTT
Kind: captions
Language: en

00:00:06.359 --> 00:00:09.470 align:start position:0%
 
when<00:00:07.259><c> is</c><00:00:07.440><c> forgetting</c><00:00:07.980><c> normal</c><00:00:08.160><c> and</c><00:00:08.940><c> when</c><00:00:09.120><c> is</c><00:00:09.300><c> it</c>

00:00:09.470 --> 00:00:09.480 align:start position:0%
when is forgetting normal and when is it
 

00:00:09.480 --> 00:00:10.190 align:start position:0%
when is forgetting normal and when is it
not

00:00:10.190 --> 00:00:10.200 align:start position:0%
not
 

00:00:10.200 --> 00:00:12.709 align:start position:0%
not
here<00:00:10.920><c> are</c><00:00:11.099><c> four</c><00:00:11.280><c> examples</c>

00:00:12.709 --> 00:00:12.719 align:start position:0%
here are four examples
 

00:00:12.719 --> 00:00:15.829 align:start position:0%
here are four examples
first<00:00:13.280><c> not</c><00:00:14.280><c> remembering</c><00:00:14.820><c> where</c><00:00:15.120><c> you</c><00:00:15.420><c> parked</c>

00:00:15.829 --> 00:00:15.839 align:start position:0%
first not remembering where you parked
 

00:00:15.839 --> 00:00:18.470 align:start position:0%
first not remembering where you parked
because<00:00:16.199><c> you</c><00:00:16.500><c> didn't</c><00:00:16.680><c> pay</c><00:00:17.160><c> attention</c><00:00:17.640><c> is</c>

00:00:18.470 --> 00:00:18.480 align:start position:0%
because you didn't pay attention is
 

00:00:18.480 --> 00:00:20.630 align:start position:0%
because you didn't pay attention is
normal<00:00:18.779><c> and</c><00:00:19.619><c> different</c><00:00:19.800><c> than</c><00:00:20.160><c> what</c><00:00:20.460><c> happens</c>

00:00:20.630 --> 00:00:20.640 align:start position:0%
normal and different than what happens
 

00:00:20.640 --> 00:00:22.490 align:start position:0%
normal and different than what happens
with<00:00:21.060><c> Alzheimer's</c>

00:00:22.490 --> 00:00:22.500 align:start position:0%
with Alzheimer's
 

00:00:22.500 --> 00:00:25.070 align:start position:0%
with Alzheimer's
if<00:00:22.920><c> you</c><00:00:23.100><c> have</c><00:00:23.279><c> Alzheimer's</c><00:00:24.060><c> let's</c><00:00:24.660><c> say</c><00:00:24.840><c> you</c>

00:00:25.070 --> 00:00:25.080 align:start position:0%
if you have Alzheimer's let's say you
 

00:00:25.080 --> 00:00:27.349 align:start position:0%
if you have Alzheimer's let's say you
park<00:00:25.260><c> in</c><00:00:25.500><c> a</c><00:00:25.680><c> mall</c><00:00:25.800><c> garage</c><00:00:26.160><c> and</c><00:00:26.760><c> shop</c><00:00:26.939><c> for</c><00:00:27.180><c> an</c>

00:00:27.349 --> 00:00:27.359 align:start position:0%
park in a mall garage and shop for an
 

00:00:27.359 --> 00:00:29.630 align:start position:0%
park in a mall garage and shop for an
hour<00:00:27.480><c> when</c><00:00:28.439><c> you</c><00:00:28.560><c> return</c><00:00:28.800><c> to</c><00:00:29.039><c> the</c><00:00:29.220><c> parking</c>

00:00:29.630 --> 00:00:29.640 align:start position:0%
hour when you return to the parking
 

00:00:29.640 --> 00:00:31.609 align:start position:0%
hour when you return to the parking
garage<00:00:29.820><c> you're</c><00:00:30.599><c> not</c><00:00:30.779><c> wondering</c><00:00:31.199><c> if</c><00:00:31.439><c> you</c>

00:00:31.609 --> 00:00:31.619 align:start position:0%
garage you're not wondering if you
 

00:00:31.619 --> 00:00:33.170 align:start position:0%
garage you're not wondering if you
parked<00:00:31.859><c> on</c><00:00:31.980><c> level</c><00:00:32.099><c> three</c><00:00:32.399><c> or</c><00:00:32.579><c> level</c><00:00:32.820><c> four</c>

00:00:33.170 --> 00:00:33.180 align:start position:0%
parked on level three or level four
 

00:00:33.180 --> 00:00:35.150 align:start position:0%
parked on level three or level four
you're<00:00:34.140><c> thinking</c>

00:00:35.150 --> 00:00:35.160 align:start position:0%
you're thinking
 

00:00:35.160 --> 00:00:37.790 align:start position:0%
you're thinking
I<00:00:35.760><c> don't</c><00:00:35.880><c> remember</c><00:00:36.059><c> how</c><00:00:36.480><c> I</c><00:00:36.719><c> got</c><00:00:36.899><c> here</c>

00:00:37.790 --> 00:00:37.800 align:start position:0%
I don't remember how I got here
 

00:00:37.800 --> 00:00:40.310 align:start position:0%
I don't remember how I got here
or<00:00:38.520><c> you're</c><00:00:38.700><c> standing</c><00:00:39.239><c> in</c><00:00:39.540><c> front</c><00:00:39.719><c> of</c><00:00:39.899><c> your</c><00:00:40.079><c> car</c>

00:00:40.310 --> 00:00:40.320 align:start position:0%
or you're standing in front of your car
 

00:00:40.320 --> 00:00:43.549 align:start position:0%
or you're standing in front of your car
but<00:00:40.980><c> you</c><00:00:41.160><c> don't</c><00:00:41.280><c> recognize</c><00:00:41.700><c> it</c><00:00:41.940><c> as</c><00:00:42.120><c> yours</c>

00:00:43.549 --> 00:00:43.559 align:start position:0%
but you don't recognize it as yours
 

00:00:43.559 --> 00:00:44.810 align:start position:0%
but you don't recognize it as yours
second

00:00:44.810 --> 00:00:44.820 align:start position:0%
second
 

00:00:44.820 --> 00:00:47.150 align:start position:0%
second
having<00:00:45.360><c> a</c><00:00:45.719><c> word</c><00:00:45.899><c> stuck</c><00:00:46.440><c> on</c><00:00:46.559><c> the</c><00:00:46.680><c> tip</c><00:00:46.860><c> of</c><00:00:46.980><c> your</c>

00:00:47.150 --> 00:00:47.160 align:start position:0%
having a word stuck on the tip of your
 

00:00:47.160 --> 00:00:49.850 align:start position:0%
having a word stuck on the tip of your
tongue<00:00:47.579><c> that</c><00:00:48.360><c> oh</c><00:00:48.840><c> what's</c><00:00:49.200><c> his</c><00:00:49.500><c> name</c>

00:00:49.850 --> 00:00:49.860 align:start position:0%
tongue that oh what's his name
 

00:00:49.860 --> 00:00:53.750 align:start position:0%
tongue that oh what's his name
phenomenon<00:00:50.700><c> called</c><00:00:51.360><c> blocking</c><00:00:52.140><c> is</c><00:00:52.800><c> normal</c><00:00:53.160><c> and</c>

00:00:53.750 --> 00:00:53.760 align:start position:0%
phenomenon called blocking is normal and
 

00:00:53.760 --> 00:00:56.689 align:start position:0%
phenomenon called blocking is normal and
does<00:00:54.000><c> not</c><00:00:54.239><c> mean</c><00:00:54.480><c> you</c><00:00:54.780><c> have</c><00:00:54.840><c> Alzheimer's</c><00:00:55.699><c> this</c>

00:00:56.689 --> 00:00:56.699 align:start position:0%
does not mean you have Alzheimer's this
 

00:00:56.699 --> 00:00:59.150 align:start position:0%
does not mean you have Alzheimer's this
is<00:00:56.820><c> one</c><00:00:57.059><c> of</c><00:00:57.120><c> the</c><00:00:57.239><c> most</c><00:00:57.480><c> common</c><00:00:57.960><c> experiences</c><00:00:58.860><c> of</c>

00:00:59.150 --> 00:00:59.160 align:start position:0%
is one of the most common experiences of
 

00:00:59.160 --> 00:01:01.549 align:start position:0%
is one of the most common experiences of
memory<00:00:59.460><c> retrieval</c><00:01:00.000><c> failure</c><00:01:00.480><c> you're</c><00:01:01.320><c> trying</c>

00:01:01.549 --> 00:01:01.559 align:start position:0%
memory retrieval failure you're trying
 

00:01:01.559 --> 00:01:04.250 align:start position:0%
memory retrieval failure you're trying
to<00:01:01.739><c> come</c><00:01:01.860><c> up</c><00:01:01.980><c> with</c><00:01:02.160><c> a</c><00:01:02.399><c> word</c><00:01:02.640><c> most</c><00:01:03.420><c> often</c><00:01:04.019><c> a</c>

00:01:04.250 --> 00:01:04.260 align:start position:0%
to come up with a word most often a
 

00:01:04.260 --> 00:01:06.950 align:start position:0%
to come up with a word most often a
proper<00:01:04.619><c> noun</c><00:01:04.920><c> a</c><00:01:05.580><c> person's</c><00:01:06.060><c> name</c><00:01:06.360><c> or</c><00:01:06.659><c> a</c><00:01:06.840><c> movie</c>

00:01:06.950 --> 00:01:06.960 align:start position:0%
proper noun a person's name or a movie
 

00:01:06.960 --> 00:01:10.190 align:start position:0%
proper noun a person's name or a movie
title<00:01:07.580><c> you</c><00:01:08.580><c> know</c><00:01:08.700><c> you</c><00:01:09.060><c> know</c><00:01:09.240><c> this</c><00:01:09.540><c> word</c><00:01:09.720><c> but</c>

00:01:10.190 --> 00:01:10.200 align:start position:0%
title you know you know this word but
 

00:01:10.200 --> 00:01:12.170 align:start position:0%
title you know you know this word but
you<00:01:10.439><c> cannot</c><00:01:10.799><c> for</c><00:01:11.040><c> the</c><00:01:11.220><c> life</c><00:01:11.400><c> of</c><00:01:11.580><c> you</c><00:01:11.700><c> retrieve</c>

00:01:12.170 --> 00:01:12.180 align:start position:0%
you cannot for the life of you retrieve
 

00:01:12.180 --> 00:01:14.870 align:start position:0%
you cannot for the life of you retrieve
it<00:01:12.299><c> on</c><00:01:12.479><c> demand</c><00:01:12.920><c> this</c><00:01:13.920><c> happens</c><00:01:14.159><c> when</c><00:01:14.520><c> there</c><00:01:14.700><c> is</c>

00:01:14.870 --> 00:01:14.880 align:start position:0%
it on demand this happens when there is
 

00:01:14.880 --> 00:01:17.570 align:start position:0%
it on demand this happens when there is
only<00:01:15.119><c> partial</c><00:01:15.720><c> or</c><00:01:16.260><c> weak</c><00:01:16.680><c> activation</c><00:01:17.100><c> of</c><00:01:17.400><c> the</c>

00:01:17.570 --> 00:01:17.580 align:start position:0%
only partial or weak activation of the
 

00:01:17.580 --> 00:01:19.789 align:start position:0%
only partial or weak activation of the
neurons<00:01:18.000><c> that</c><00:01:18.600><c> link</c><00:01:18.780><c> up</c><00:01:19.020><c> to</c><00:01:19.200><c> the</c><00:01:19.380><c> word</c><00:01:19.500><c> you're</c>

00:01:19.789 --> 00:01:19.799 align:start position:0%
neurons that link up to the word you're
 

00:01:19.799 --> 00:01:21.109 align:start position:0%
neurons that link up to the word you're
looking<00:01:20.040><c> for</c>

00:01:21.109 --> 00:01:21.119 align:start position:0%
looking for
 

00:01:21.119 --> 00:01:24.050 align:start position:0%
looking for
and<00:01:21.720><c> proper</c><00:01:22.080><c> nouns</c><00:01:22.500><c> are</c><00:01:22.740><c> particularly</c><00:01:23.400><c> tricky</c>

00:01:24.050 --> 00:01:24.060 align:start position:0%
and proper nouns are particularly tricky
 

00:01:24.060 --> 00:01:26.690 align:start position:0%
and proper nouns are particularly tricky
to<00:01:24.240><c> reach</c><00:01:24.540><c> think</c><00:01:25.320><c> of</c><00:01:25.500><c> proper</c><00:01:25.920><c> nouns</c><00:01:26.280><c> as</c><00:01:26.460><c> living</c>

00:01:26.690 --> 00:01:26.700 align:start position:0%
to reach think of proper nouns as living
 

00:01:26.700 --> 00:01:29.690 align:start position:0%
to reach think of proper nouns as living
in<00:01:27.000><c> neurological</c><00:01:27.659><c> cul-de-sacs</c><00:01:28.700><c> ultimately</c>

00:01:29.690 --> 00:01:29.700 align:start position:0%
in neurological cul-de-sacs ultimately
 

00:01:29.700 --> 00:01:32.330 align:start position:0%
in neurological cul-de-sacs ultimately
there<00:01:30.299><c> is</c><00:01:30.420><c> only</c><00:01:30.659><c> one</c><00:01:31.080><c> Road</c><00:01:31.320><c> in</c><00:01:31.619><c> that</c><00:01:31.920><c> leads</c><00:01:32.220><c> to</c>

00:01:32.330 --> 00:01:32.340 align:start position:0%
there is only one Road in that leads to
 

00:01:32.340 --> 00:01:34.249 align:start position:0%
there is only one Road in that leads to
the<00:01:32.580><c> address</c><00:01:32.759><c> you're</c><00:01:33.119><c> looking</c><00:01:33.360><c> for</c>

00:01:34.249 --> 00:01:34.259 align:start position:0%
the address you're looking for
 

00:01:34.259 --> 00:01:36.950 align:start position:0%
the address you're looking for
unlike<00:01:34.920><c> common</c><00:01:35.280><c> nouns</c><00:01:35.820><c> which</c><00:01:36.180><c> live</c><00:01:36.420><c> on</c><00:01:36.659><c> Main</c>

00:01:36.950 --> 00:01:36.960 align:start position:0%
unlike common nouns which live on Main
 

00:01:36.960 --> 00:01:39.230 align:start position:0%
unlike common nouns which live on Main
Street<00:01:37.259><c> with</c><00:01:37.860><c> hundreds</c><00:01:38.280><c> of</c><00:01:38.400><c> ways</c><00:01:38.759><c> to</c><00:01:38.880><c> get</c><00:01:39.060><c> to</c>

00:01:39.230 --> 00:01:39.240 align:start position:0%
Street with hundreds of ways to get to
 

00:01:39.240 --> 00:01:40.310 align:start position:0%
Street with hundreds of ways to get to
them

00:01:40.310 --> 00:01:40.320 align:start position:0%
them
 

00:01:40.320 --> 00:01:43.130 align:start position:0%
them
because<00:01:40.860><c> proper</c><00:01:41.460><c> nouns</c><00:01:41.880><c> are</c><00:01:42.299><c> so</c><00:01:42.600><c> tough</c><00:01:42.840><c> to</c>

00:01:43.130 --> 00:01:43.140 align:start position:0%
because proper nouns are so tough to
 

00:01:43.140 --> 00:01:45.469 align:start position:0%
because proper nouns are so tough to
activate<00:01:43.439><c> they</c><00:01:44.340><c> often</c><00:01:44.640><c> get</c><00:01:44.759><c> stuck</c><00:01:45.060><c> on</c><00:01:45.180><c> the</c><00:01:45.360><c> tip</c>

00:01:45.469 --> 00:01:45.479 align:start position:0%
activate they often get stuck on the tip
 

00:01:45.479 --> 00:01:48.289 align:start position:0%
activate they often get stuck on the tip
of<00:01:45.600><c> our</c><00:01:45.780><c> tongue</c><00:01:46.680><c> we</c><00:01:47.340><c> experience</c><00:01:47.700><c> tip</c><00:01:48.000><c> of</c><00:01:48.180><c> the</c>

00:01:48.289 --> 00:01:48.299 align:start position:0%
of our tongue we experience tip of the
 

00:01:48.299 --> 00:01:51.170 align:start position:0%
of our tongue we experience tip of the
tongues<00:01:48.659><c> more</c><00:01:49.079><c> often</c><00:01:49.439><c> as</c><00:01:49.680><c> we</c><00:01:49.920><c> age</c><00:01:50.220><c> but</c><00:01:51.000><c> again</c>

00:01:51.170 --> 00:01:51.180 align:start position:0%
tongues more often as we age but again
 

00:01:51.180 --> 00:01:53.870 align:start position:0%
tongues more often as we age but again
this<00:01:51.540><c> is</c><00:01:51.780><c> normal</c><00:01:52.140><c> it</c><00:01:52.860><c> has</c><00:01:53.040><c> to</c><00:01:53.220><c> do</c><00:01:53.280><c> with</c><00:01:53.520><c> slower</c>

00:01:53.870 --> 00:01:53.880 align:start position:0%
this is normal it has to do with slower
 

00:01:53.880 --> 00:01:57.050 align:start position:0%
this is normal it has to do with slower
processing<00:01:54.479><c> speeds</c><00:01:54.899><c> as</c><00:01:55.140><c> we</c><00:01:55.320><c> get</c><00:01:55.439><c> older</c>

00:01:57.050 --> 00:01:57.060 align:start position:0%
processing speeds as we get older
 

00:01:57.060 --> 00:02:00.710 align:start position:0%
processing speeds as we get older
it's<00:01:57.780><c> perfectly</c><00:01:58.259><c> okay</c><00:01:58.680><c> to</c><00:01:59.340><c> use</c><00:01:59.520><c> Google</c><00:01:59.939><c> to</c>

00:02:00.710 --> 00:02:00.720 align:start position:0%
it's perfectly okay to use Google to
 

00:02:00.720 --> 00:02:03.289 align:start position:0%
it's perfectly okay to use Google to
find<00:02:00.899><c> your</c><00:02:01.140><c> tip</c><00:02:01.320><c> of</c><00:02:01.500><c> the</c><00:02:01.619><c> tongue</c><00:02:01.979><c> words</c><00:02:02.299><c> this</c>

00:02:03.289 --> 00:02:03.299 align:start position:0%
find your tip of the tongue words this
 

00:02:03.299 --> 00:02:04.910 align:start position:0%
find your tip of the tongue words this
won't<00:02:03.540><c> make</c><00:02:03.720><c> your</c><00:02:03.960><c> memory</c><00:02:04.259><c> for</c><00:02:04.500><c> these</c><00:02:04.740><c> words</c>

00:02:04.910 --> 00:02:04.920 align:start position:0%
won't make your memory for these words
 

00:02:04.920 --> 00:02:08.690 align:start position:0%
won't make your memory for these words
worse<00:02:05.520><c> or</c><00:02:06.240><c> give</c><00:02:06.479><c> you</c><00:02:06.600><c> digital</c><00:02:07.020><c> amnesia</c><00:02:07.799><c> for</c>

00:02:08.690 --> 00:02:08.700 align:start position:0%
worse or give you digital amnesia for
 

00:02:08.700 --> 00:02:11.029 align:start position:0%
worse or give you digital amnesia for
example<00:02:09.060><c> looking</c><00:02:09.720><c> up</c><00:02:10.020><c> the</c><00:02:10.200><c> name</c><00:02:10.319><c> of</c><00:02:10.560><c> the</c><00:02:10.739><c> actor</c>

00:02:11.029 --> 00:02:11.039 align:start position:0%
example looking up the name of the actor
 

00:02:11.039 --> 00:02:13.670 align:start position:0%
example looking up the name of the actor
who<00:02:11.280><c> played</c><00:02:11.459><c> Phoebe</c><00:02:11.760><c> buffay</c><00:02:12.360><c> on</c><00:02:12.599><c> Friends</c><00:02:12.959><c> does</c>

00:02:13.670 --> 00:02:13.680 align:start position:0%
who played Phoebe buffay on Friends does
 

00:02:13.680 --> 00:02:15.410 align:start position:0%
who played Phoebe buffay on Friends does
not<00:02:13.920><c> weaken</c><00:02:14.459><c> my</c><00:02:14.640><c> memory's</c><00:02:15.000><c> ability</c>

00:02:15.410 --> 00:02:15.420 align:start position:0%
not weaken my memory's ability
 

00:02:15.420 --> 00:02:17.030 align:start position:0%
not weaken my memory's ability
whatsoever

00:02:17.030 --> 00:02:17.040 align:start position:0%
whatsoever
 

00:02:17.040 --> 00:02:19.729 align:start position:0%
whatsoever
likewise<00:02:18.000><c> suffering</c><00:02:18.959><c> through</c><00:02:19.200><c> the</c><00:02:19.440><c> mental</c>

00:02:19.729 --> 00:02:19.739 align:start position:0%
likewise suffering through the mental
 

00:02:19.739 --> 00:02:22.130 align:start position:0%
likewise suffering through the mental
pain<00:02:20.040><c> and</c><00:02:20.520><c> insisting</c><00:02:21.060><c> on</c><00:02:21.300><c> coming</c><00:02:21.540><c> up</c><00:02:21.780><c> with</c><00:02:21.900><c> her</c>

00:02:22.130 --> 00:02:22.140 align:start position:0%
pain and insisting on coming up with her
 

00:02:22.140 --> 00:02:24.710 align:start position:0%
pain and insisting on coming up with her
name<00:02:22.319><c> on</c><00:02:22.680><c> my</c><00:02:22.920><c> own</c><00:02:23.099><c> doesn't</c><00:02:23.819><c> make</c><00:02:24.120><c> my</c><00:02:24.360><c> memory</c>

00:02:24.710 --> 00:02:24.720 align:start position:0%
name on my own doesn't make my memory
 

00:02:24.720 --> 00:02:28.369 align:start position:0%
name on my own doesn't make my memory
stronger<00:02:25.340><c> in</c><00:02:26.340><c> fact</c><00:02:26.599><c> relieving</c><00:02:27.599><c> my</c><00:02:27.780><c> brain</c><00:02:28.020><c> from</c>

00:02:28.369 --> 00:02:28.379 align:start position:0%
stronger in fact relieving my brain from
 

00:02:28.379 --> 00:02:30.710 align:start position:0%
stronger in fact relieving my brain from
the<00:02:28.620><c> fruitless</c><00:02:28.980><c> task</c><00:02:29.280><c> of</c><00:02:29.700><c> perseverating</c><00:02:30.420><c> in</c>

00:02:30.710 --> 00:02:30.720 align:start position:0%
the fruitless task of perseverating in
 

00:02:30.720 --> 00:02:32.990 align:start position:0%
the fruitless task of perseverating in
the<00:02:30.900><c> wrong</c><00:02:31.080><c> neural</c><00:02:31.560><c> neighborhood</c><00:02:32.099><c> can</c><00:02:32.760><c> now</c>

00:02:32.990 --> 00:02:33.000 align:start position:0%
the wrong neural neighborhood can now
 

00:02:33.000 --> 00:02:34.729 align:start position:0%
the wrong neural neighborhood can now
free<00:02:33.239><c> up</c><00:02:33.480><c> my</c><00:02:33.720><c> brain</c><00:02:33.900><c> to</c><00:02:34.080><c> think</c><00:02:34.260><c> about</c><00:02:34.440><c> and</c>

00:02:34.729 --> 00:02:34.739 align:start position:0%
free up my brain to think about and
 

00:02:34.739 --> 00:02:37.910 align:start position:0%
free up my brain to think about and
engage<00:02:35.040><c> in</c><00:02:35.280><c> other</c><00:02:35.520><c> cognitive</c><00:02:36.120><c> experiences</c>

00:02:37.910 --> 00:02:37.920 align:start position:0%
engage in other cognitive experiences
 

00:02:37.920 --> 00:02:41.089 align:start position:0%
engage in other cognitive experiences
but<00:02:38.580><c> failure</c><00:02:39.060><c> to</c><00:02:39.300><c> retrieve</c><00:02:39.720><c> words</c><00:02:39.959><c> is</c><00:02:40.560><c> also</c><00:02:40.860><c> an</c>

00:02:41.089 --> 00:02:41.099 align:start position:0%
but failure to retrieve words is also an
 

00:02:41.099 --> 00:02:43.910 align:start position:0%
but failure to retrieve words is also an
early<00:02:41.280><c> sign</c><00:02:41.580><c> of</c><00:02:41.760><c> Alzheimer's</c><00:02:42.540><c> so</c><00:02:43.319><c> how</c><00:02:43.560><c> can</c><00:02:43.739><c> you</c>

00:02:43.910 --> 00:02:43.920 align:start position:0%
early sign of Alzheimer's so how can you
 

00:02:43.920 --> 00:02:46.009 align:start position:0%
early sign of Alzheimer's so how can you
know<00:02:44.099><c> if</c><00:02:44.459><c> you're</c><00:02:44.640><c> experiencing</c><00:02:45.360><c> an</c><00:02:45.720><c> ordinary</c>

00:02:46.009 --> 00:02:46.019 align:start position:0%
know if you're experiencing an ordinary
 

00:02:46.019 --> 00:02:48.650 align:start position:0%
know if you're experiencing an ordinary
tip<00:02:46.379><c> of</c><00:02:46.440><c> the</c><00:02:46.560><c> tongue</c><00:02:46.860><c> moment</c><00:02:47.160><c> or</c><00:02:48.060><c> a</c><00:02:48.180><c> symptom</c><00:02:48.360><c> of</c>

00:02:48.650 --> 00:02:48.660 align:start position:0%
tip of the tongue moment or a symptom of
 

00:02:48.660 --> 00:02:50.030 align:start position:0%
tip of the tongue moment or a symptom of
dementia

00:02:50.030 --> 00:02:50.040 align:start position:0%
dementia
 

00:02:50.040 --> 00:02:52.729 align:start position:0%
dementia
if<00:02:50.459><c> it's</c><00:02:50.640><c> Alzheimer's</c><00:02:51.420><c> you're</c><00:02:51.959><c> blocking</c><00:02:52.440><c> on</c>

00:02:52.729 --> 00:02:52.739 align:start position:0%
if it's Alzheimer's you're blocking on
 

00:02:52.739 --> 00:02:55.610 align:start position:0%
if it's Alzheimer's you're blocking on
dozens<00:02:53.280><c> of</c><00:02:53.519><c> words</c><00:02:53.700><c> a</c><00:02:54.000><c> day</c><00:02:54.239><c> and</c><00:02:55.200><c> instead</c><00:02:55.500><c> of</c>

00:02:55.610 --> 00:02:55.620 align:start position:0%
dozens of words a day and instead of
 

00:02:55.620 --> 00:02:57.890 align:start position:0%
dozens of words a day and instead of
blocking<00:02:56.099><c> primarily</c><00:02:56.819><c> on</c><00:02:57.120><c> proper</c><00:02:57.540><c> nouns</c>

00:02:57.890 --> 00:02:57.900 align:start position:0%
blocking primarily on proper nouns
 

00:02:57.900 --> 00:02:59.570 align:start position:0%
blocking primarily on proper nouns
people<00:02:58.440><c> with</c><00:02:58.680><c> Alzheimer's</c><00:02:59.340><c> will</c>

00:02:59.570 --> 00:02:59.580 align:start position:0%
people with Alzheimer's will
 

00:02:59.580 --> 00:03:02.089 align:start position:0%
people with Alzheimer's will
additionally<00:03:00.120><c> and</c><00:03:00.599><c> regularly</c><00:03:01.200><c> forget</c><00:03:01.560><c> common</c>

00:03:02.089 --> 00:03:02.099 align:start position:0%
additionally and regularly forget common
 

00:03:02.099 --> 00:03:05.990 align:start position:0%
additionally and regularly forget common
nouns<00:03:02.700><c> pen</c><00:03:03.540><c> spoon</c><00:03:04.440><c> bicycle</c>

00:03:05.990 --> 00:03:06.000 align:start position:0%
nouns pen spoon bicycle
 

00:03:06.000 --> 00:03:08.150 align:start position:0%
nouns pen spoon bicycle
when<00:03:06.660><c> this</c><00:03:06.959><c> kind</c><00:03:07.140><c> of</c><00:03:07.260><c> tip</c><00:03:07.620><c> of</c><00:03:07.680><c> the</c><00:03:07.860><c> tongue</c>

00:03:08.150 --> 00:03:08.160 align:start position:0%
when this kind of tip of the tongue
 

00:03:08.160 --> 00:03:11.390 align:start position:0%
when this kind of tip of the tongue
happens<00:03:08.400><c> all</c><00:03:09.060><c> day</c><00:03:09.239><c> long</c><00:03:09.540><c> this</c><00:03:10.440><c> is</c><00:03:10.620><c> not</c><00:03:10.860><c> just</c><00:03:11.159><c> an</c>

00:03:11.390 --> 00:03:11.400 align:start position:0%
happens all day long this is not just an
 

00:03:11.400 --> 00:03:14.229 align:start position:0%
happens all day long this is not just an
uncomfortable<00:03:11.819><c> moment</c><00:03:12.379><c> this</c><00:03:13.379><c> is</c><00:03:13.620><c> disruptive</c>

00:03:14.229 --> 00:03:14.239 align:start position:0%
uncomfortable moment this is disruptive
 

00:03:14.239 --> 00:03:17.030 align:start position:0%
uncomfortable moment this is disruptive
profound<00:03:15.239><c> memory</c><00:03:15.840><c> loss</c>

00:03:17.030 --> 00:03:17.040 align:start position:0%
profound memory loss
 

00:03:17.040 --> 00:03:19.790 align:start position:0%
profound memory loss
the<00:03:17.760><c> third</c><00:03:17.940><c> example</c><00:03:18.360><c> of</c><00:03:18.720><c> normal</c><00:03:19.019><c> forgetting</c>

00:03:19.790 --> 00:03:19.800 align:start position:0%
the third example of normal forgetting
 

00:03:19.800 --> 00:03:22.790 align:start position:0%
the third example of normal forgetting
has<00:03:20.159><c> to</c><00:03:20.340><c> do</c><00:03:20.459><c> with</c><00:03:20.940><c> all</c><00:03:21.239><c> of</c><00:03:21.360><c> our</c><00:03:21.599><c> things</c><00:03:21.900><c> that</c><00:03:22.620><c> go</c>

00:03:22.790 --> 00:03:22.800 align:start position:0%
has to do with all of our things that go
 

00:03:22.800 --> 00:03:23.869 align:start position:0%
has to do with all of our things that go
missing

00:03:23.869 --> 00:03:23.879 align:start position:0%
missing
 

00:03:23.879 --> 00:03:26.390 align:start position:0%
missing
losing<00:03:24.659><c> track</c><00:03:24.900><c> of</c><00:03:25.140><c> where</c><00:03:25.319><c> you</c><00:03:25.500><c> left</c><00:03:25.680><c> your</c><00:03:25.920><c> keys</c>

00:03:26.390 --> 00:03:26.400 align:start position:0%
losing track of where you left your keys
 

00:03:26.400 --> 00:03:29.750 align:start position:0%
losing track of where you left your keys
is<00:03:27.060><c> normal</c><00:03:27.500><c> and</c><00:03:28.500><c> probably</c><00:03:28.739><c> as</c><00:03:29.159><c> a</c><00:03:29.340><c> result</c><00:03:29.459><c> of</c>

00:03:29.750 --> 00:03:29.760 align:start position:0%
is normal and probably as a result of
 

00:03:29.760 --> 00:03:31.610 align:start position:0%
is normal and probably as a result of
not<00:03:30.000><c> paying</c><00:03:30.300><c> attention</c>

00:03:31.610 --> 00:03:31.620 align:start position:0%
not paying attention
 

00:03:31.620 --> 00:03:34.009 align:start position:0%
not paying attention
losing<00:03:32.340><c> your</c><00:03:32.519><c> keys</c><00:03:32.940><c> and</c><00:03:33.239><c> then</c><00:03:33.420><c> finding</c><00:03:33.900><c> them</c>

00:03:34.009 --> 00:03:34.019 align:start position:0%
losing your keys and then finding them
 

00:03:34.019 --> 00:03:37.070 align:start position:0%
losing your keys and then finding them
in<00:03:34.260><c> a</c><00:03:34.379><c> place</c><00:03:34.560><c> Keys</c><00:03:35.220><c> never</c><00:03:35.400><c> go</c><00:03:35.760><c> like</c><00:03:36.659><c> the</c>

00:03:37.070 --> 00:03:37.080 align:start position:0%
in a place Keys never go like the
 

00:03:37.080 --> 00:03:40.009 align:start position:0%
in a place Keys never go like the
refrigerator<00:03:37.620><c> or</c><00:03:38.040><c> microwave</c><00:03:38.540><c> or</c><00:03:39.540><c> finding</c>

00:03:40.009 --> 00:03:40.019 align:start position:0%
refrigerator or microwave or finding
 

00:03:40.019 --> 00:03:42.710 align:start position:0%
refrigerator or microwave or finding
them<00:03:40.140><c> and</c><00:03:40.379><c> wondering</c><00:03:40.799><c> who</c><00:03:41.040><c> they</c><00:03:41.280><c> belong</c><00:03:41.640><c> to</c><00:03:41.879><c> or</c>

00:03:42.710 --> 00:03:42.720 align:start position:0%
them and wondering who they belong to or
 

00:03:42.720 --> 00:03:45.830 align:start position:0%
them and wondering who they belong to or
what<00:03:43.019><c> they're</c><00:03:43.140><c> used</c><00:03:43.379><c> for</c><00:03:43.739><c> is</c><00:03:44.519><c> not</c><00:03:44.819><c> normal</c><00:03:45.060><c> and</c>

00:03:45.830 --> 00:03:45.840 align:start position:0%
what they're used for is not normal and
 

00:03:45.840 --> 00:03:48.050 align:start position:0%
what they're used for is not normal and
might<00:03:46.019><c> be</c><00:03:46.200><c> a</c><00:03:46.440><c> sign</c><00:03:46.560><c> of</c><00:03:46.799><c> Alzheimer's</c>

00:03:48.050 --> 00:03:48.060 align:start position:0%
might be a sign of Alzheimer's
 

00:03:48.060 --> 00:03:50.509 align:start position:0%
might be a sign of Alzheimer's
and<00:03:48.599><c> for</c><00:03:48.840><c> the</c><00:03:49.019><c> fourth</c><00:03:49.319><c> example</c><00:03:49.739><c> of</c><00:03:50.159><c> normal</c>

00:03:50.509 --> 00:03:50.519 align:start position:0%
and for the fourth example of normal
 

00:03:50.519 --> 00:03:52.970 align:start position:0%
and for the fourth example of normal
versus<00:03:50.940><c> Troublesome</c><00:03:51.720><c> forgetting</c><00:03:52.260><c> let's</c><00:03:52.739><c> talk</c>

00:03:52.970 --> 00:03:52.980 align:start position:0%
versus Troublesome forgetting let's talk
 

00:03:52.980 --> 00:03:54.830 align:start position:0%
versus Troublesome forgetting let's talk
again<00:03:53.159><c> about</c><00:03:53.459><c> muscle</c><00:03:53.819><c> memory</c>

00:03:54.830 --> 00:03:54.840 align:start position:0%
again about muscle memory
 

00:03:54.840 --> 00:03:57.949 align:start position:0%
again about muscle memory
muscle<00:03:55.440><c> memory</c><00:03:55.920><c> is</c><00:03:56.340><c> remarkably</c><00:03:57.180><c> stable</c><00:03:57.599><c> over</c>

00:03:57.949 --> 00:03:57.959 align:start position:0%
muscle memory is remarkably stable over
 

00:03:57.959 --> 00:04:01.369 align:start position:0%
muscle memory is remarkably stable over
time<00:03:58.340><c> we</c><00:03:59.340><c> remember</c><00:03:59.700><c> how</c><00:04:00.239><c> to</c><00:04:00.420><c> do</c><00:04:00.659><c> what</c><00:04:01.200><c> we've</c>

00:04:01.369 --> 00:04:01.379 align:start position:0%
time we remember how to do what we've
 

00:04:01.379 --> 00:04:03.949 align:start position:0%
time we remember how to do what we've
learned<00:04:01.680><c> to</c><00:04:01.799><c> do</c><00:04:01.980><c> if</c><00:04:02.940><c> you</c><00:04:03.060><c> go</c><00:04:03.180><c> to</c><00:04:03.360><c> make</c><00:04:03.480><c> a</c><00:04:03.659><c> cup</c><00:04:03.780><c> of</c>

00:04:03.949 --> 00:04:03.959 align:start position:0%
learned to do if you go to make a cup of
 

00:04:03.959 --> 00:04:05.990 align:start position:0%
learned to do if you go to make a cup of
coffee<00:04:04.260><c> and</c><00:04:04.980><c> don't</c><00:04:05.159><c> remember</c><00:04:05.340><c> how</c><00:04:05.700><c> to</c><00:04:05.819><c> work</c>

00:04:05.990 --> 00:04:06.000 align:start position:0%
coffee and don't remember how to work
 

00:04:06.000 --> 00:04:08.270 align:start position:0%
coffee and don't remember how to work
the<00:04:06.239><c> coffee</c><00:04:06.420><c> maker</c><00:04:07.019><c> or</c><00:04:07.860><c> if</c><00:04:07.980><c> you're</c><00:04:08.099><c> doing</c>

00:04:08.270 --> 00:04:08.280 align:start position:0%
the coffee maker or if you're doing
 

00:04:08.280 --> 00:04:10.429 align:start position:0%
the coffee maker or if you're doing
laundry<00:04:08.760><c> but</c><00:04:09.420><c> can't</c><00:04:09.599><c> remember</c><00:04:09.840><c> how</c><00:04:10.140><c> to</c><00:04:10.260><c> use</c>

00:04:10.429 --> 00:04:10.439 align:start position:0%
laundry but can't remember how to use
 

00:04:10.439 --> 00:04:13.729 align:start position:0%
laundry but can't remember how to use
the<00:04:10.739><c> washing</c><00:04:11.220><c> machine</c><00:04:11.659><c> if</c><00:04:12.659><c> you're</c><00:04:12.900><c> stumped</c><00:04:13.379><c> by</c>

00:04:13.729 --> 00:04:13.739 align:start position:0%
the washing machine if you're stumped by
 

00:04:13.739 --> 00:04:16.310 align:start position:0%
the washing machine if you're stumped by
tasks<00:04:14.280><c> you've</c><00:04:14.760><c> long</c><00:04:15.060><c> known</c><00:04:15.360><c> how</c><00:04:15.720><c> to</c><00:04:15.840><c> and</c>

00:04:16.310 --> 00:04:16.320 align:start position:0%
tasks you've long known how to and
 

00:04:16.320 --> 00:04:19.129 align:start position:0%
tasks you've long known how to and
regularly<00:04:16.859><c> do</c><00:04:17.280><c> this</c><00:04:18.180><c> might</c><00:04:18.419><c> be</c><00:04:18.600><c> a</c><00:04:18.840><c> sign</c><00:04:18.959><c> of</c>

00:04:19.129 --> 00:04:19.139 align:start position:0%
regularly do this might be a sign of
 

00:04:19.139 --> 00:04:21.650 align:start position:0%
regularly do this might be a sign of
Alzheimer's<00:04:20.000><c> forgetting</c><00:04:21.000><c> that</c><00:04:21.120><c> isn't</c><00:04:21.419><c> normal</c>

00:04:21.650 --> 00:04:21.660 align:start position:0%
Alzheimer's forgetting that isn't normal
 

00:04:21.660 --> 00:04:25.070 align:start position:0%
Alzheimer's forgetting that isn't normal
doesn't<00:04:22.440><c> have</c><00:04:22.800><c> to</c><00:04:22.919><c> be</c><00:04:23.100><c> due</c><00:04:23.280><c> to</c><00:04:23.460><c> alzheimer's</c><00:04:24.180><c> it</c>

00:04:25.070 --> 00:04:25.080 align:start position:0%
doesn't have to be due to alzheimer's it
 

00:04:25.080 --> 00:04:26.629 align:start position:0%
doesn't have to be due to alzheimer's it
could<00:04:25.199><c> be</c><00:04:25.380><c> due</c><00:04:25.620><c> to</c><00:04:25.800><c> mild</c><00:04:26.100><c> cognitive</c>

00:04:26.629 --> 00:04:26.639 align:start position:0%
could be due to mild cognitive
 

00:04:26.639 --> 00:04:29.150 align:start position:0%
could be due to mild cognitive
impairment<00:04:27.240><c> which</c><00:04:27.960><c> doesn't</c><00:04:28.199><c> always</c><00:04:28.680><c> progress</c>

00:04:29.150 --> 00:04:29.160 align:start position:0%
impairment which doesn't always progress
 

00:04:29.160 --> 00:04:33.290 align:start position:0%
impairment which doesn't always progress
to<00:04:29.340><c> alzheimer's</c><00:04:30.120><c> a</c><00:04:30.840><c> B12</c><00:04:31.259><c> deficiency</c><00:04:31.880><c> or</c><00:04:32.880><c> poor</c>

00:04:33.290 --> 00:04:33.300 align:start position:0%
to alzheimer's a B12 deficiency or poor
 

00:04:33.300 --> 00:04:36.170 align:start position:0%
to alzheimer's a B12 deficiency or poor
sleep<00:04:33.479><c> hygiene</c><00:04:34.020><c> to</c><00:04:34.380><c> name</c><00:04:34.500><c> a</c><00:04:34.740><c> few</c><00:04:34.880><c> just</c><00:04:35.880><c> as</c><00:04:36.000><c> you</c>

00:04:36.170 --> 00:04:36.180 align:start position:0%
sleep hygiene to name a few just as you
 

00:04:36.180 --> 00:04:37.670 align:start position:0%
sleep hygiene to name a few just as you
do<00:04:36.300><c> with</c><00:04:36.600><c> your</c><00:04:36.840><c> heart</c><00:04:37.020><c> health</c><00:04:37.259><c> and</c>

00:04:37.670 --> 00:04:37.680 align:start position:0%
do with your heart health and
 

00:04:37.680 --> 00:04:40.430 align:start position:0%
do with your heart health and
reproductive<00:04:38.340><c> parts</c><00:04:38.639><c> I</c><00:04:39.479><c> encourage</c><00:04:39.900><c> you</c><00:04:40.080><c> to</c><00:04:40.320><c> be</c>

00:04:40.430 --> 00:04:40.440 align:start position:0%
reproductive parts I encourage you to be
 

00:04:40.440 --> 00:04:42.890 align:start position:0%
reproductive parts I encourage you to be
in<00:04:40.680><c> conversation</c><00:04:41.220><c> with</c><00:04:41.699><c> your</c><00:04:41.880><c> doctor</c><00:04:42.120><c> about</c>

00:04:42.890 --> 00:04:42.900 align:start position:0%
in conversation with your doctor about
 

00:04:42.900 --> 00:04:46.370 align:start position:0%
in conversation with your doctor about
your<00:04:43.320><c> memory</c><00:04:43.680><c> and</c><00:04:44.580><c> realize</c><00:04:44.940><c> that</c><00:04:45.360><c> you</c><00:04:45.720><c> have</c><00:04:46.080><c> a</c>

00:04:46.370 --> 00:04:46.380 align:start position:0%
your memory and realize that you have a
 

00:04:46.380 --> 00:04:50.720 align:start position:0%
your memory and realize that you have a
lot<00:04:46.500><c> of</c><00:04:46.680><c> agency</c><00:04:47.100><c> over</c><00:04:48.000><c> your</c><00:04:48.300><c> brain</c><00:04:48.540><c> health</c>


```

# How to boost your brain and memory/Pay Attention.en.vtt

```vtt
WEBVTT
Kind: captions
Language: en

00:00:05.960 --> 00:00:09.169 align:start position:0%
 
let's<00:00:06.960><c> start</c><00:00:07.259><c> with</c><00:00:07.799><c> the</c><00:00:08.160><c> easiest</c><00:00:08.580><c> way</c><00:00:08.940><c> to</c>

00:00:09.169 --> 00:00:09.179 align:start position:0%
let's start with the easiest way to
 

00:00:09.179 --> 00:00:10.730 align:start position:0%
let's start with the easiest way to
improve<00:00:09.540><c> your</c><00:00:09.720><c> memory</c>

00:00:10.730 --> 00:00:10.740 align:start position:0%
improve your memory
 

00:00:10.740 --> 00:00:12.650 align:start position:0%
improve your memory
pay<00:00:11.340><c> attention</c>

00:00:12.650 --> 00:00:12.660 align:start position:0%
pay attention
 

00:00:12.660 --> 00:00:15.770 align:start position:0%
pay attention
the<00:00:13.440><c> first</c><00:00:13.679><c> necessary</c><00:00:14.519><c> ingredient</c><00:00:15.000><c> in</c>

00:00:15.770 --> 00:00:15.780 align:start position:0%
the first necessary ingredient in
 

00:00:15.780 --> 00:00:18.290 align:start position:0%
the first necessary ingredient in
creating<00:00:16.139><c> a</c><00:00:16.440><c> memory</c><00:00:16.740><c> that</c><00:00:17.279><c> lasts</c><00:00:17.640><c> longer</c><00:00:18.060><c> than</c>

00:00:18.290 --> 00:00:18.300 align:start position:0%
creating a memory that lasts longer than
 

00:00:18.300 --> 00:00:21.529 align:start position:0%
creating a memory that lasts longer than
this<00:00:18.660><c> present</c><00:00:19.020><c> moment</c><00:00:19.440><c> is</c><00:00:20.220><c> attention</c>

00:00:21.529 --> 00:00:21.539 align:start position:0%
this present moment is attention
 

00:00:21.539 --> 00:00:23.769 align:start position:0%
this present moment is attention
your<00:00:22.140><c> memory</c><00:00:22.439><c> isn't</c><00:00:22.920><c> a</c><00:00:23.160><c> video</c><00:00:23.400><c> camera</c>

00:00:23.769 --> 00:00:23.779 align:start position:0%
your memory isn't a video camera
 

00:00:23.779 --> 00:00:26.090 align:start position:0%
your memory isn't a video camera
recording<00:00:24.779><c> a</c><00:00:25.019><c> constant</c><00:00:25.380><c> stream</c><00:00:25.619><c> of</c><00:00:25.920><c> every</c>

00:00:26.090 --> 00:00:26.100 align:start position:0%
recording a constant stream of every
 

00:00:26.100 --> 00:00:28.790 align:start position:0%
recording a constant stream of every
Sight<00:00:26.400><c> and</c><00:00:26.580><c> Sound</c><00:00:26.820><c> you're</c><00:00:27.119><c> exposed</c><00:00:27.660><c> to</c>

00:00:28.790 --> 00:00:28.800 align:start position:0%
Sight and Sound you're exposed to
 

00:00:28.800 --> 00:00:30.529 align:start position:0%
Sight and Sound you're exposed to
think<00:00:29.279><c> about</c><00:00:29.400><c> the</c><00:00:29.880><c> vast</c><00:00:30.060><c> amount</c><00:00:30.420><c> of</c>

00:00:30.529 --> 00:00:30.539 align:start position:0%
think about the vast amount of
 

00:00:30.539 --> 00:00:32.870 align:start position:0%
think about the vast amount of
information<00:00:30.779><c> that</c><00:00:31.679><c> your</c><00:00:31.859><c> senses</c><00:00:32.279><c> are</c><00:00:32.460><c> exposed</c>

00:00:32.870 --> 00:00:32.880 align:start position:0%
information that your senses are exposed
 

00:00:32.880 --> 00:00:35.930 align:start position:0%
information that your senses are exposed
to<00:00:32.940><c> in</c><00:00:33.180><c> any</c><00:00:33.360><c> given</c><00:00:33.660><c> day</c><00:00:33.980><c> if</c><00:00:34.980><c> you're</c><00:00:35.160><c> awake</c><00:00:35.579><c> for</c>

00:00:35.930 --> 00:00:35.940 align:start position:0%
to in any given day if you're awake for
 

00:00:35.940 --> 00:00:39.590 align:start position:0%
to in any given day if you're awake for
16<00:00:36.239><c> hours</c><00:00:36.719><c> today</c><00:00:37.280><c> your</c><00:00:38.280><c> senses</c><00:00:38.700><c> are</c><00:00:39.000><c> open</c><00:00:39.180><c> for</c>

00:00:39.590 --> 00:00:39.600 align:start position:0%
16 hours today your senses are open for
 

00:00:39.600 --> 00:00:43.790 align:start position:0%
16 hours today your senses are open for
business<00:00:39.840><c> without</c><00:00:40.500><c> a</c><00:00:40.920><c> break</c><00:00:41.040><c> for</c><00:00:41.820><c> 57</c><00:00:42.800><c> 600</c>

00:00:43.790 --> 00:00:43.800 align:start position:0%
business without a break for 57 600
 

00:00:43.800 --> 00:00:44.990 align:start position:0%
business without a break for 57 600
seconds

00:00:44.990 --> 00:00:45.000 align:start position:0%
seconds
 

00:00:45.000 --> 00:00:48.229 align:start position:0%
seconds
that's<00:00:45.660><c> a</c><00:00:45.840><c> lot</c><00:00:45.960><c> of</c><00:00:46.140><c> data</c><00:00:47.040><c> but</c><00:00:47.579><c> you</c><00:00:47.879><c> simply</c>

00:00:48.229 --> 00:00:48.239 align:start position:0%
that's a lot of data but you simply
 

00:00:48.239 --> 00:00:50.690 align:start position:0%
that's a lot of data but you simply
can't<00:00:48.660><c> and</c><00:00:49.079><c> won't</c><00:00:49.320><c> remember</c><00:00:49.680><c> most</c><00:00:50.280><c> of</c><00:00:50.460><c> what</c>

00:00:50.690 --> 00:00:50.700 align:start position:0%
can't and won't remember most of what
 

00:00:50.700 --> 00:00:53.450 align:start position:0%
can't and won't remember most of what
was<00:00:50.879><c> available</c><00:00:51.180><c> to</c><00:00:51.960><c> your</c><00:00:52.200><c> eyes</c><00:00:52.440><c> ears</c><00:00:52.980><c> nose</c><00:00:53.280><c> and</c>

00:00:53.450 --> 00:00:53.460 align:start position:0%
was available to your eyes ears nose and
 

00:00:53.460 --> 00:00:54.830 align:start position:0%
was available to your eyes ears nose and
brain<00:00:53.820><c> today</c>

00:00:54.830 --> 00:00:54.840 align:start position:0%
brain today
 

00:00:54.840 --> 00:00:57.350 align:start position:0%
brain today
it's<00:00:55.440><c> not</c><00:00:55.739><c> enough</c><00:00:55.980><c> for</c><00:00:56.520><c> your</c><00:00:56.699><c> senses</c><00:00:57.120><c> to</c>

00:00:57.350 --> 00:00:57.360 align:start position:0%
it's not enough for your senses to
 

00:00:57.360 --> 00:01:00.170 align:start position:0%
it's not enough for your senses to
perceive<00:00:57.840><c> information</c><00:00:58.460><c> your</c><00:00:59.460><c> hippocampus</c>

00:01:00.170 --> 00:01:00.180 align:start position:0%
perceive information your hippocampus
 

00:01:00.180 --> 00:01:03.410 align:start position:0%
perceive information your hippocampus
can't<00:01:00.600><c> link</c><00:01:00.960><c> any</c><00:01:01.800><c> information</c><00:01:02.100><c> into</c><00:01:03.059><c> a</c>

00:01:03.410 --> 00:01:03.420 align:start position:0%
can't link any information into a
 

00:01:03.420 --> 00:01:06.170 align:start position:0%
can't link any information into a
lasting<00:01:03.780><c> memory</c><00:01:04.199><c> without</c><00:01:05.159><c> the</c><00:01:05.519><c> neural</c><00:01:05.820><c> input</c>

00:01:06.170 --> 00:01:06.180 align:start position:0%
lasting memory without the neural input
 

00:01:06.180 --> 00:01:07.850 align:start position:0%
lasting memory without the neural input
of<00:01:06.479><c> attention</c>

00:01:07.850 --> 00:01:07.860 align:start position:0%
of attention
 

00:01:07.860 --> 00:01:10.910 align:start position:0%
of attention
when<00:01:08.400><c> you</c><00:01:08.700><c> can't</c><00:01:08.820><c> find</c><00:01:09.180><c> your</c><00:01:09.479><c> glasses</c><00:01:10.020><c> or</c><00:01:10.680><c> your</c>

00:01:10.910 --> 00:01:10.920 align:start position:0%
when you can't find your glasses or your
 

00:01:10.920 --> 00:01:13.730 align:start position:0%
when you can't find your glasses or your
keys<00:01:11.340><c> or</c><00:01:11.640><c> your</c><00:01:11.939><c> phone</c><00:01:12.180><c> I'm</c><00:01:13.140><c> betting</c><00:01:13.560><c> you</c>

00:01:13.730 --> 00:01:13.740 align:start position:0%
keys or your phone I'm betting you
 

00:01:13.740 --> 00:01:16.730 align:start position:0%
keys or your phone I'm betting you
actually<00:01:14.040><c> haven't</c><00:01:14.400><c> forgotten</c><00:01:15.060><c> anything</c><00:01:15.740><c> you</c>

00:01:16.730 --> 00:01:16.740 align:start position:0%
actually haven't forgotten anything you
 

00:01:16.740 --> 00:01:18.350 align:start position:0%
actually haven't forgotten anything you
didn't<00:01:16.860><c> pay</c><00:01:17.159><c> attention</c><00:01:17.460><c> to</c><00:01:17.760><c> where</c><00:01:17.939><c> you</c><00:01:18.180><c> set</c>

00:01:18.350 --> 00:01:18.360 align:start position:0%
didn't pay attention to where you set
 

00:01:18.360 --> 00:01:20.870 align:start position:0%
didn't pay attention to where you set
them<00:01:18.600><c> down</c><00:01:18.900><c> and</c><00:01:19.560><c> so</c><00:01:19.740><c> you</c><00:01:19.979><c> never</c><00:01:20.159><c> created</c><00:01:20.640><c> a</c>

00:01:20.870 --> 00:01:20.880 align:start position:0%
them down and so you never created a
 

00:01:20.880 --> 00:01:22.310 align:start position:0%
them down and so you never created a
memory<00:01:21.119><c> of</c><00:01:21.240><c> where</c><00:01:21.420><c> you</c><00:01:21.600><c> put</c><00:01:21.780><c> them</c><00:01:21.900><c> in</c><00:01:22.200><c> the</c>

00:01:22.310 --> 00:01:22.320 align:start position:0%
memory of where you put them in the
 

00:01:22.320 --> 00:01:24.050 align:start position:0%
memory of where you put them in the
first<00:01:22.560><c> place</c>

00:01:24.050 --> 00:01:24.060 align:start position:0%
first place
 

00:01:24.060 --> 00:01:26.270 align:start position:0%
first place
do<00:01:24.659><c> you</c><00:01:24.840><c> remember</c><00:01:24.960><c> the</c><00:01:25.439><c> details</c><00:01:25.799><c> of</c><00:01:25.979><c> what</c><00:01:26.159><c> you</c>

00:01:26.270 --> 00:01:26.280 align:start position:0%
do you remember the details of what you
 

00:01:26.280 --> 00:01:29.390 align:start position:0%
do you remember the details of what you
had<00:01:26.460><c> for</c><00:01:26.700><c> lunch</c><00:01:26.939><c> on</c><00:01:27.360><c> this</c><00:01:27.600><c> day</c><00:01:27.780><c> last</c><00:01:28.080><c> week</c><00:01:28.400><c> or</c>

00:01:29.390 --> 00:01:29.400 align:start position:0%
had for lunch on this day last week or
 

00:01:29.400 --> 00:01:32.149 align:start position:0%
had for lunch on this day last week or
everyone<00:01:29.640><c> you</c><00:01:30.000><c> emailed</c><00:01:30.420><c> two</c><00:01:30.720><c> days</c><00:01:30.960><c> ago</c>

00:01:32.149 --> 00:01:32.159 align:start position:0%
everyone you emailed two days ago
 

00:01:32.159 --> 00:01:33.770 align:start position:0%
everyone you emailed two days ago
probably<00:01:32.640><c> not</c>

00:01:33.770 --> 00:01:33.780 align:start position:0%
probably not
 

00:01:33.780 --> 00:01:35.810 align:start position:0%
probably not
have<00:01:34.259><c> you</c><00:01:34.380><c> ever</c><00:01:34.500><c> driven</c><00:01:34.920><c> a</c><00:01:35.100><c> familiar</c><00:01:35.400><c> stretch</c>

00:01:35.810 --> 00:01:35.820 align:start position:0%
have you ever driven a familiar stretch
 

00:01:35.820 --> 00:01:37.670 align:start position:0%
have you ever driven a familiar stretch
of<00:01:35.880><c> road</c><00:01:36.119><c> and</c><00:01:36.720><c> you</c><00:01:36.840><c> suddenly</c><00:01:37.200><c> realized</c><00:01:37.500><c> that</c>

00:01:37.670 --> 00:01:37.680 align:start position:0%
of road and you suddenly realized that
 

00:01:37.680 --> 00:01:40.550 align:start position:0%
of road and you suddenly realized that
you<00:01:37.860><c> have</c><00:01:38.040><c> no</c><00:01:38.340><c> memory</c><00:01:38.579><c> of</c><00:01:38.820><c> the</c><00:01:38.880><c> trip</c><00:01:39.060><c> so</c><00:01:39.360><c> far</c>

00:01:40.550 --> 00:01:40.560 align:start position:0%
you have no memory of the trip so far
 

00:01:40.560 --> 00:01:42.590 align:start position:0%
you have no memory of the trip so far
has<00:01:41.040><c> someone</c><00:01:41.280><c> ever</c><00:01:41.579><c> asked</c><00:01:42.060><c> you</c><00:01:42.180><c> to</c><00:01:42.360><c> do</c>

00:01:42.590 --> 00:01:42.600 align:start position:0%
has someone ever asked you to do
 

00:01:42.600 --> 00:01:44.749 align:start position:0%
has someone ever asked you to do
something<00:01:42.960><c> and</c><00:01:43.680><c> then</c><00:01:43.860><c> five</c><00:01:44.159><c> minutes</c><00:01:44.400><c> later</c>

00:01:44.749 --> 00:01:44.759 align:start position:0%
something and then five minutes later
 

00:01:44.759 --> 00:01:47.810 align:start position:0%
something and then five minutes later
you<00:01:45.600><c> can't</c><00:01:45.720><c> remember</c><00:01:45.960><c> what</c><00:01:46.320><c> she</c><00:01:46.560><c> said</c>

00:01:47.810 --> 00:01:47.820 align:start position:0%
you can't remember what she said
 

00:01:47.820 --> 00:01:49.429 align:start position:0%
you can't remember what she said
whether<00:01:48.420><c> it</c><00:01:48.659><c> was</c><00:01:48.780><c> because</c><00:01:48.960><c> you</c><00:01:49.320><c> were</c>

00:01:49.429 --> 00:01:49.439 align:start position:0%
whether it was because you were
 

00:01:49.439 --> 00:01:52.190 align:start position:0%
whether it was because you were
distracted<00:01:50.100><c> or</c><00:01:50.520><c> not</c><00:01:50.700><c> interested</c><00:01:51.180><c> you</c><00:01:52.020><c> can't</c>

00:01:52.190 --> 00:01:52.200 align:start position:0%
distracted or not interested you can't
 

00:01:52.200 --> 00:01:54.590 align:start position:0%
distracted or not interested you can't
remember<00:01:52.500><c> these</c><00:01:53.100><c> things</c><00:01:53.340><c> because</c><00:01:53.939><c> you</c><00:01:54.420><c> didn't</c>

00:01:54.590 --> 00:01:54.600 align:start position:0%
remember these things because you didn't
 

00:01:54.600 --> 00:01:56.749 align:start position:0%
remember these things because you didn't
give<00:01:54.840><c> them</c><00:01:55.020><c> your</c><00:01:55.259><c> attention</c>

00:01:56.749 --> 00:01:56.759 align:start position:0%
give them your attention
 

00:01:56.759 --> 00:01:59.210 align:start position:0%
give them your attention
so<00:01:57.360><c> what</c><00:01:57.659><c> do</c><00:01:57.780><c> we</c><00:01:57.899><c> humans</c><00:01:58.259><c> pay</c><00:01:58.560><c> attention</c><00:01:58.920><c> to</c>

00:01:59.210 --> 00:01:59.220 align:start position:0%
so what do we humans pay attention to
 

00:01:59.220 --> 00:02:01.609 align:start position:0%
so what do we humans pay attention to
and<00:02:00.119><c> therefore</c><00:02:00.479><c> remember</c>

00:02:01.609 --> 00:02:01.619 align:start position:0%
and therefore remember
 

00:02:01.619 --> 00:02:04.370 align:start position:0%
and therefore remember
our<00:02:02.399><c> brains</c><00:02:02.759><c> are</c><00:02:03.000><c> pretty</c><00:02:03.299><c> phenomenal</c><00:02:03.960><c> at</c>

00:02:04.370 --> 00:02:04.380 align:start position:0%
our brains are pretty phenomenal at
 

00:02:04.380 --> 00:02:06.649 align:start position:0%
our brains are pretty phenomenal at
attending<00:02:04.920><c> to</c><00:02:05.100><c> and</c><00:02:05.340><c> remembering</c><00:02:05.880><c> what</c><00:02:06.479><c> is</c>

00:02:06.649 --> 00:02:06.659 align:start position:0%
attending to and remembering what is
 

00:02:06.659 --> 00:02:10.850 align:start position:0%
attending to and remembering what is
Meaningful<00:02:07.220><c> emotional</c><00:02:08.420><c> surprising</c><00:02:09.420><c> new</c><00:02:10.200><c> and</c>

00:02:10.850 --> 00:02:10.860 align:start position:0%
Meaningful emotional surprising new and
 

00:02:10.860 --> 00:02:13.970 align:start position:0%
Meaningful emotional surprising new and
what<00:02:11.039><c> is</c><00:02:11.220><c> repeated</c><00:02:11.580><c> or</c><00:02:11.879><c> practiced</c><00:02:13.020><c> we</c><00:02:13.560><c> ignore</c>

00:02:13.970 --> 00:02:13.980 align:start position:0%
what is repeated or practiced we ignore
 

00:02:13.980 --> 00:02:18.110 align:start position:0%
what is repeated or practiced we ignore
and<00:02:14.940><c> therefore</c><00:02:15.360><c> forget</c><00:02:15.720><c> what</c><00:02:16.680><c> isn't</c>

00:02:18.110 --> 00:02:18.120 align:start position:0%
and therefore forget what isn't
 

00:02:18.120 --> 00:02:20.449 align:start position:0%
and therefore forget what isn't
how<00:02:18.660><c> can</c><00:02:18.780><c> we</c><00:02:18.959><c> improve</c><00:02:19.440><c> our</c><00:02:19.680><c> ability</c><00:02:19.980><c> to</c><00:02:20.340><c> pay</c>

00:02:20.449 --> 00:02:20.459 align:start position:0%
how can we improve our ability to pay
 

00:02:20.459 --> 00:02:23.390 align:start position:0%
how can we improve our ability to pay
attention<00:02:20.879><c> and</c><00:02:21.720><c> therefore</c><00:02:22.200><c> our</c><00:02:22.620><c> ability</c><00:02:22.980><c> to</c>

00:02:23.390 --> 00:02:23.400 align:start position:0%
attention and therefore our ability to
 

00:02:23.400 --> 00:02:24.790 align:start position:0%
attention and therefore our ability to
remember

00:02:24.790 --> 00:02:24.800 align:start position:0%
remember
 

00:02:24.800 --> 00:02:28.670 align:start position:0%
remember
decreased<00:02:25.800><c> distractions</c><00:02:27.120><c> put</c><00:02:27.900><c> down</c><00:02:28.200><c> your</c>

00:02:28.670 --> 00:02:28.680 align:start position:0%
decreased distractions put down your
 

00:02:28.680 --> 00:02:30.949 align:start position:0%
decreased distractions put down your
phone<00:02:29.040><c> it's</c><00:02:30.000><c> probably</c><00:02:30.300><c> your</c><00:02:30.840><c> biggest</c>

00:02:30.949 --> 00:02:30.959 align:start position:0%
phone it's probably your biggest
 

00:02:30.959 --> 00:02:33.170 align:start position:0%
phone it's probably your biggest
attention<00:02:31.500><c> Thief</c>

00:02:33.170 --> 00:02:33.180 align:start position:0%
attention Thief
 

00:02:33.180 --> 00:02:36.470 align:start position:0%
attention Thief
stop<00:02:33.780><c> multitasking</c><00:02:34.739><c> when</c><00:02:35.700><c> you</c><00:02:35.940><c> multitask</c>

00:02:36.470 --> 00:02:36.480 align:start position:0%
stop multitasking when you multitask
 

00:02:36.480 --> 00:02:38.869 align:start position:0%
stop multitasking when you multitask
you're<00:02:37.260><c> not</c><00:02:37.440><c> giving</c><00:02:37.680><c> your</c><00:02:38.099><c> full</c><00:02:38.220><c> attention</c><00:02:38.580><c> to</c>

00:02:38.869 --> 00:02:38.879 align:start position:0%
you're not giving your full attention to
 

00:02:38.879 --> 00:02:41.330 align:start position:0%
you're not giving your full attention to
each<00:02:39.120><c> task</c><00:02:39.420><c> and</c><00:02:40.140><c> so</c><00:02:40.319><c> you're</c><00:02:40.680><c> compromising</c>

00:02:41.330 --> 00:02:41.340 align:start position:0%
each task and so you're compromising
 

00:02:41.340 --> 00:02:43.130 align:start position:0%
each task and so you're compromising
your<00:02:41.640><c> brain's</c><00:02:41.940><c> ability</c><00:02:42.239><c> to</c><00:02:42.599><c> create</c><00:02:42.720><c> full</c>

00:02:43.130 --> 00:02:43.140 align:start position:0%
your brain's ability to create full
 

00:02:43.140 --> 00:02:45.410 align:start position:0%
your brain's ability to create full
memories<00:02:43.620><c> of</c><00:02:43.920><c> them</c>

00:02:45.410 --> 00:02:45.420 align:start position:0%
memories of them
 

00:02:45.420 --> 00:02:48.229 align:start position:0%
memories of them
practices<00:02:46.140><c> like</c><00:02:46.560><c> yoga</c><00:02:47.099><c> and</c><00:02:47.700><c> mindfulness</c>

00:02:48.229 --> 00:02:48.239 align:start position:0%
practices like yoga and mindfulness
 

00:02:48.239 --> 00:02:50.930 align:start position:0%
practices like yoga and mindfulness
meditation<00:02:48.840><c> can</c><00:02:49.560><c> help</c><00:02:49.860><c> you</c><00:02:49.980><c> strengthen</c><00:02:50.580><c> your</c>

00:02:50.930 --> 00:02:50.940 align:start position:0%
meditation can help you strengthen your
 

00:02:50.940 --> 00:02:53.330 align:start position:0%
meditation can help you strengthen your
ability<00:02:51.180><c> to</c><00:02:51.599><c> be</c><00:02:51.720><c> present</c><00:02:52.200><c> and</c><00:02:52.739><c> pay</c><00:02:52.920><c> attention</c>

00:02:53.330 --> 00:02:53.340 align:start position:0%
ability to be present and pay attention
 

00:02:53.340 --> 00:02:56.089 align:start position:0%
ability to be present and pay attention
and<00:02:54.239><c> in</c><00:02:54.420><c> doing</c><00:02:54.599><c> so</c><00:02:54.840><c> can</c><00:02:55.140><c> help</c><00:02:55.379><c> you</c><00:02:55.560><c> improve</c>

00:02:56.089 --> 00:02:56.099 align:start position:0%
and in doing so can help you improve
 

00:02:56.099 --> 00:02:58.700 align:start position:0%
and in doing so can help you improve
your<00:02:56.400><c> memory</c>


```

# How to boost your brain and memory/Prospective Memory.en.vtt

```vtt
WEBVTT
Kind: captions
Language: en

00:00:06.600 --> 00:00:09.129 align:start position:0%
 
up<00:00:07.200><c> until</c><00:00:07.379><c> now</c><00:00:07.799><c> we've</c><00:00:08.340><c> been</c><00:00:08.460><c> talking</c><00:00:08.700><c> about</c>

00:00:09.129 --> 00:00:09.139 align:start position:0%
up until now we've been talking about
 

00:00:09.139 --> 00:00:11.870 align:start position:0%
up until now we've been talking about
retrospective<00:00:10.139><c> memories</c><00:00:10.620><c> your</c><00:00:11.460><c> memory</c><00:00:11.700><c> for</c>

00:00:11.870 --> 00:00:11.880 align:start position:0%
retrospective memories your memory for
 

00:00:11.880 --> 00:00:14.270 align:start position:0%
retrospective memories your memory for
what's<00:00:12.120><c> happened</c><00:00:12.420><c> in</c><00:00:12.780><c> the</c><00:00:12.900><c> past</c><00:00:13.139><c> but</c><00:00:14.099><c> there's</c>

00:00:14.270 --> 00:00:14.280 align:start position:0%
what's happened in the past but there's
 

00:00:14.280 --> 00:00:16.849 align:start position:0%
what's happened in the past but there's
another<00:00:14.580><c> kind</c><00:00:14.940><c> of</c><00:00:15.059><c> memory</c><00:00:15.859><c> prospective</c>

00:00:16.849 --> 00:00:16.859 align:start position:0%
another kind of memory prospective
 

00:00:16.859 --> 00:00:18.890 align:start position:0%
another kind of memory prospective
memory<00:00:17.279><c> is</c><00:00:17.760><c> your</c><00:00:18.000><c> memory</c><00:00:18.240><c> for</c><00:00:18.420><c> what</c><00:00:18.660><c> you</c><00:00:18.779><c> need</c>

00:00:18.890 --> 00:00:18.900 align:start position:0%
memory is your memory for what you need
 

00:00:18.900 --> 00:00:21.470 align:start position:0%
memory is your memory for what you need
to<00:00:19.080><c> do</c><00:00:19.260><c> later</c><00:00:19.560><c> this</c><00:00:20.460><c> is</c><00:00:20.580><c> your</c><00:00:20.760><c> brain's</c><00:00:21.119><c> to-do</c>

00:00:21.470 --> 00:00:21.480 align:start position:0%
to do later this is your brain's to-do
 

00:00:21.480 --> 00:00:24.230 align:start position:0%
to do later this is your brain's to-do
list<00:00:21.720><c> a</c><00:00:22.619><c> memory</c><00:00:22.859><c> to</c><00:00:23.100><c> be</c><00:00:23.220><c> recalled</c><00:00:23.699><c> in</c><00:00:23.880><c> a</c><00:00:24.060><c> future</c>

00:00:24.230 --> 00:00:24.240 align:start position:0%
list a memory to be recalled in a future
 

00:00:24.240 --> 00:00:25.849 align:start position:0%
list a memory to be recalled in a future
time<00:00:24.600><c> and</c><00:00:24.900><c> place</c>

00:00:25.849 --> 00:00:25.859 align:start position:0%
time and place
 

00:00:25.859 --> 00:00:29.450 align:start position:0%
time and place
and<00:00:26.340><c> it</c><00:00:26.580><c> is</c><00:00:26.760><c> fraught</c><00:00:27.359><c> with</c><00:00:27.539><c> forgetting</c><00:00:28.199><c> if</c><00:00:29.160><c> the</c>

00:00:29.450 --> 00:00:29.460 align:start position:0%
and it is fraught with forgetting if the
 

00:00:29.460 --> 00:00:31.669 align:start position:0%
and it is fraught with forgetting if the
right<00:00:29.640><c> cue</c><00:00:30.000><c> isn't</c><00:00:30.480><c> available</c><00:00:30.720><c> at</c><00:00:31.320><c> the</c><00:00:31.500><c> right</c>

00:00:31.669 --> 00:00:31.679 align:start position:0%
right cue isn't available at the right
 

00:00:31.679 --> 00:00:33.950 align:start position:0%
right cue isn't available at the right
place<00:00:32.040><c> and</c><00:00:32.399><c> at</c><00:00:32.579><c> the</c><00:00:32.759><c> right</c><00:00:32.940><c> time</c>

00:00:33.950 --> 00:00:33.960 align:start position:0%
place and at the right time
 

00:00:33.960 --> 00:00:37.970 align:start position:0%
place and at the right time
we<00:00:34.620><c> forget</c><00:00:34.800><c> to</c><00:00:35.219><c> do</c><00:00:35.460><c> what</c><00:00:35.880><c> we</c><00:00:36.120><c> intend</c><00:00:36.420><c> to</c><00:00:36.600><c> do</c><00:00:36.980><c> a</c>

00:00:37.970 --> 00:00:37.980 align:start position:0%
we forget to do what we intend to do a
 

00:00:37.980 --> 00:00:38.810 align:start position:0%
we forget to do what we intend to do a
lot

00:00:38.810 --> 00:00:38.820 align:start position:0%
lot
 

00:00:38.820 --> 00:00:41.389 align:start position:0%
lot
marketing<00:00:39.780><c> companies</c><00:00:40.200><c> take</c><00:00:40.620><c> advantage</c><00:00:41.100><c> of</c>

00:00:41.389 --> 00:00:41.399 align:start position:0%
marketing companies take advantage of
 

00:00:41.399 --> 00:00:43.790 align:start position:0%
marketing companies take advantage of
our<00:00:41.640><c> prospective</c><00:00:42.180><c> memory</c><00:00:42.540><c> failures</c><00:00:43.020><c> all</c><00:00:43.620><c> the</c>

00:00:43.790 --> 00:00:43.800 align:start position:0%
our prospective memory failures all the
 

00:00:43.800 --> 00:00:45.049 align:start position:0%
our prospective memory failures all the
time

00:00:45.049 --> 00:00:45.059 align:start position:0%
time
 

00:00:45.059 --> 00:00:47.150 align:start position:0%
time
have<00:00:45.480><c> you</c><00:00:45.600><c> ever</c><00:00:45.780><c> joined</c><00:00:46.260><c> an</c><00:00:46.440><c> online</c><00:00:46.680><c> exercise</c>

00:00:47.150 --> 00:00:47.160 align:start position:0%
have you ever joined an online exercise
 

00:00:47.160 --> 00:00:50.209 align:start position:0%
have you ever joined an online exercise
program<00:00:47.760><c> or</c><00:00:48.600><c> subscribed</c><00:00:49.079><c> to</c><00:00:49.320><c> something</c><00:00:49.559><c> for</c><00:00:49.980><c> a</c>

00:00:50.209 --> 00:00:50.219 align:start position:0%
program or subscribed to something for a
 

00:00:50.219 --> 00:00:53.029 align:start position:0%
program or subscribed to something for a
free<00:00:50.399><c> 30-day</c><00:00:50.940><c> trial</c><00:00:51.440><c> fully</c><00:00:52.440><c> planning</c><00:00:52.800><c> to</c>

00:00:53.029 --> 00:00:53.039 align:start position:0%
free 30-day trial fully planning to
 

00:00:53.039 --> 00:00:55.010 align:start position:0%
free 30-day trial fully planning to
cancel<00:00:53.280><c> or</c><00:00:53.700><c> unsubscribe</c><00:00:54.239><c> if</c><00:00:54.480><c> you</c><00:00:54.660><c> find</c><00:00:54.780><c> that</c>

00:00:55.010 --> 00:00:55.020 align:start position:0%
cancel or unsubscribe if you find that
 

00:00:55.020 --> 00:00:56.810 align:start position:0%
cancel or unsubscribe if you find that
you<00:00:55.140><c> don't</c><00:00:55.260><c> use</c><00:00:55.440><c> it</c><00:00:55.620><c> or</c><00:00:55.800><c> like</c><00:00:56.039><c> it</c>

00:00:56.810 --> 00:00:56.820 align:start position:0%
you don't use it or like it
 

00:00:56.820 --> 00:00:58.490 align:start position:0%
you don't use it or like it
and<00:00:57.239><c> what</c><00:00:57.420><c> happened</c>

00:00:58.490 --> 00:00:58.500 align:start position:0%
and what happened
 

00:00:58.500 --> 00:01:00.650 align:start position:0%
and what happened
you<00:00:58.920><c> get</c><00:00:59.100><c> your</c><00:00:59.340><c> next</c><00:00:59.520><c> credit</c><00:00:59.879><c> card</c><00:01:00.180><c> statement</c>

00:01:00.650 --> 00:01:00.660 align:start position:0%
you get your next credit card statement
 

00:01:00.660 --> 00:01:03.529 align:start position:0%
you get your next credit card statement
and<00:01:01.199><c> see</c><00:01:01.320><c> that</c><00:01:01.500><c> you've</c><00:01:01.739><c> been</c><00:01:01.860><c> charged</c><00:01:02.340><c> 99</c><00:01:02.760><c> for</c>

00:01:03.529 --> 00:01:03.539 align:start position:0%
and see that you've been charged 99 for
 

00:01:03.539 --> 00:01:05.570 align:start position:0%
and see that you've been charged 99 for
the<00:01:03.719><c> year</c><00:01:03.899><c> because</c><00:01:04.680><c> you</c><00:01:04.979><c> forgot</c><00:01:05.400><c> to</c>

00:01:05.570 --> 00:01:05.580 align:start position:0%
the year because you forgot to
 

00:01:05.580 --> 00:01:07.910 align:start position:0%
the year because you forgot to
unsubscribe

00:01:07.910 --> 00:01:07.920 align:start position:0%
unsubscribe
 

00:01:07.920 --> 00:01:10.429 align:start position:0%
unsubscribe
maybe<00:01:08.640><c> we</c><00:01:08.939><c> all</c><00:01:09.180><c> forget</c><00:01:09.360><c> to</c><00:01:09.659><c> remember</c><00:01:09.900><c> the</c>

00:01:10.429 --> 00:01:10.439 align:start position:0%
maybe we all forget to remember the
 

00:01:10.439 --> 00:01:13.310 align:start position:0%
maybe we all forget to remember the
little<00:01:10.619><c> things</c><00:01:11.040><c> that</c><00:01:11.760><c> aren't</c><00:01:11.880><c> life</c><00:01:12.240><c> and</c><00:01:12.420><c> death</c>

00:01:13.310 --> 00:01:13.320 align:start position:0%
little things that aren't life and death
 

00:01:13.320 --> 00:01:15.649 align:start position:0%
little things that aren't life and death
our<00:01:13.920><c> prospective</c><00:01:14.460><c> memories</c><00:01:14.880><c> for</c><00:01:15.240><c> high</c>

00:01:15.649 --> 00:01:15.659 align:start position:0%
our prospective memories for high
 

00:01:15.659 --> 00:01:18.350 align:start position:0%
our prospective memories for high
priority<00:01:16.020><c> tasks</c><00:01:16.680><c> immune</c><00:01:17.220><c> to</c><00:01:17.280><c> forgetting</c>

00:01:18.350 --> 00:01:18.360 align:start position:0%
priority tasks immune to forgetting
 

00:01:18.360 --> 00:01:22.850 align:start position:0%
priority tasks immune to forgetting
nope<00:01:19.520><c> prospective</c><00:01:20.520><c> memory</c><00:01:20.939><c> is</c><00:01:21.420><c> unreliable</c><00:01:22.259><c> no</c>

00:01:22.850 --> 00:01:22.860 align:start position:0%
nope prospective memory is unreliable no
 

00:01:22.860 --> 00:01:25.910 align:start position:0%
nope prospective memory is unreliable no
matter<00:01:23.040><c> the</c><00:01:23.340><c> stakes</c><00:01:23.759><c> no</c><00:01:24.299><c> matter</c><00:01:24.540><c> the</c><00:01:24.840><c> brain</c>

00:01:25.910 --> 00:01:25.920 align:start position:0%
matter the stakes no matter the brain
 

00:01:25.920 --> 00:01:28.969 align:start position:0%
matter the stakes no matter the brain
here<00:01:26.340><c> are</c><00:01:26.520><c> two</c><00:01:26.700><c> examples</c><00:01:27.320><c> the</c><00:01:28.320><c> world's</c><00:01:28.680><c> most</c>

00:01:28.969 --> 00:01:28.979 align:start position:0%
here are two examples the world's most
 

00:01:28.979 --> 00:01:32.210 align:start position:0%
here are two examples the world's most
famous<00:01:29.280><c> cellist</c><00:01:29.939><c> Yo-Yo</c><00:01:30.840><c> Ma</c><00:01:30.960><c> once</c><00:01:31.860><c> climbed</c>

00:01:32.210 --> 00:01:32.220 align:start position:0%
famous cellist Yo-Yo Ma once climbed
 

00:01:32.220 --> 00:01:35.030 align:start position:0%
famous cellist Yo-Yo Ma once climbed
into<00:01:32.400><c> a</c><00:01:32.700><c> New</c><00:01:32.820><c> York</c><00:01:32.939><c> City</c><00:01:33.119><c> Cab</c><00:01:33.560><c> wrote</c><00:01:34.560><c> about</c><00:01:34.680><c> 20</c>

00:01:35.030 --> 00:01:35.040 align:start position:0%
into a New York City Cab wrote about 20
 

00:01:35.040 --> 00:01:37.789 align:start position:0%
into a New York City Cab wrote about 20
minutes<00:01:35.280><c> to</c><00:01:35.579><c> the</c><00:01:35.759><c> Peninsula</c><00:01:36.299><c> Hotel</c><00:01:36.560><c> paid</c><00:01:37.560><c> the</c>

00:01:37.789 --> 00:01:37.799 align:start position:0%
minutes to the Peninsula Hotel paid the
 

00:01:37.799 --> 00:01:39.830 align:start position:0%
minutes to the Peninsula Hotel paid the
fare<00:01:38.220><c> and</c><00:01:38.700><c> got</c><00:01:38.880><c> out</c>

00:01:39.830 --> 00:01:39.840 align:start position:0%
fare and got out
 

00:01:39.840 --> 00:01:43.249 align:start position:0%
fare and got out
without<00:01:40.619><c> his</c><00:01:40.979><c> prized</c><00:01:41.400><c> possession</c><00:01:41.820><c> his</c><00:01:42.720><c> 2.5</c>

00:01:43.249 --> 00:01:43.259 align:start position:0%
without his prized possession his 2.5
 

00:01:43.259 --> 00:01:46.429 align:start position:0%
without his prized possession his 2.5
million<00:01:44.100><c> dollar</c><00:01:44.280><c> cello</c><00:01:44.939><c> he</c><00:01:45.840><c> forgot</c><00:01:46.140><c> to</c>

00:01:46.429 --> 00:01:46.439 align:start position:0%
million dollar cello he forgot to
 

00:01:46.439 --> 00:01:49.609 align:start position:0%
million dollar cello he forgot to
remember<00:01:46.680><c> to</c><00:01:47.040><c> get</c><00:01:47.220><c> it</c><00:01:47.340><c> out</c><00:01:47.520><c> of</c><00:01:47.640><c> the</c><00:01:47.759><c> trunk</c>

00:01:49.609 --> 00:01:49.619 align:start position:0%
remember to get it out of the trunk
 

00:01:49.619 --> 00:01:53.450 align:start position:0%
remember to get it out of the trunk
here's<00:01:50.159><c> another</c><00:01:50.280><c> between</c><00:01:51.259><c> 2005</c><00:01:52.259><c> and</c><00:01:52.500><c> 2012</c><00:01:53.220><c> in</c>

00:01:53.450 --> 00:01:53.460 align:start position:0%
here's another between 2005 and 2012 in
 

00:01:53.460 --> 00:01:56.230 align:start position:0%
here's another between 2005 and 2012 in
the<00:01:53.640><c> U.S</c><00:01:53.939><c> at</c><00:01:54.899><c> least</c>

00:01:56.230 --> 00:01:56.240 align:start position:0%
the U.S at least
 

00:01:56.240 --> 00:02:00.950 align:start position:0%
the U.S at least
772<00:01:57.259><c> surgical</c><00:01:58.259><c> instruments</c><00:01:59.299><c> sponges</c><00:02:00.299><c> needles</c>

00:02:00.950 --> 00:02:00.960 align:start position:0%
772 surgical instruments sponges needles
 

00:02:00.960 --> 00:02:05.270 align:start position:0%
772 surgical instruments sponges needles
were<00:02:01.860><c> left</c><00:02:02.159><c> inside</c><00:02:02.700><c> patients</c><00:02:04.140><c> these</c><00:02:04.799><c> surgeons</c>

00:02:05.270 --> 00:02:05.280 align:start position:0%
were left inside patients these surgeons
 

00:02:05.280 --> 00:02:08.389 align:start position:0%
were left inside patients these surgeons
with<00:02:06.000><c> very</c><00:02:06.299><c> smart</c><00:02:06.659><c> brains</c><00:02:07.259><c> forgot</c><00:02:08.099><c> to</c>

00:02:08.389 --> 00:02:08.399 align:start position:0%
with very smart brains forgot to
 

00:02:08.399 --> 00:02:10.370 align:start position:0%
with very smart brains forgot to
remember<00:02:08.640><c> to</c><00:02:09.000><c> remove</c><00:02:09.300><c> them</c>

00:02:10.370 --> 00:02:10.380 align:start position:0%
remember to remove them
 

00:02:10.380 --> 00:02:13.850 align:start position:0%
remember to remove them
our<00:02:11.099><c> human</c><00:02:11.280><c> brains</c><00:02:11.879><c> simply</c><00:02:12.599><c> are</c><00:02:12.959><c> not</c><00:02:13.319><c> designed</c>

00:02:13.850 --> 00:02:13.860 align:start position:0%
our human brains simply are not designed
 

00:02:13.860 --> 00:02:16.910 align:start position:0%
our human brains simply are not designed
to<00:02:14.400><c> remember</c><00:02:14.580><c> to</c><00:02:14.940><c> do</c><00:02:15.120><c> things</c><00:02:15.360><c> later</c><00:02:15.739><c> which</c><00:02:16.739><c> is</c>

00:02:16.910 --> 00:02:16.920 align:start position:0%
to remember to do things later which is
 

00:02:16.920 --> 00:02:19.610 align:start position:0%
to remember to do things later which is
why<00:02:17.280><c> it's</c><00:02:17.640><c> a</c><00:02:17.940><c> perfectly</c><00:02:18.239><c> valid</c><00:02:18.840><c> strategy</c><00:02:19.319><c> to</c>

00:02:19.610 --> 00:02:19.620 align:start position:0%
why it's a perfectly valid strategy to
 

00:02:19.620 --> 00:02:21.229 align:start position:0%
why it's a perfectly valid strategy to
Outsource<00:02:20.099><c> the</c><00:02:20.280><c> job</c>

00:02:21.229 --> 00:02:21.239 align:start position:0%
Outsource the job
 

00:02:21.239 --> 00:02:24.350 align:start position:0%
Outsource the job
make<00:02:21.780><c> to-do</c><00:02:22.260><c> lists</c><00:02:22.680><c> checklists</c><00:02:23.580><c> put</c><00:02:24.000><c> what</c><00:02:24.239><c> you</c>

00:02:24.350 --> 00:02:24.360 align:start position:0%
make to-do lists checklists put what you
 

00:02:24.360 --> 00:02:26.030 align:start position:0%
make to-do lists checklists put what you
want<00:02:24.540><c> to</c><00:02:24.660><c> remember</c><00:02:24.840><c> to</c><00:02:25.140><c> do</c><00:02:25.260><c> later</c><00:02:25.500><c> in</c><00:02:25.860><c> your</c>

00:02:26.030 --> 00:02:26.040 align:start position:0%
want to remember to do later in your
 

00:02:26.040 --> 00:02:29.809 align:start position:0%
want to remember to do later in your
calendar<00:02:26.340><c> use</c><00:02:27.239><c> pill</c><00:02:27.540><c> boxes</c><00:02:28.200><c> there</c><00:02:29.160><c> is</c><00:02:29.340><c> no</c>

00:02:29.809 --> 00:02:29.819 align:start position:0%
calendar use pill boxes there is no
 

00:02:29.819 --> 00:02:31.850 align:start position:0%
calendar use pill boxes there is no
shame<00:02:30.180><c> in</c><00:02:30.480><c> a</c><00:02:30.660><c> checklist</c>

00:02:31.850 --> 00:02:31.860 align:start position:0%
shame in a checklist
 

00:02:31.860 --> 00:02:34.910 align:start position:0%
shame in a checklist
Pilots<00:02:32.580><c> do</c><00:02:33.180><c> not</c><00:02:33.420><c> rely</c><00:02:33.840><c> on</c><00:02:34.080><c> their</c><00:02:34.319><c> unreliable</c>

00:02:34.910 --> 00:02:34.920 align:start position:0%
Pilots do not rely on their unreliable
 

00:02:34.920 --> 00:02:37.309 align:start position:0%
Pilots do not rely on their unreliable
prospective<00:02:35.700><c> memories</c><00:02:36.120><c> to</c><00:02:36.720><c> remember</c><00:02:36.900><c> to</c>

00:02:37.309 --> 00:02:37.319 align:start position:0%
prospective memories to remember to
 

00:02:37.319 --> 00:02:39.589 align:start position:0%
prospective memories to remember to
lower<00:02:37.500><c> the</c><00:02:37.860><c> wheels</c><00:02:38.160><c> of</c><00:02:38.340><c> the</c><00:02:38.580><c> plane</c><00:02:38.879><c> before</c>

00:02:39.589 --> 00:02:39.599 align:start position:0%
lower the wheels of the plane before
 

00:02:39.599 --> 00:02:41.589 align:start position:0%
lower the wheels of the plane before
landing

00:02:41.589 --> 00:02:41.599 align:start position:0%
landing
 

00:02:41.599 --> 00:02:45.410 align:start position:0%
landing
thankfully<00:02:42.599><c> they</c><00:02:43.260><c> use</c><00:02:43.440><c> checklists</c><00:02:44.640><c> surgeons</c>

00:02:45.410 --> 00:02:45.420 align:start position:0%
thankfully they use checklists surgeons
 

00:02:45.420 --> 00:02:48.379 align:start position:0%
thankfully they use checklists surgeons
use<00:02:45.660><c> them</c><00:02:45.900><c> now</c><00:02:46.140><c> to</c>


```

# How to boost your brain and memory/Rethinking Memory.en.vtt

```vtt
WEBVTT
Kind: captions
Language: en

00:00:06.680 --> 00:00:09.290 align:start position:0%
 
so<00:00:07.680><c> where</c><00:00:07.919><c> does</c><00:00:08.099><c> this</c><00:00:08.220><c> leave</c><00:00:08.460><c> us</c><00:00:08.639><c> with</c><00:00:09.000><c> respect</c>

00:00:09.290 --> 00:00:09.300 align:start position:0%
so where does this leave us with respect
 

00:00:09.300 --> 00:00:11.570 align:start position:0%
so where does this leave us with respect
to<00:00:09.599><c> our</c><00:00:09.720><c> relationship</c><00:00:10.260><c> with</c><00:00:10.620><c> memory</c>

00:00:11.570 --> 00:00:11.580 align:start position:0%
to our relationship with memory
 

00:00:11.580 --> 00:00:13.430 align:start position:0%
to our relationship with memory
how<00:00:12.059><c> should</c><00:00:12.240><c> we</c><00:00:12.420><c> hold</c><00:00:12.660><c> it</c>

00:00:13.430 --> 00:00:13.440 align:start position:0%
how should we hold it
 

00:00:13.440 --> 00:00:15.350 align:start position:0%
how should we hold it
here's<00:00:13.980><c> what</c><00:00:14.160><c> I</c><00:00:14.340><c> think</c>

00:00:15.350 --> 00:00:15.360 align:start position:0%
here's what I think
 

00:00:15.360 --> 00:00:18.109 align:start position:0%
here's what I think
memory<00:00:16.080><c> is</c><00:00:16.379><c> a</c><00:00:16.680><c> really</c><00:00:16.859><c> big</c><00:00:17.160><c> deal</c>

00:00:18.109 --> 00:00:18.119 align:start position:0%
memory is a really big deal
 

00:00:18.119 --> 00:00:20.929 align:start position:0%
memory is a really big deal
and<00:00:18.840><c> it's</c><00:00:19.199><c> not</c><00:00:19.440><c> such</c><00:00:19.680><c> a</c><00:00:19.859><c> big</c><00:00:19.920><c> deal</c>

00:00:20.929 --> 00:00:20.939 align:start position:0%
and it's not such a big deal
 

00:00:20.939 --> 00:00:24.170 align:start position:0%
and it's not such a big deal
maybe<00:00:21.359><c> we</c><00:00:21.720><c> can</c><00:00:21.840><c> take</c><00:00:22.080><c> it</c><00:00:22.380><c> seriously</c><00:00:23.100><c> but</c><00:00:23.880><c> hold</c>

00:00:24.170 --> 00:00:24.180 align:start position:0%
maybe we can take it seriously but hold
 

00:00:24.180 --> 00:00:25.609 align:start position:0%
maybe we can take it seriously but hold
it<00:00:24.420><c> lightly</c>

00:00:25.609 --> 00:00:25.619 align:start position:0%
it lightly
 

00:00:25.619 --> 00:00:28.490 align:start position:0%
it lightly
if<00:00:26.100><c> you</c><00:00:26.279><c> consider</c><00:00:26.640><c> memory</c><00:00:27.119><c> a</c><00:00:27.539><c> really</c><00:00:27.779><c> big</c><00:00:28.140><c> deal</c>

00:00:28.490 --> 00:00:28.500 align:start position:0%
if you consider memory a really big deal
 

00:00:28.500 --> 00:00:31.189 align:start position:0%
if you consider memory a really big deal
then<00:00:29.220><c> you'll</c><00:00:29.519><c> value</c><00:00:29.820><c> the</c><00:00:30.240><c> miracle</c><00:00:30.599><c> that</c><00:00:31.019><c> is</c>

00:00:31.189 --> 00:00:31.199 align:start position:0%
then you'll value the miracle that is
 

00:00:31.199 --> 00:00:33.170 align:start position:0%
then you'll value the miracle that is
your<00:00:31.439><c> human</c><00:00:31.679><c> memory</c><00:00:32.099><c> enough</c><00:00:32.460><c> to</c><00:00:32.759><c> take</c><00:00:32.940><c> good</c>

00:00:33.170 --> 00:00:33.180 align:start position:0%
your human memory enough to take good
 

00:00:33.180 --> 00:00:36.049 align:start position:0%
your human memory enough to take good
care<00:00:33.480><c> of</c><00:00:33.600><c> it</c><00:00:33.780><c> with</c><00:00:34.320><c> plenty</c><00:00:34.680><c> of</c><00:00:34.739><c> sleep</c><00:00:35.059><c> brain</c>

00:00:36.049 --> 00:00:36.059 align:start position:0%
care of it with plenty of sleep brain
 

00:00:36.059 --> 00:00:39.889 align:start position:0%
care of it with plenty of sleep brain
healthy<00:00:36.480><c> foods</c><00:00:36.980><c> regular</c><00:00:37.980><c> exercise</c><00:00:38.899><c> staying</c>

00:00:39.889 --> 00:00:39.899 align:start position:0%
healthy foods regular exercise staying
 

00:00:39.899 --> 00:00:42.590 align:start position:0%
healthy foods regular exercise staying
socially<00:00:40.379><c> and</c><00:00:40.739><c> cognitively</c><00:00:41.340><c> active</c><00:00:41.940><c> and</c>

00:00:42.590 --> 00:00:42.600 align:start position:0%
socially and cognitively active and
 

00:00:42.600 --> 00:00:44.569 align:start position:0%
socially and cognitively active and
lowering<00:00:43.079><c> your</c><00:00:43.320><c> reactivity</c><00:00:43.920><c> to</c><00:00:44.219><c> chronic</c>

00:00:44.569 --> 00:00:44.579 align:start position:0%
lowering your reactivity to chronic
 

00:00:44.579 --> 00:00:45.650 align:start position:0%
lowering your reactivity to chronic
stress

00:00:45.650 --> 00:00:45.660 align:start position:0%
stress
 

00:00:45.660 --> 00:00:48.170 align:start position:0%
stress
if<00:00:46.260><c> you</c><00:00:46.440><c> take</c><00:00:46.680><c> care</c><00:00:46.980><c> of</c><00:00:47.100><c> your</c><00:00:47.340><c> brain</c><00:00:47.579><c> and</c>

00:00:48.170 --> 00:00:48.180 align:start position:0%
if you take care of your brain and
 

00:00:48.180 --> 00:00:49.970 align:start position:0%
if you take care of your brain and
Supply<00:00:48.420><c> your</c><00:00:48.899><c> memory</c><00:00:49.140><c> with</c><00:00:49.440><c> what</c><00:00:49.620><c> it</c><00:00:49.739><c> needs</c>

00:00:49.970 --> 00:00:49.980 align:start position:0%
Supply your memory with what it needs
 

00:00:49.980 --> 00:00:52.790 align:start position:0%
Supply your memory with what it needs
for<00:00:50.219><c> creation</c><00:00:50.579><c> and</c><00:00:50.879><c> retrieval</c><00:00:51.899><c> it</c><00:00:52.379><c> will</c><00:00:52.500><c> serve</c>

00:00:52.790 --> 00:00:52.800 align:start position:0%
for creation and retrieval it will serve
 

00:00:52.800 --> 00:00:53.690 align:start position:0%
for creation and retrieval it will serve
you<00:00:52.920><c> well</c>

00:00:53.690 --> 00:00:53.700 align:start position:0%
you well
 

00:00:53.700 --> 00:00:56.689 align:start position:0%
you well
at<00:00:54.300><c> the</c><00:00:54.420><c> same</c><00:00:54.600><c> time</c><00:00:54.960><c> if</c><00:00:55.620><c> you</c><00:00:55.800><c> also</c><00:00:56.039><c> hold</c><00:00:56.280><c> memory</c>

00:00:56.689 --> 00:00:56.699 align:start position:0%
at the same time if you also hold memory
 

00:00:56.699 --> 00:00:59.209 align:start position:0%
at the same time if you also hold memory
as<00:00:57.059><c> not</c><00:00:57.420><c> such</c><00:00:57.600><c> a</c><00:00:57.780><c> big</c><00:00:57.899><c> deal</c><00:00:58.140><c> you'll</c><00:00:58.860><c> be</c><00:00:58.980><c> more</c>

00:00:59.209 --> 00:00:59.219 align:start position:0%
as not such a big deal you'll be more
 

00:00:59.219 --> 00:01:01.389 align:start position:0%
as not such a big deal you'll be more
forgiving<00:00:59.640><c> of</c><00:01:00.000><c> your</c><00:01:00.180><c> memory's</c><00:01:00.539><c> many</c><00:01:00.960><c> natural</c>

00:01:01.389 --> 00:01:01.399 align:start position:0%
forgiving of your memory's many natural
 

00:01:01.399 --> 00:01:05.390 align:start position:0%
forgiving of your memory's many natural
imperfections<00:01:02.480><c> you</c><00:01:03.480><c> won't</c><00:01:03.660><c> feel</c><00:01:03.960><c> shame</c><00:01:04.500><c> fear</c>

00:01:05.390 --> 00:01:05.400 align:start position:0%
imperfections you won't feel shame fear
 

00:01:05.400 --> 00:01:08.210 align:start position:0%
imperfections you won't feel shame fear
or<00:01:05.640><c> anxiety</c><00:01:06.119><c> when</c><00:01:06.780><c> it</c><00:01:07.020><c> inevitably</c><00:01:07.619><c> and</c>

00:01:08.210 --> 00:01:08.220 align:start position:0%
or anxiety when it inevitably and
 

00:01:08.220 --> 00:01:11.149 align:start position:0%
or anxiety when it inevitably and
regularly<00:01:08.939><c> forgets</c><00:01:09.659><c> because</c><00:01:10.380><c> you</c><00:01:10.920><c> know</c>

00:01:11.149 --> 00:01:11.159 align:start position:0%
regularly forgets because you know
 

00:01:11.159 --> 00:01:13.429 align:start position:0%
regularly forgets because you know
forgetting<00:01:11.880><c> is</c><00:01:12.060><c> a</c><00:01:12.299><c> normal</c><00:01:12.420><c> part</c><00:01:12.840><c> of</c><00:01:13.200><c> Being</c>

00:01:13.429 --> 00:01:13.439 align:start position:0%
forgetting is a normal part of Being
 

00:01:13.439 --> 00:01:14.570 align:start position:0%
forgetting is a normal part of Being
Human

00:01:14.570 --> 00:01:14.580 align:start position:0%
Human
 

00:01:14.580 --> 00:01:17.570 align:start position:0%
Human
while<00:01:15.240><c> the</c><00:01:15.479><c> ability</c><00:01:15.780><c> to</c><00:01:16.140><c> memorize</c><00:01:16.560><c> a</c><00:01:17.100><c> slew</c><00:01:17.400><c> of</c>

00:01:17.570 --> 00:01:17.580 align:start position:0%
while the ability to memorize a slew of
 

00:01:17.580 --> 00:01:20.630 align:start position:0%
while the ability to memorize a slew of
information<00:01:17.900><c> is</c><00:01:18.900><c> impressive</c><00:01:19.500><c> and</c><00:01:20.220><c> can</c><00:01:20.400><c> be</c>

00:01:20.630 --> 00:01:20.640 align:start position:0%
information is impressive and can be
 

00:01:20.640 --> 00:01:22.730 align:start position:0%
information is impressive and can be
useful<00:01:21.000><c> most</c><00:01:21.960><c> people</c><00:01:22.200><c> would</c><00:01:22.439><c> say</c><00:01:22.619><c> that</c>

00:01:22.730 --> 00:01:22.740 align:start position:0%
useful most people would say that
 

00:01:22.740 --> 00:01:24.710 align:start position:0%
useful most people would say that
remembering<00:01:23.220><c> the</c><00:01:23.520><c> details</c><00:01:23.880><c> of</c><00:01:24.119><c> what</c><00:01:24.479><c> happened</c>

00:01:24.710 --> 00:01:24.720 align:start position:0%
remembering the details of what happened
 

00:01:24.720 --> 00:01:27.830 align:start position:0%
remembering the details of what happened
in<00:01:25.020><c> your</c><00:01:25.200><c> life</c><00:01:25.380><c> is</c><00:01:25.979><c> more</c><00:01:26.220><c> important</c><00:01:26.659><c> but</c><00:01:27.659><c> it</c>

00:01:27.830 --> 00:01:27.840 align:start position:0%
in your life is more important but it
 

00:01:27.840 --> 00:01:29.570 align:start position:0%
in your life is more important but it
can't<00:01:28.020><c> be</c><00:01:28.200><c> that</c><00:01:28.439><c> important</c><00:01:28.799><c> because</c><00:01:29.220><c> you</c>

00:01:29.570 --> 00:01:29.580 align:start position:0%
can't be that important because you
 

00:01:29.580 --> 00:01:32.210 align:start position:0%
can't be that important because you
don't<00:01:29.759><c> actually</c><00:01:30.000><c> remember</c><00:01:30.420><c> most</c><00:01:30.900><c> of</c><00:01:31.140><c> it</c><00:01:31.259><c> our</c>

00:01:32.210 --> 00:01:32.220 align:start position:0%
don't actually remember most of it our
 

00:01:32.220 --> 00:01:34.969 align:start position:0%
don't actually remember most of it our
brains<00:01:32.580><c> are</c><00:01:32.880><c> not</c><00:01:33.119><c> designed</c><00:01:33.720><c> to</c><00:01:33.960><c> retain</c><00:01:34.380><c> what</c>

00:01:34.969 --> 00:01:34.979 align:start position:0%
brains are not designed to retain what
 

00:01:34.979 --> 00:01:37.609 align:start position:0%
brains are not designed to retain what
is<00:01:35.159><c> routine</c><00:01:35.579><c> or</c><00:01:35.759><c> predictable</c><00:01:36.240><c> and</c><00:01:37.140><c> most</c><00:01:37.439><c> of</c>

00:01:37.609 --> 00:01:37.619 align:start position:0%
is routine or predictable and most of
 

00:01:37.619 --> 00:01:39.410 align:start position:0%
is routine or predictable and most of
our<00:01:37.799><c> lives</c><00:01:38.100><c> are</c><00:01:38.340><c> spent</c><00:01:38.520><c> doing</c><00:01:38.820><c> routine</c>

00:01:39.410 --> 00:01:39.420 align:start position:0%
our lives are spent doing routine
 

00:01:39.420 --> 00:01:41.510 align:start position:0%
our lives are spent doing routine
predictable<00:01:40.020><c> things</c>

00:01:41.510 --> 00:01:41.520 align:start position:0%
predictable things
 

00:01:41.520 --> 00:01:44.090 align:start position:0%
predictable things
perhaps<00:01:42.299><c> a</c><00:01:42.540><c> more</c><00:01:42.720><c> reasonable</c><00:01:43.200><c> expectation</c><00:01:43.860><c> of</c>

00:01:44.090 --> 00:01:44.100 align:start position:0%
perhaps a more reasonable expectation of
 

00:01:44.100 --> 00:01:46.429 align:start position:0%
perhaps a more reasonable expectation of
memory<00:01:44.520><c> is</c><00:01:45.060><c> for</c><00:01:45.240><c> it</c><00:01:45.360><c> to</c><00:01:45.600><c> forget</c><00:01:45.720><c> everything</c>

00:01:46.429 --> 00:01:46.439 align:start position:0%
memory is for it to forget everything
 

00:01:46.439 --> 00:01:49.190 align:start position:0%
memory is for it to forget everything
except<00:01:47.400><c> for</c><00:01:47.640><c> what</c><00:01:47.880><c> is</c><00:01:48.060><c> Meaningful</c>

00:01:49.190 --> 00:01:49.200 align:start position:0%
except for what is Meaningful
 

00:01:49.200 --> 00:01:51.109 align:start position:0%
except for what is Meaningful
these<00:01:49.799><c> are</c><00:01:49.920><c> the</c><00:01:50.100><c> memories</c><00:01:50.399><c> that</c><00:01:50.700><c> provide</c><00:01:51.000><c> you</c>

00:01:51.109 --> 00:01:51.119 align:start position:0%
these are the memories that provide you
 

00:01:51.119 --> 00:01:53.749 align:start position:0%
these are the memories that provide you
with<00:01:51.360><c> a</c><00:01:51.540><c> sense</c><00:01:51.720><c> of</c><00:01:51.899><c> self</c><00:01:52.200><c> a</c><00:01:53.100><c> life</c><00:01:53.220><c> narrative</c>

00:01:53.749 --> 00:01:53.759 align:start position:0%
with a sense of self a life narrative
 

00:01:53.759 --> 00:01:55.789 align:start position:0%
with a sense of self a life narrative
and<00:01:54.479><c> the</c><00:01:54.600><c> potential</c><00:01:54.899><c> for</c><00:01:55.200><c> growth</c><00:01:55.619><c> and</c>

00:01:55.789 --> 00:01:55.799 align:start position:0%
and the potential for growth and
 

00:01:55.799 --> 00:01:57.590 align:start position:0%
and the potential for growth and
connection<00:01:55.979><c> with</c><00:01:56.460><c> others</c>

00:01:57.590 --> 00:01:57.600 align:start position:0%
connection with others
 

00:01:57.600 --> 00:02:00.170 align:start position:0%
connection with others
human<00:01:58.079><c> memory</c><00:01:58.560><c> wasn't</c><00:01:59.220><c> designed</c><00:01:59.820><c> to</c><00:02:00.000><c> be</c>

00:02:00.170 --> 00:02:00.180 align:start position:0%
human memory wasn't designed to be
 

00:02:00.180 --> 00:02:02.569 align:start position:0%
human memory wasn't designed to be
perfect<00:02:00.479><c> so</c><00:02:01.320><c> let's</c><00:02:01.500><c> let</c><00:02:01.860><c> go</c><00:02:02.100><c> of</c><00:02:02.280><c> that</c>

00:02:02.569 --> 00:02:02.579 align:start position:0%
perfect so let's let go of that
 

00:02:02.579 --> 00:02:04.069 align:start position:0%
perfect so let's let go of that
expectation

00:02:04.069 --> 00:02:04.079 align:start position:0%
expectation
 

00:02:04.079 --> 00:02:06.530 align:start position:0%
expectation
forgetting<00:02:04.860><c> can</c><00:02:05.159><c> be</c><00:02:05.340><c> a</c><00:02:05.520><c> sign</c><00:02:05.700><c> of</c><00:02:05.880><c> Alzheimer's</c>

00:02:06.530 --> 00:02:06.540 align:start position:0%
forgetting can be a sign of Alzheimer's
 

00:02:06.540 --> 00:02:08.449 align:start position:0%
forgetting can be a sign of Alzheimer's
and<00:02:06.960><c> it's</c><00:02:07.140><c> important</c><00:02:07.560><c> to</c><00:02:07.740><c> know</c><00:02:07.860><c> the</c><00:02:08.220><c> real</c>

00:02:08.449 --> 00:02:08.459 align:start position:0%
and it's important to know the real
 

00:02:08.459 --> 00:02:11.869 align:start position:0%
and it's important to know the real
signs<00:02:09.119><c> but</c><00:02:10.020><c> most</c><00:02:10.319><c> of</c><00:02:10.500><c> what</c><00:02:10.679><c> we</c><00:02:10.860><c> forget</c><00:02:11.039><c> every</c>

00:02:11.869 --> 00:02:11.879 align:start position:0%
signs but most of what we forget every
 

00:02:11.879 --> 00:02:14.750 align:start position:0%
signs but most of what we forget every
day<00:02:12.180><c> is</c><00:02:13.020><c> totally</c><00:02:13.440><c> normal</c>

00:02:14.750 --> 00:02:14.760 align:start position:0%
day is totally normal
 

00:02:14.760 --> 00:02:18.229 align:start position:0%
day is totally normal
our<00:02:15.540><c> brains</c><00:02:15.959><c> don't</c><00:02:16.500><c> remember</c><00:02:16.739><c> everything</c>

00:02:18.229 --> 00:02:18.239 align:start position:0%
our brains don't remember everything
 

00:02:18.239 --> 00:02:23.480 align:start position:0%
our brains don't remember everything
but<00:02:18.900><c> maybe</c><00:02:19.200><c> what</c><00:02:19.980><c> they</c><00:02:20.160><c> remember</c><00:02:20.400><c> is</c><00:02:21.300><c> enough</c>


```

# How to boost your brain and memory/Semantic Memory.en.vtt

```vtt
WEBVTT
Kind: captions
Language: en

00:00:05.960 --> 00:00:09.070 align:start position:0%
 
information<00:00:06.960><c> that</c><00:00:07.620><c> is</c><00:00:07.799><c> paid</c><00:00:08.040><c> attention</c><00:00:08.400><c> to</c>

00:00:09.070 --> 00:00:09.080 align:start position:0%
information that is paid attention to
 

00:00:09.080 --> 00:00:11.750 align:start position:0%
information that is paid attention to
salvaged<00:00:10.080><c> from</c><00:00:10.320><c> the</c><00:00:10.559><c> doomed</c><00:00:10.920><c> fate</c><00:00:11.340><c> of</c><00:00:11.519><c> working</c>

00:00:11.750 --> 00:00:11.760 align:start position:0%
salvaged from the doomed fate of working
 

00:00:11.760 --> 00:00:14.209 align:start position:0%
salvaged from the doomed fate of working
memory<00:00:12.360><c> for</c><00:00:12.719><c> its</c><00:00:13.139><c> perceived</c><00:00:13.559><c> significance</c>

00:00:14.209 --> 00:00:14.219 align:start position:0%
memory for its perceived significance
 

00:00:14.219 --> 00:00:17.750 align:start position:0%
memory for its perceived significance
and<00:00:15.179><c> linked</c><00:00:15.660><c> by</c><00:00:15.839><c> the</c><00:00:16.020><c> hippocampus</c><00:00:16.740><c> can</c><00:00:17.340><c> become</c>

00:00:17.750 --> 00:00:17.760 align:start position:0%
and linked by the hippocampus can become
 

00:00:17.760 --> 00:00:19.849 align:start position:0%
and linked by the hippocampus can become
long-term<00:00:18.539><c> memories</c>

00:00:19.849 --> 00:00:19.859 align:start position:0%
long-term memories
 

00:00:19.859 --> 00:00:22.189 align:start position:0%
long-term memories
memory<00:00:20.520><c> for</c><00:00:20.820><c> the</c><00:00:21.000><c> knowledge</c><00:00:21.359><c> you've</c><00:00:21.720><c> learned</c>

00:00:22.189 --> 00:00:22.199 align:start position:0%
memory for the knowledge you've learned
 

00:00:22.199 --> 00:00:24.650 align:start position:0%
memory for the knowledge you've learned
the<00:00:22.920><c> facts</c><00:00:23.279><c> you</c><00:00:23.400><c> know</c><00:00:23.580><c> about</c><00:00:23.699><c> your</c><00:00:24.180><c> life</c><00:00:24.359><c> in</c>

00:00:24.650 --> 00:00:24.660 align:start position:0%
the facts you know about your life in
 

00:00:24.660 --> 00:00:27.550 align:start position:0%
the facts you know about your life in
the<00:00:24.840><c> world</c><00:00:25.080><c> is</c><00:00:25.800><c> called</c><00:00:26.100><c> semantic</c><00:00:26.880><c> memory</c>

00:00:27.550 --> 00:00:27.560 align:start position:0%
the world is called semantic memory
 

00:00:27.560 --> 00:00:30.950 align:start position:0%
the world is called semantic memory
semantic<00:00:28.560><c> memory</c><00:00:28.920><c> is</c><00:00:29.400><c> the</c><00:00:29.699><c> Wikipedia</c><00:00:30.420><c> of</c><00:00:30.720><c> your</c>

00:00:30.950 --> 00:00:30.960 align:start position:0%
semantic memory is the Wikipedia of your
 

00:00:30.960 --> 00:00:32.030 align:start position:0%
semantic memory is the Wikipedia of your
brain

00:00:32.030 --> 00:00:32.040 align:start position:0%
brain
 

00:00:32.040 --> 00:00:34.670 align:start position:0%
brain
because<00:00:32.759><c> every</c><00:00:33.180><c> piece</c><00:00:33.540><c> of</c><00:00:33.660><c> data</c><00:00:34.020><c> in</c><00:00:34.200><c> our</c><00:00:34.380><c> heads</c>

00:00:34.670 --> 00:00:34.680 align:start position:0%
because every piece of data in our heads
 

00:00:34.680 --> 00:00:37.190 align:start position:0%
because every piece of data in our heads
is<00:00:34.920><c> a</c><00:00:35.100><c> semantic</c><00:00:35.579><c> memory</c><00:00:36.059><c> if</c><00:00:36.660><c> we</c><00:00:36.840><c> want</c><00:00:37.079><c> to</c>

00:00:37.190 --> 00:00:37.200 align:start position:0%
is a semantic memory if we want to
 

00:00:37.200 --> 00:00:39.889 align:start position:0%
is a semantic memory if we want to
remember<00:00:37.440><c> a</c><00:00:37.920><c> lot</c><00:00:38.040><c> of</c><00:00:38.219><c> information</c><00:00:38.540><c> we</c><00:00:39.540><c> have</c><00:00:39.719><c> to</c>

00:00:39.889 --> 00:00:39.899 align:start position:0%
remember a lot of information we have to
 

00:00:39.899 --> 00:00:42.650 align:start position:0%
remember a lot of information we have to
be<00:00:40.200><c> really</c><00:00:40.559><c> good</c><00:00:40.920><c> at</c><00:00:41.700><c> creating</c><00:00:42.059><c> and</c>

00:00:42.650 --> 00:00:42.660 align:start position:0%
be really good at creating and
 

00:00:42.660 --> 00:00:45.709 align:start position:0%
be really good at creating and
retrieving<00:00:43.260><c> semantic</c><00:00:44.100><c> memories</c>

00:00:45.709 --> 00:00:45.719 align:start position:0%
retrieving semantic memories
 

00:00:45.719 --> 00:00:49.250 align:start position:0%
retrieving semantic memories
meaning<00:00:46.559><c> is</c><00:00:47.219><c> your</c><00:00:47.579><c> magical</c><00:00:48.059><c> ingredient</c><00:00:48.480><c> when</c>

00:00:49.250 --> 00:00:49.260 align:start position:0%
meaning is your magical ingredient when
 

00:00:49.260 --> 00:00:51.470 align:start position:0%
meaning is your magical ingredient when
it<00:00:49.440><c> comes</c><00:00:49.620><c> to</c><00:00:49.860><c> creating</c><00:00:50.280><c> and</c><00:00:50.460><c> recalling</c><00:00:51.059><c> any</c>

00:00:51.470 --> 00:00:51.480 align:start position:0%
it comes to creating and recalling any
 

00:00:51.480 --> 00:00:52.910 align:start position:0%
it comes to creating and recalling any
kind<00:00:51.660><c> of</c><00:00:51.840><c> memory</c>

00:00:52.910 --> 00:00:52.920 align:start position:0%
kind of memory
 

00:00:52.920 --> 00:00:55.310 align:start position:0%
kind of memory
here's<00:00:53.520><c> a</c><00:00:53.700><c> classic</c><00:00:53.879><c> study</c><00:00:54.420><c> illustrating</c><00:00:54.960><c> how</c>

00:00:55.310 --> 00:00:55.320 align:start position:0%
here's a classic study illustrating how
 

00:00:55.320 --> 00:00:58.549 align:start position:0%
here's a classic study illustrating how
this<00:00:55.559><c> is</c><00:00:55.680><c> true</c><00:00:55.860><c> for</c><00:00:56.160><c> semantic</c><00:00:56.760><c> memory</c>

00:00:58.549 --> 00:00:58.559 align:start position:0%
this is true for semantic memory
 

00:00:58.559 --> 00:01:01.189 align:start position:0%
this is true for semantic memory
veteran<00:00:59.520><c> taxi</c><00:00:59.940><c> drivers</c><00:01:00.420><c> and</c><00:01:00.719><c> drivers</c>

00:01:01.189 --> 00:01:01.199 align:start position:0%
veteran taxi drivers and drivers
 

00:01:01.199 --> 00:01:03.290 align:start position:0%
veteran taxi drivers and drivers
students<00:01:01.559><c> in</c><00:01:01.800><c> Helsinki</c><00:01:02.460><c> were</c><00:01:02.940><c> asked</c><00:01:03.239><c> to</c>

00:01:03.290 --> 00:01:03.300 align:start position:0%
students in Helsinki were asked to
 

00:01:03.300 --> 00:01:05.870 align:start position:0%
students in Helsinki were asked to
recall<00:01:03.660><c> a</c><00:01:03.960><c> list</c><00:01:04.080><c> of</c><00:01:04.260><c> streets</c><00:01:04.680><c> if</c><00:01:05.400><c> the</c><00:01:05.580><c> streets</c>

00:01:05.870 --> 00:01:05.880 align:start position:0%
recall a list of streets if the streets
 

00:01:05.880 --> 00:01:07.609 align:start position:0%
recall a list of streets if the streets
were<00:01:06.119><c> listed</c><00:01:06.479><c> in</c><00:01:06.720><c> an</c><00:01:06.900><c> order</c><00:01:07.020><c> that</c><00:01:07.380><c> could</c>

00:01:07.609 --> 00:01:07.619 align:start position:0%
were listed in an order that could
 

00:01:07.619 --> 00:01:10.429 align:start position:0%
were listed in an order that could
actually<00:01:07.860><c> be</c><00:01:08.220><c> driven</c><00:01:08.640><c> the</c><00:01:09.420><c> experienced</c><00:01:09.960><c> taxi</c>

00:01:10.429 --> 00:01:10.439 align:start position:0%
actually be driven the experienced taxi
 

00:01:10.439 --> 00:01:12.830 align:start position:0%
actually be driven the experienced taxi
drivers<00:01:10.799><c> could</c><00:01:11.040><c> recall</c><00:01:11.400><c> 87</c><00:01:12.119><c> percent</c><00:01:12.420><c> of</c><00:01:12.720><c> the</c>

00:01:12.830 --> 00:01:12.840 align:start position:0%
drivers could recall 87 percent of the
 

00:01:12.840 --> 00:01:15.469 align:start position:0%
drivers could recall 87 percent of the
streets<00:01:13.140><c> on</c><00:01:13.320><c> the</c><00:01:13.439><c> list</c><00:01:13.939><c> the</c><00:01:14.939><c> untrained</c>

00:01:15.469 --> 00:01:15.479 align:start position:0%
streets on the list the untrained
 

00:01:15.479 --> 00:01:18.530 align:start position:0%
streets on the list the untrained
drivers<00:01:15.960><c> only</c><00:01:16.200><c> remembered</c><00:01:16.799><c> 45</c><00:01:17.159><c> percent</c><00:01:17.700><c> but</c>

00:01:18.530 --> 00:01:18.540 align:start position:0%
drivers only remembered 45 percent but
 

00:01:18.540 --> 00:01:20.810 align:start position:0%
drivers only remembered 45 percent but
if<00:01:18.780><c> the</c><00:01:19.080><c> same</c><00:01:19.380><c> list</c><00:01:19.619><c> of</c><00:01:19.860><c> street</c><00:01:20.100><c> names</c><00:01:20.400><c> were</c>

00:01:20.810 --> 00:01:20.820 align:start position:0%
if the same list of street names were
 

00:01:20.820 --> 00:01:24.050 align:start position:0%
if the same list of street names were
presented<00:01:21.299><c> in</c><00:01:21.840><c> random</c><00:01:22.259><c> order</c><00:01:22.500><c> so</c><00:01:23.460><c> now</c><00:01:23.759><c> there</c>

00:01:24.050 --> 00:01:24.060 align:start position:0%
presented in random order so now there
 

00:01:24.060 --> 00:01:26.030 align:start position:0%
presented in random order so now there
was<00:01:24.180><c> no</c><00:01:24.540><c> meaningful</c><00:01:24.960><c> driving</c><00:01:25.259><c> route</c><00:01:25.619><c> between</c>

00:01:26.030 --> 00:01:26.040 align:start position:0%
was no meaningful driving route between
 

00:01:26.040 --> 00:01:28.730 align:start position:0%
was no meaningful driving route between
the<00:01:26.400><c> streets</c><00:01:26.820><c> then</c><00:01:27.600><c> the</c><00:01:27.900><c> veteran</c><00:01:28.259><c> drivers</c>

00:01:28.730 --> 00:01:28.740 align:start position:0%
the streets then the veteran drivers
 

00:01:28.740 --> 00:01:31.190 align:start position:0%
the streets then the veteran drivers
lost<00:01:29.159><c> their</c><00:01:29.520><c> retrieval</c><00:01:30.000><c> advantage</c><00:01:30.540><c> and</c>

00:01:31.190 --> 00:01:31.200 align:start position:0%
lost their retrieval advantage and
 

00:01:31.200 --> 00:01:33.890 align:start position:0%
lost their retrieval advantage and
remembered<00:01:31.680><c> the</c><00:01:32.100><c> same</c><00:01:32.340><c> number</c><00:01:32.640><c> of</c><00:01:32.880><c> streets</c><00:01:33.360><c> as</c>

00:01:33.890 --> 00:01:33.900 align:start position:0%
remembered the same number of streets as
 

00:01:33.900 --> 00:01:36.560 align:start position:0%
remembered the same number of streets as
the<00:01:34.140><c> students</c>


```

# How to boost your brain and memory/Sleep.en.vtt

```vtt
WEBVTT
Kind: captions
Language: en

00:00:06.359 --> 00:00:10.549 align:start position:0%
 
the<00:00:07.200><c> science</c><00:00:07.440><c> on</c><00:00:07.919><c> sleep</c><00:00:08.300><c> is</c><00:00:09.300><c> very</c><00:00:09.660><c> clear</c><00:00:09.960><c> on</c>

00:00:10.549 --> 00:00:10.559 align:start position:0%
the science on sleep is very clear on
 

00:00:10.559 --> 00:00:13.009 align:start position:0%
the science on sleep is very clear on
the<00:00:10.740><c> fact</c><00:00:10.860><c> that</c><00:00:11.160><c> human</c><00:00:11.460><c> adults</c><00:00:12.059><c> need</c><00:00:12.360><c> seven</c><00:00:12.840><c> to</c>

00:00:13.009 --> 00:00:13.019 align:start position:0%
the fact that human adults need seven to
 

00:00:13.019 --> 00:00:15.110 align:start position:0%
the fact that human adults need seven to
nine<00:00:13.259><c> hours</c><00:00:13.559><c> of</c><00:00:13.920><c> sleep</c><00:00:14.099><c> a</c><00:00:14.340><c> night</c><00:00:14.519><c> to</c><00:00:14.820><c> function</c>

00:00:15.110 --> 00:00:15.120 align:start position:0%
nine hours of sleep a night to function
 

00:00:15.120 --> 00:00:16.369 align:start position:0%
nine hours of sleep a night to function
optimally

00:00:16.369 --> 00:00:16.379 align:start position:0%
optimally
 

00:00:16.379 --> 00:00:19.189 align:start position:0%
optimally
here<00:00:16.980><c> are</c><00:00:17.220><c> three</c><00:00:17.640><c> reasons</c><00:00:18.119><c> why</c><00:00:18.420><c> sleep</c><00:00:18.720><c> is</c>

00:00:19.189 --> 00:00:19.199 align:start position:0%
here are three reasons why sleep is
 

00:00:19.199 --> 00:00:21.590 align:start position:0%
here are three reasons why sleep is
essential<00:00:19.800><c> for</c><00:00:20.100><c> optimal</c><00:00:20.580><c> memory</c>

00:00:21.590 --> 00:00:21.600 align:start position:0%
essential for optimal memory
 

00:00:21.600 --> 00:00:23.269 align:start position:0%
essential for optimal memory
number<00:00:22.080><c> one</c>

00:00:23.269 --> 00:00:23.279 align:start position:0%
number one
 

00:00:23.279 --> 00:00:25.310 align:start position:0%
number one
the<00:00:23.820><c> information</c><00:00:24.000><c> that</c><00:00:24.480><c> we</c><00:00:24.660><c> paid</c><00:00:24.900><c> attention</c>

00:00:25.310 --> 00:00:25.320 align:start position:0%
the information that we paid attention
 

00:00:25.320 --> 00:00:28.550 align:start position:0%
the information that we paid attention
to<00:00:25.680><c> cared</c><00:00:26.580><c> about</c><00:00:26.840><c> learned</c><00:00:27.840><c> and</c><00:00:28.080><c> practiced</c>

00:00:28.550 --> 00:00:28.560 align:start position:0%
to cared about learned and practiced
 

00:00:28.560 --> 00:00:31.669 align:start position:0%
to cared about learned and practiced
today<00:00:29.180><c> becomes</c><00:00:30.180><c> linked</c><00:00:30.720><c> into</c><00:00:30.900><c> a</c><00:00:31.320><c> lasting</c>

00:00:31.669 --> 00:00:31.679 align:start position:0%
today becomes linked into a lasting
 

00:00:31.679 --> 00:00:34.970 align:start position:0%
today becomes linked into a lasting
memory<00:00:32.160><c> while</c><00:00:33.059><c> we</c><00:00:33.360><c> sleep</c><00:00:33.600><c> if</c><00:00:34.440><c> you</c><00:00:34.620><c> didn't</c><00:00:34.739><c> get</c>

00:00:34.970 --> 00:00:34.980 align:start position:0%
memory while we sleep if you didn't get
 

00:00:34.980 --> 00:00:37.430 align:start position:0%
memory while we sleep if you didn't get
enough<00:00:35.100><c> sleep</c><00:00:35.399><c> last</c><00:00:35.820><c> night</c><00:00:36.059><c> your</c><00:00:36.719><c> hippocampus</c>

00:00:37.430 --> 00:00:37.440 align:start position:0%
enough sleep last night your hippocampus
 

00:00:37.440 --> 00:00:39.830 align:start position:0%
enough sleep last night your hippocampus
and<00:00:37.620><c> basal</c><00:00:38.100><c> ganglia</c><00:00:38.579><c> might</c><00:00:39.239><c> not</c><00:00:39.420><c> have</c><00:00:39.600><c> had</c>

00:00:39.830 --> 00:00:39.840 align:start position:0%
and basal ganglia might not have had
 

00:00:39.840 --> 00:00:42.170 align:start position:0%
and basal ganglia might not have had
enough<00:00:39.960><c> time</c><00:00:40.260><c> to</c><00:00:40.500><c> complete</c><00:00:40.920><c> their</c><00:00:41.160><c> jobs</c><00:00:41.399><c> and</c>

00:00:42.170 --> 00:00:42.180 align:start position:0%
enough time to complete their jobs and
 

00:00:42.180 --> 00:00:44.690 align:start position:0%
enough time to complete their jobs and
so<00:00:42.420><c> your</c><00:00:42.600><c> memories</c><00:00:43.020><c> from</c><00:00:43.320><c> yesterday</c><00:00:43.620><c> might</c><00:00:44.520><c> be</c>

00:00:44.690 --> 00:00:44.700 align:start position:0%
so your memories from yesterday might be
 

00:00:44.700 --> 00:00:47.450 align:start position:0%
so your memories from yesterday might be
only<00:00:44.940><c> partially</c><00:00:45.480><c> formed</c><00:00:46.079><c> weak</c><00:00:46.680><c> or</c><00:00:47.280><c> even</c>

00:00:47.450 --> 00:00:47.460 align:start position:0%
only partially formed weak or even
 

00:00:47.460 --> 00:00:49.069 align:start position:0%
only partially formed weak or even
missing

00:00:49.069 --> 00:00:49.079 align:start position:0%
missing
 

00:00:49.079 --> 00:00:51.610 align:start position:0%
missing
number<00:00:49.739><c> two</c><00:00:50.039><c> a</c><00:00:50.940><c> good</c><00:00:51.059><c> night's</c><00:00:51.480><c> sleep</c>

00:00:51.610 --> 00:00:51.620 align:start position:0%
number two a good night's sleep
 

00:00:51.620 --> 00:00:54.410 align:start position:0%
number two a good night's sleep
recharges<00:00:52.620><c> your</c><00:00:52.920><c> brain</c><00:00:53.219><c> allowing</c><00:00:54.059><c> you</c><00:00:54.180><c> to</c>

00:00:54.410 --> 00:00:54.420 align:start position:0%
recharges your brain allowing you to
 

00:00:54.420 --> 00:00:57.229 align:start position:0%
recharges your brain allowing you to
feel<00:00:54.660><c> refreshed</c><00:00:55.379><c> alert</c><00:00:55.980><c> and</c><00:00:56.579><c> able</c><00:00:56.879><c> to</c><00:00:57.000><c> pay</c>

00:00:57.229 --> 00:00:57.239 align:start position:0%
feel refreshed alert and able to pay
 

00:00:57.239 --> 00:00:59.209 align:start position:0%
feel refreshed alert and able to pay
attention<00:00:57.660><c> when</c><00:00:58.079><c> you're</c><00:00:58.199><c> awake</c>

00:00:59.209 --> 00:00:59.219 align:start position:0%
attention when you're awake
 

00:00:59.219 --> 00:01:01.069 align:start position:0%
attention when you're awake
if<00:00:59.699><c> you</c><00:00:59.820><c> didn't</c><00:00:59.940><c> get</c><00:01:00.239><c> enough</c><00:01:00.360><c> sleep</c><00:01:00.719><c> last</c>

00:01:01.069 --> 00:01:01.079 align:start position:0%
if you didn't get enough sleep last
 

00:01:01.079 --> 00:01:03.709 align:start position:0%
if you didn't get enough sleep last
night<00:01:01.320><c> you</c><00:01:01.980><c> might</c><00:01:02.100><c> not</c><00:01:02.280><c> feel</c><00:01:02.640><c> so</c><00:01:02.879><c> alert</c><00:01:03.239><c> or</c>

00:01:03.709 --> 00:01:03.719 align:start position:0%
night you might not feel so alert or
 

00:01:03.719 --> 00:01:06.170 align:start position:0%
night you might not feel so alert or
able<00:01:03.960><c> to</c><00:01:04.080><c> focus</c><00:01:04.500><c> your</c><00:01:04.799><c> attention</c><00:01:05.159><c> today</c>

00:01:06.170 --> 00:01:06.180 align:start position:0%
able to focus your attention today
 

00:01:06.180 --> 00:01:08.230 align:start position:0%
able to focus your attention today
and<00:01:06.600><c> if</c><00:01:06.780><c> you</c><00:01:06.960><c> can't</c><00:01:07.140><c> pay</c><00:01:07.439><c> attention</c><00:01:07.799><c> today</c>

00:01:08.230 --> 00:01:08.240 align:start position:0%
and if you can't pay attention today
 

00:01:08.240 --> 00:01:10.310 align:start position:0%
and if you can't pay attention today
what<00:01:09.240><c> are</c><00:01:09.360><c> you</c><00:01:09.479><c> gonna</c><00:01:09.600><c> have</c><00:01:09.840><c> a</c><00:01:10.020><c> hard</c><00:01:10.140><c> time</c>

00:01:10.310 --> 00:01:10.320 align:start position:0%
what are you gonna have a hard time
 

00:01:10.320 --> 00:01:11.510 align:start position:0%
what are you gonna have a hard time
creating

00:01:11.510 --> 00:01:11.520 align:start position:0%
creating
 

00:01:11.520 --> 00:01:13.190 align:start position:0%
creating
new<00:01:12.060><c> memories</c>

00:01:13.190 --> 00:01:13.200 align:start position:0%
new memories
 

00:01:13.200 --> 00:01:14.630 align:start position:0%
new memories
number<00:01:13.799><c> three</c>

00:01:14.630 --> 00:01:14.640 align:start position:0%
number three
 

00:01:14.640 --> 00:01:17.630 align:start position:0%
number three
a<00:01:15.420><c> growing</c><00:01:15.720><c> body</c><00:01:16.020><c> of</c><00:01:16.380><c> evidence</c><00:01:16.680><c> suggests</c><00:01:17.400><c> that</c>

00:01:17.630 --> 00:01:17.640 align:start position:0%
a growing body of evidence suggests that
 

00:01:17.640 --> 00:01:20.510 align:start position:0%
a growing body of evidence suggests that
sleep<00:01:18.060><c> is</c><00:01:18.960><c> critical</c><00:01:19.320><c> for</c><00:01:19.560><c> reducing</c><00:01:20.100><c> your</c><00:01:20.280><c> risk</c>

00:01:20.510 --> 00:01:20.520 align:start position:0%
sleep is critical for reducing your risk
 

00:01:20.520 --> 00:01:22.570 align:start position:0%
sleep is critical for reducing your risk
of<00:01:20.700><c> Alzheimer's</c><00:01:21.360><c> disease</c>

00:01:22.570 --> 00:01:22.580 align:start position:0%
of Alzheimer's disease
 

00:01:22.580 --> 00:01:24.710 align:start position:0%
of Alzheimer's disease
Alzheimer's<00:01:23.580><c> is</c><00:01:23.759><c> triggered</c><00:01:24.240><c> by</c><00:01:24.540><c> an</c>

00:01:24.710 --> 00:01:24.720 align:start position:0%
Alzheimer's is triggered by an
 

00:01:24.720 --> 00:01:27.230 align:start position:0%
Alzheimer's is triggered by an
accumulation<00:01:25.259><c> of</c><00:01:25.560><c> amyloid</c><00:01:26.100><c> plaques</c>

00:01:27.230 --> 00:01:27.240 align:start position:0%
accumulation of amyloid plaques
 

00:01:27.240 --> 00:01:30.050 align:start position:0%
accumulation of amyloid plaques
normally<00:01:27.900><c> amyloid</c><00:01:28.619><c> is</c><00:01:28.799><c> cleared</c><00:01:29.280><c> away</c><00:01:29.400><c> and</c>

00:01:30.050 --> 00:01:30.060 align:start position:0%
normally amyloid is cleared away and
 

00:01:30.060 --> 00:01:32.929 align:start position:0%
normally amyloid is cleared away and
metabolized<00:01:30.720><c> by</c><00:01:30.900><c> glial</c><00:01:31.320><c> cells</c><00:01:31.799><c> your</c><00:01:32.520><c> brain's</c>

00:01:32.929 --> 00:01:32.939 align:start position:0%
metabolized by glial cells your brain's
 

00:01:32.939 --> 00:01:35.870 align:start position:0%
metabolized by glial cells your brain's
sewage<00:01:33.299><c> and</c><00:01:33.540><c> sanitation</c><00:01:34.020><c> department</c><00:01:34.880><c> this</c>

00:01:35.870 --> 00:01:35.880 align:start position:0%
sewage and sanitation department this
 

00:01:35.880 --> 00:01:38.510 align:start position:0%
sewage and sanitation department this
happens<00:01:36.299><c> while</c><00:01:37.140><c> you</c><00:01:37.380><c> sleep</c>

00:01:38.510 --> 00:01:38.520 align:start position:0%
happens while you sleep
 

00:01:38.520 --> 00:01:41.450 align:start position:0%
happens while you sleep
deep<00:01:39.180><c> sleep</c><00:01:39.420><c> in</c><00:01:39.960><c> particular</c><00:01:40.320><c> is</c><00:01:40.860><c> like</c><00:01:41.100><c> a</c><00:01:41.340><c> power</c>

00:01:41.450 --> 00:01:41.460 align:start position:0%
deep sleep in particular is like a power
 

00:01:41.460 --> 00:01:43.190 align:start position:0%
deep sleep in particular is like a power
cleanse<00:01:42.000><c> for</c><00:01:42.119><c> your</c><00:01:42.360><c> brain</c>

00:01:43.190 --> 00:01:43.200 align:start position:0%
cleanse for your brain
 

00:01:43.200 --> 00:01:45.230 align:start position:0%
cleanse for your brain
if<00:01:43.680><c> you</c><00:01:43.799><c> shortchange</c><00:01:44.400><c> yourself</c><00:01:44.640><c> on</c><00:01:45.000><c> deep</c>

00:01:45.230 --> 00:01:45.240 align:start position:0%
if you shortchange yourself on deep
 

00:01:45.240 --> 00:01:47.210 align:start position:0%
if you shortchange yourself on deep
sleep<00:01:45.479><c> your</c><00:01:46.020><c> glial</c><00:01:46.259><c> cells</c><00:01:46.680><c> won't</c><00:01:46.799><c> have</c><00:01:47.040><c> enough</c>

00:01:47.210 --> 00:01:47.220 align:start position:0%
sleep your glial cells won't have enough
 

00:01:47.220 --> 00:01:49.310 align:start position:0%
sleep your glial cells won't have enough
time<00:01:47.460><c> to</c><00:01:47.640><c> finish</c><00:01:47.820><c> cleaning</c><00:01:48.299><c> your</c><00:01:48.540><c> brain</c><00:01:48.840><c> and</c>

00:01:49.310 --> 00:01:49.320 align:start position:0%
time to finish cleaning your brain and
 

00:01:49.320 --> 00:01:50.630 align:start position:0%
time to finish cleaning your brain and
you'll<00:01:49.500><c> wake</c><00:01:49.680><c> up</c><00:01:49.860><c> in</c><00:01:50.040><c> the</c><00:01:50.159><c> morning</c><00:01:50.280><c> with</c>

00:01:50.630 --> 00:01:50.640 align:start position:0%
you'll wake up in the morning with
 

00:01:50.640 --> 00:01:52.550 align:start position:0%
you'll wake up in the morning with
uncleared<00:01:51.299><c> amyloid</c><00:01:51.780><c> plaques</c><00:01:52.259><c> and</c><00:01:52.380><c> your</c>

00:01:52.550 --> 00:01:52.560 align:start position:0%
uncleared amyloid plaques and your
 

00:01:52.560 --> 00:01:54.249 align:start position:0%
uncleared amyloid plaques and your
synapses<00:01:53.040><c> from</c><00:01:53.399><c> yesterday</c>

00:01:54.249 --> 00:01:54.259 align:start position:0%
synapses from yesterday
 

00:01:54.259 --> 00:01:56.270 align:start position:0%
synapses from yesterday
increasing<00:01:55.259><c> your</c><00:01:55.439><c> risk</c><00:01:55.680><c> of</c><00:01:55.860><c> developing</c>

00:01:56.270 --> 00:01:56.280 align:start position:0%
increasing your risk of developing
 

00:01:56.280 --> 00:01:57.830 align:start position:0%
increasing your risk of developing
Alzheimer's

00:01:57.830 --> 00:01:57.840 align:start position:0%
Alzheimer's
 

00:01:57.840 --> 00:01:59.929 align:start position:0%
Alzheimer's
I<00:01:58.380><c> don't</c><00:01:58.439><c> know</c><00:01:58.619><c> about</c><00:01:58.740><c> you</c><00:01:59.100><c> but</c><00:01:59.520><c> I've</c><00:01:59.759><c> been</c>

00:01:59.929 --> 00:01:59.939 align:start position:0%
I don't know about you but I've been
 

00:01:59.939 --> 00:02:03.590 align:start position:0%
I don't know about you but I've been
sleep<00:02:00.180><c> deprived</c><00:02:00.780><c> for</c><00:02:01.200><c> decades</c><00:02:02.159><c> work</c><00:02:03.000><c> birthing</c>

00:02:03.590 --> 00:02:03.600 align:start position:0%
sleep deprived for decades work birthing
 

00:02:03.600 --> 00:02:05.749 align:start position:0%
sleep deprived for decades work birthing
and<00:02:03.780><c> raising</c><00:02:04.200><c> three</c><00:02:04.439><c> children</c><00:02:04.799><c> Netflix</c>

00:02:05.749 --> 00:02:05.759 align:start position:0%
and raising three children Netflix
 

00:02:05.759 --> 00:02:10.490 align:start position:0%
and raising three children Netflix
binging<00:02:06.619><c> worrying</c><00:02:07.700><c> perimenopause</c><00:02:08.700><c> I'm</c><00:02:09.599><c> 51.</c>

00:02:10.490 --> 00:02:10.500 align:start position:0%
binging worrying perimenopause I'm 51.
 

00:02:10.500 --> 00:02:13.130 align:start position:0%
binging worrying perimenopause I'm 51.
is<00:02:11.160><c> it</c><00:02:11.400><c> too</c><00:02:11.580><c> late</c><00:02:11.700><c> for</c><00:02:12.000><c> me</c>

00:02:13.130 --> 00:02:13.140 align:start position:0%
is it too late for me
 

00:02:13.140 --> 00:02:16.190 align:start position:0%
is it too late for me
here's<00:02:13.739><c> the</c><00:02:13.980><c> very</c><00:02:14.220><c> good</c><00:02:14.400><c> news</c><00:02:14.840><c> however</c><00:02:15.840><c> sleep</c>

00:02:16.190 --> 00:02:16.200 align:start position:0%
here's the very good news however sleep
 

00:02:16.200 --> 00:02:18.110 align:start position:0%
here's the very good news however sleep
deprived<00:02:16.800><c> you've</c><00:02:17.160><c> already</c><00:02:17.459><c> been</c><00:02:17.760><c> in</c><00:02:17.940><c> your</c>

00:02:18.110 --> 00:02:18.120 align:start position:0%
deprived you've already been in your
 

00:02:18.120 --> 00:02:21.470 align:start position:0%
deprived you've already been in your
life<00:02:18.300><c> is</c><00:02:19.020><c> water</c><00:02:19.319><c> under</c><00:02:19.620><c> the</c><00:02:19.920><c> bridge</c><00:02:20.300><c> you</c><00:02:21.300><c> can</c>

00:02:21.470 --> 00:02:21.480 align:start position:0%
life is water under the bridge you can
 

00:02:21.480 --> 00:02:23.630 align:start position:0%
life is water under the bridge you can
secure<00:02:21.900><c> what</c><00:02:22.140><c> you've</c><00:02:22.379><c> learned</c><00:02:22.620><c> today</c><00:02:22.920><c> and</c>

00:02:23.630 --> 00:02:23.640 align:start position:0%
secure what you've learned today and
 

00:02:23.640 --> 00:02:25.010 align:start position:0%
secure what you've learned today and
reduce<00:02:23.879><c> your</c><00:02:24.239><c> risk</c><00:02:24.480><c> of</c><00:02:24.599><c> developing</c>

00:02:25.010 --> 00:02:25.020 align:start position:0%
reduce your risk of developing
 

00:02:25.020 --> 00:02:27.170 align:start position:0%
reduce your risk of developing
Alzheimer's<00:02:25.739><c> in</c><00:02:25.920><c> the</c><00:02:26.040><c> future</c><00:02:26.220><c> by</c><00:02:26.940><c> getting</c>

00:02:27.170 --> 00:02:27.180 align:start position:0%
Alzheimer's in the future by getting
 

00:02:27.180 --> 00:02:30.200 align:start position:0%
Alzheimer's in the future by getting
enough<00:02:27.420><c> sleep</c><00:02:27.780><c> tonight</c>


```

# How to boost your brain and memory/Stay Engaged.en.vtt

```vtt
WEBVTT
Kind: captions
Language: en

00:00:06.299 --> 00:00:09.350 align:start position:0%
 
an<00:00:07.140><c> average</c><00:00:07.319><c> brain</c><00:00:07.859><c> is</c><00:00:08.220><c> estimated</c><00:00:08.700><c> to</c><00:00:09.000><c> contain</c>

00:00:09.350 --> 00:00:09.360 align:start position:0%
an average brain is estimated to contain
 

00:00:09.360 --> 00:00:11.990 align:start position:0%
an average brain is estimated to contain
over<00:00:09.900><c> a</c><00:00:10.320><c> hundred</c><00:00:10.800><c> trillion</c><00:00:11.519><c> neural</c>

00:00:11.990 --> 00:00:12.000 align:start position:0%
over a hundred trillion neural
 

00:00:12.000 --> 00:00:15.169 align:start position:0%
over a hundred trillion neural
connections<00:00:12.660><c> called</c><00:00:13.380><c> synapses</c><00:00:14.160><c> and</c><00:00:15.000><c> this</c>

00:00:15.169 --> 00:00:15.179 align:start position:0%
connections called synapses and this
 

00:00:15.179 --> 00:00:17.990 align:start position:0%
connections called synapses and this
isn't<00:00:15.480><c> a</c><00:00:15.719><c> static</c><00:00:16.020><c> number</c><00:00:16.279><c> we</c><00:00:17.279><c> gain</c><00:00:17.580><c> and</c><00:00:17.820><c> lose</c>

00:00:17.990 --> 00:00:18.000 align:start position:0%
isn't a static number we gain and lose
 

00:00:18.000 --> 00:00:20.269 align:start position:0%
isn't a static number we gain and lose
synapses<00:00:18.660><c> all</c><00:00:19.140><c> the</c><00:00:19.320><c> time</c>

00:00:20.269 --> 00:00:20.279 align:start position:0%
synapses all the time
 

00:00:20.279 --> 00:00:22.849 align:start position:0%
synapses all the time
every<00:00:20.820><c> time</c><00:00:21.000><c> we</c><00:00:21.180><c> learn</c><00:00:21.359><c> something</c><00:00:21.720><c> new</c><00:00:22.140><c> we're</c>

00:00:22.849 --> 00:00:22.859 align:start position:0%
every time we learn something new we're
 

00:00:22.859 --> 00:00:25.310 align:start position:0%
every time we learn something new we're
creating<00:00:23.340><c> new</c><00:00:23.760><c> synapses</c>

00:00:25.310 --> 00:00:25.320 align:start position:0%
creating new synapses
 

00:00:25.320 --> 00:00:27.650 align:start position:0%
creating new synapses
so<00:00:25.740><c> how</c><00:00:25.920><c> might</c><00:00:26.100><c> learning</c><00:00:26.580><c> something</c><00:00:26.760><c> new</c><00:00:27.060><c> help</c>

00:00:27.650 --> 00:00:27.660 align:start position:0%
so how might learning something new help
 

00:00:27.660 --> 00:00:29.990 align:start position:0%
so how might learning something new help
us<00:00:27.840><c> when</c><00:00:28.140><c> it</c><00:00:28.260><c> comes</c><00:00:28.439><c> to</c><00:00:28.680><c> Alzheimer's</c>

00:00:29.990 --> 00:00:30.000 align:start position:0%
us when it comes to Alzheimer's
 

00:00:30.000 --> 00:00:32.210 align:start position:0%
us when it comes to Alzheimer's
the<00:00:30.660><c> symptoms</c><00:00:30.840><c> of</c><00:00:31.199><c> Alzheimer's</c><00:00:31.920><c> are</c>

00:00:32.210 --> 00:00:32.220 align:start position:0%
the symptoms of Alzheimer's are
 

00:00:32.220 --> 00:00:35.330 align:start position:0%
the symptoms of Alzheimer's are
ultimately<00:00:32.579><c> caused</c><00:00:33.120><c> by</c><00:00:33.420><c> a</c><00:00:33.600><c> loss</c><00:00:33.899><c> of</c><00:00:34.020><c> synapses</c>

00:00:35.330 --> 00:00:35.340 align:start position:0%
ultimately caused by a loss of synapses
 

00:00:35.340 --> 00:00:37.990 align:start position:0%
ultimately caused by a loss of synapses
but<00:00:35.940><c> what</c><00:00:36.239><c> if</c><00:00:36.420><c> for</c><00:00:36.840><c> every</c><00:00:37.020><c> synapse</c><00:00:37.559><c> we</c><00:00:37.739><c> lose</c>

00:00:37.990 --> 00:00:38.000 align:start position:0%
but what if for every synapse we lose
 

00:00:38.000 --> 00:00:40.970 align:start position:0%
but what if for every synapse we lose
we've<00:00:39.000><c> already</c><00:00:39.120><c> created</c><00:00:39.660><c> backup</c>

00:00:40.970 --> 00:00:40.980 align:start position:0%
we've already created backup
 

00:00:40.980 --> 00:00:43.729 align:start position:0%
we've already created backup
we<00:00:41.640><c> call</c><00:00:41.820><c> this</c><00:00:42.059><c> backup</c><00:00:42.480><c> cognitive</c><00:00:43.079><c> reserve</c>

00:00:43.729 --> 00:00:43.739 align:start position:0%
we call this backup cognitive reserve
 

00:00:43.739 --> 00:00:47.389 align:start position:0%
we call this backup cognitive reserve
and<00:00:44.280><c> you</c><00:00:44.399><c> create</c><00:00:44.640><c> it</c><00:00:44.879><c> by</c><00:00:45.059><c> learning</c><00:00:45.420><c> new</c><00:00:45.660><c> things</c>

00:00:47.389 --> 00:00:47.399 align:start position:0%
and you create it by learning new things
 

00:00:47.399 --> 00:00:49.369 align:start position:0%
and you create it by learning new things
people<00:00:47.879><c> who</c><00:00:48.180><c> have</c><00:00:48.360><c> more</c><00:00:48.600><c> years</c><00:00:48.780><c> of</c><00:00:49.079><c> formal</c>

00:00:49.369 --> 00:00:49.379 align:start position:0%
people who have more years of formal
 

00:00:49.379 --> 00:00:51.470 align:start position:0%
people who have more years of formal
education<00:00:49.920><c> who</c><00:00:50.460><c> have</c><00:00:50.640><c> a</c><00:00:50.760><c> greater</c><00:00:51.059><c> degree</c><00:00:51.300><c> of</c>

00:00:51.470 --> 00:00:51.480 align:start position:0%
education who have a greater degree of
 

00:00:51.480 --> 00:00:54.770 align:start position:0%
education who have a greater degree of
literacy<00:00:52.079><c> and</c><00:00:52.680><c> who</c><00:00:52.920><c> engage</c><00:00:53.460><c> regularly</c><00:00:54.239><c> and</c>

00:00:54.770 --> 00:00:54.780 align:start position:0%
literacy and who engage regularly and
 

00:00:54.780 --> 00:00:56.689 align:start position:0%
literacy and who engage regularly and
socially<00:00:55.199><c> and</c><00:00:55.620><c> mentally</c><00:00:56.039><c> stimulating</c>

00:00:56.689 --> 00:00:56.699 align:start position:0%
socially and mentally stimulating
 

00:00:56.699 --> 00:01:00.590 align:start position:0%
socially and mentally stimulating
activities<00:00:57.420><c> have</c><00:00:58.320><c> more</c><00:00:58.739><c> cognitive</c><00:00:59.160><c> Reserve</c>

00:01:00.590 --> 00:01:00.600 align:start position:0%
activities have more cognitive Reserve
 

00:01:00.600 --> 00:01:02.750 align:start position:0%
activities have more cognitive Reserve
so<00:01:00.960><c> if</c><00:01:01.199><c> Alzheimer's</c><00:01:01.860><c> begins</c><00:01:02.219><c> attacking</c>

00:01:02.750 --> 00:01:02.760 align:start position:0%
so if Alzheimer's begins attacking
 

00:01:02.760 --> 00:01:05.509 align:start position:0%
so if Alzheimer's begins attacking
synapses<00:01:03.420><c> in</c><00:01:03.660><c> these</c><00:01:03.899><c> brains</c><00:01:04.320><c> the</c><00:01:05.220><c> backup</c>

00:01:05.509 --> 00:01:05.519 align:start position:0%
synapses in these brains the backup
 

00:01:05.519 --> 00:01:07.490 align:start position:0%
synapses in these brains the backup
synapses<00:01:06.119><c> might</c><00:01:06.420><c> buffer</c><00:01:06.840><c> these</c><00:01:07.080><c> folks</c><00:01:07.320><c> from</c>

00:01:07.490 --> 00:01:07.500 align:start position:0%
synapses might buffer these folks from
 

00:01:07.500 --> 00:01:09.649 align:start position:0%
synapses might buffer these folks from
noticing<00:01:07.920><c> that</c><00:01:08.159><c> anything</c><00:01:08.340><c> is</c><00:01:08.640><c> amiss</c>

00:01:09.649 --> 00:01:09.659 align:start position:0%
noticing that anything is amiss
 

00:01:09.659 --> 00:01:12.350 align:start position:0%
noticing that anything is amiss
as<00:01:10.320><c> a</c><00:01:10.560><c> result</c><00:01:10.680><c> people</c><00:01:11.520><c> with</c><00:01:11.880><c> a</c><00:01:12.119><c> lot</c><00:01:12.180><c> of</c>

00:01:12.350 --> 00:01:12.360 align:start position:0%
as a result people with a lot of
 

00:01:12.360 --> 00:01:14.929 align:start position:0%
as a result people with a lot of
cognitive<00:01:12.780><c> Reserve</c><00:01:13.380><c> have</c><00:01:13.920><c> a</c><00:01:14.100><c> reduced</c><00:01:14.520><c> risk</c><00:01:14.820><c> of</c>

00:01:14.929 --> 00:01:14.939 align:start position:0%
cognitive Reserve have a reduced risk of
 

00:01:14.939 --> 00:01:17.929 align:start position:0%
cognitive Reserve have a reduced risk of
being<00:01:15.299><c> diagnosed</c><00:01:16.020><c> with</c><00:01:16.260><c> Alzheimer's</c><00:01:16.979><c> even</c><00:01:17.700><c> if</c>

00:01:17.929 --> 00:01:17.939 align:start position:0%
being diagnosed with Alzheimer's even if
 

00:01:17.939 --> 00:01:19.969 align:start position:0%
being diagnosed with Alzheimer's even if
the<00:01:18.119><c> disease</c><00:01:18.479><c> pathology</c><00:01:18.960><c> is</c><00:01:19.500><c> present</c><00:01:19.799><c> in</c>

00:01:19.969 --> 00:01:19.979 align:start position:0%
the disease pathology is present in
 

00:01:19.979 --> 00:01:21.410 align:start position:0%
the disease pathology is present in
their<00:01:20.220><c> brains</c>

00:01:21.410 --> 00:01:21.420 align:start position:0%
their brains
 

00:01:21.420 --> 00:01:24.289 align:start position:0%
their brains
by<00:01:21.840><c> the</c><00:01:22.020><c> way</c><00:01:22.140><c> there</c><00:01:23.100><c> is</c><00:01:23.280><c> zero</c><00:01:23.700><c> evidence</c><00:01:24.000><c> that</c>

00:01:24.289 --> 00:01:24.299 align:start position:0%
by the way there is zero evidence that
 

00:01:24.299 --> 00:01:26.210 align:start position:0%
by the way there is zero evidence that
doing<00:01:24.479><c> crossword</c><00:01:24.840><c> puzzles</c><00:01:25.500><c> improves</c><00:01:25.979><c> your</c>

00:01:26.210 --> 00:01:26.220 align:start position:0%
doing crossword puzzles improves your
 

00:01:26.220 --> 00:01:28.310 align:start position:0%
doing crossword puzzles improves your
memory<00:01:26.580><c> or</c><00:01:27.360><c> reduces</c><00:01:27.780><c> your</c><00:01:28.020><c> risk</c><00:01:28.200><c> of</c>

00:01:28.310 --> 00:01:28.320 align:start position:0%
memory or reduces your risk of
 

00:01:28.320 --> 00:01:30.890 align:start position:0%
memory or reduces your risk of
developing<00:01:28.740><c> Alzheimer's</c><00:01:30.000><c> you'll</c><00:01:30.479><c> get</c><00:01:30.659><c> better</c>

00:01:30.890 --> 00:01:30.900 align:start position:0%
developing Alzheimer's you'll get better
 

00:01:30.900 --> 00:01:33.530 align:start position:0%
developing Alzheimer's you'll get better
at<00:01:31.140><c> doing</c><00:01:31.380><c> crosswords</c><00:01:32.220><c> if</c><00:01:32.400><c> you</c><00:01:32.580><c> do</c><00:01:32.700><c> crosswords</c>

00:01:33.530 --> 00:01:33.540 align:start position:0%
at doing crosswords if you do crosswords
 

00:01:33.540 --> 00:01:35.990 align:start position:0%
at doing crosswords if you do crosswords
but<00:01:34.320><c> this</c><00:01:34.560><c> skill</c><00:01:34.740><c> doesn't</c><00:01:35.040><c> transfer</c><00:01:35.579><c> to</c><00:01:35.759><c> being</c>

00:01:35.990 --> 00:01:36.000 align:start position:0%
but this skill doesn't transfer to being
 

00:01:36.000 --> 00:01:37.490 align:start position:0%
but this skill doesn't transfer to being
better<00:01:36.180><c> able</c><00:01:36.540><c> to</c><00:01:36.659><c> remember</c><00:01:36.900><c> where</c><00:01:37.259><c> you</c><00:01:37.380><c> left</c>

00:01:37.490 --> 00:01:37.500 align:start position:0%
better able to remember where you left
 

00:01:37.500 --> 00:01:39.890 align:start position:0%
better able to remember where you left
your<00:01:37.740><c> glasses</c><00:01:38.220><c> or</c><00:01:39.000><c> remembering</c><00:01:39.420><c> more</c><00:01:39.600><c> of</c><00:01:39.720><c> what</c>

00:01:39.890 --> 00:01:39.900 align:start position:0%
your glasses or remembering more of what
 

00:01:39.900 --> 00:01:41.390 align:start position:0%
your glasses or remembering more of what
happened<00:01:40.079><c> yesterday</c>

00:01:41.390 --> 00:01:41.400 align:start position:0%
happened yesterday
 

00:01:41.400 --> 00:01:44.690 align:start position:0%
happened yesterday
to<00:01:42.060><c> create</c><00:01:42.240><c> more</c><00:01:42.600><c> synapses</c><00:01:43.320><c> and</c><00:01:44.159><c> a</c><00:01:44.280><c> cognitive</c>

00:01:44.690 --> 00:01:44.700 align:start position:0%
to create more synapses and a cognitive
 

00:01:44.700 --> 00:01:47.569 align:start position:0%
to create more synapses and a cognitive
Reserve<00:01:45.299><c> you're</c><00:01:46.079><c> better</c><00:01:46.320><c> off</c><00:01:46.619><c> learning</c><00:01:47.340><c> new</c>

00:01:47.569 --> 00:01:47.579 align:start position:0%
Reserve you're better off learning new
 

00:01:47.579 --> 00:01:49.820 align:start position:0%
Reserve you're better off learning new
things


```

# How to boost your brain and memory/Working Memory.en.vtt

```vtt
WEBVTT
Kind: captions
Language: en

00:00:05.819 --> 00:00:09.169 align:start position:0%
 
remember<00:00:06.660><c> Henry</c><00:00:07.200><c> malleason</c><00:00:07.880><c> without</c><00:00:08.880><c> a</c>

00:00:09.169 --> 00:00:09.179 align:start position:0%
remember Henry malleason without a
 

00:00:09.179 --> 00:00:12.049 align:start position:0%
remember Henry malleason without a
hippocampus<00:00:09.840><c> he</c><00:00:10.440><c> could</c><00:00:10.679><c> not</c><00:00:10.860><c> create</c><00:00:11.219><c> any</c><00:00:11.820><c> new</c>

00:00:12.049 --> 00:00:12.059 align:start position:0%
hippocampus he could not create any new
 

00:00:12.059 --> 00:00:14.930 align:start position:0%
hippocampus he could not create any new
consciously<00:00:12.660><c> held</c><00:00:13.019><c> long-term</c><00:00:13.559><c> memories</c><00:00:14.460><c> but</c>

00:00:14.930 --> 00:00:14.940 align:start position:0%
consciously held long-term memories but
 

00:00:14.940 --> 00:00:17.810 align:start position:0%
consciously held long-term memories but
he<00:00:15.240><c> didn't</c><00:00:15.420><c> lose</c><00:00:15.780><c> his</c><00:00:16.080><c> memory</c><00:00:16.379><c> for</c><00:00:16.680><c> everything</c>

00:00:17.810 --> 00:00:17.820 align:start position:0%
he didn't lose his memory for everything
 

00:00:17.820 --> 00:00:19.910 align:start position:0%
he didn't lose his memory for everything
he<00:00:18.240><c> could</c><00:00:18.420><c> remember</c><00:00:18.720><c> information</c><00:00:19.199><c> long</c>

00:00:19.910 --> 00:00:19.920 align:start position:0%
he could remember information long
 

00:00:19.920 --> 00:00:21.890 align:start position:0%
he could remember information long
enough<00:00:20.160><c> to</c><00:00:20.520><c> comprehend</c><00:00:21.000><c> what</c><00:00:21.359><c> someone</c><00:00:21.600><c> just</c>

00:00:21.890 --> 00:00:21.900 align:start position:0%
enough to comprehend what someone just
 

00:00:21.900 --> 00:00:25.070 align:start position:0%
enough to comprehend what someone just
said<00:00:22.140><c> to</c><00:00:22.320><c> him</c><00:00:22.500><c> as</c><00:00:23.340><c> long</c><00:00:23.520><c> as</c><00:00:23.699><c> what</c><00:00:24.000><c> was</c><00:00:24.180><c> said</c><00:00:24.480><c> was</c>

00:00:25.070 --> 00:00:25.080 align:start position:0%
said to him as long as what was said was
 

00:00:25.080 --> 00:00:27.950 align:start position:0%
said to him as long as what was said was
brief<00:00:25.560><c> and</c><00:00:25.920><c> Henry</c><00:00:26.279><c> wasn't</c><00:00:26.519><c> distracted</c>

00:00:27.950 --> 00:00:27.960 align:start position:0%
brief and Henry wasn't distracted
 

00:00:27.960 --> 00:00:30.589 align:start position:0%
brief and Henry wasn't distracted
if<00:00:28.439><c> his</c><00:00:28.619><c> doctor</c><00:00:28.920><c> had</c><00:00:29.220><c> said</c><00:00:29.460><c> to</c><00:00:29.640><c> him</c><00:00:29.820><c> Henry</c>

00:00:30.589 --> 00:00:30.599 align:start position:0%
if his doctor had said to him Henry
 

00:00:30.599 --> 00:00:33.049 align:start position:0%
if his doctor had said to him Henry
repeat<00:00:30.840><c> this</c><00:00:31.260><c> sentence</c><00:00:31.679><c> I</c><00:00:32.520><c> love</c><00:00:32.640><c> to</c><00:00:32.880><c> eat</c>

00:00:33.049 --> 00:00:33.059 align:start position:0%
repeat this sentence I love to eat
 

00:00:33.059 --> 00:00:35.750 align:start position:0%
repeat this sentence I love to eat
spaghetti<00:00:34.140><c> Henry</c><00:00:34.860><c> would</c><00:00:35.160><c> have</c><00:00:35.280><c> been</c><00:00:35.399><c> able</c><00:00:35.640><c> to</c>

00:00:35.750 --> 00:00:35.760 align:start position:0%
spaghetti Henry would have been able to
 

00:00:35.760 --> 00:00:37.729 align:start position:0%
spaghetti Henry would have been able to
successfully<00:00:36.420><c> remember</c><00:00:36.600><c> and</c><00:00:37.020><c> repeat</c><00:00:37.260><c> it</c><00:00:37.500><c> back</c>

00:00:37.729 --> 00:00:37.739 align:start position:0%
successfully remember and repeat it back
 

00:00:37.739 --> 00:00:40.790 align:start position:0%
successfully remember and repeat it back
but<00:00:38.640><c> he</c><00:00:38.880><c> would</c><00:00:39.059><c> have</c><00:00:39.239><c> completely</c><00:00:39.960><c> forgotten</c>

00:00:40.790 --> 00:00:40.800 align:start position:0%
but he would have completely forgotten
 

00:00:40.800 --> 00:00:43.910 align:start position:0%
but he would have completely forgotten
both<00:00:41.340><c> I</c><00:00:41.879><c> love</c><00:00:42.059><c> to</c><00:00:42.239><c> eat</c><00:00:42.420><c> spaghetti</c><00:00:43.020><c> and</c><00:00:43.739><c> that</c>

00:00:43.910 --> 00:00:43.920 align:start position:0%
both I love to eat spaghetti and that
 

00:00:43.920 --> 00:00:45.709 align:start position:0%
both I love to eat spaghetti and that
his<00:00:44.100><c> doctor</c><00:00:44.280><c> had</c><00:00:44.700><c> ever</c><00:00:44.940><c> asked</c><00:00:45.360><c> him</c><00:00:45.480><c> to</c>

00:00:45.709 --> 00:00:45.719 align:start position:0%
his doctor had ever asked him to
 

00:00:45.719 --> 00:00:48.290 align:start position:0%
his doctor had ever asked him to
remember<00:00:45.899><c> this</c><00:00:46.320><c> a</c><00:00:46.920><c> minute</c><00:00:47.040><c> later</c>

00:00:48.290 --> 00:00:48.300 align:start position:0%
remember this a minute later
 

00:00:48.300 --> 00:00:50.150 align:start position:0%
remember this a minute later
but<00:00:48.719><c> how</c><00:00:48.899><c> could</c><00:00:49.079><c> he</c><00:00:49.260><c> remember</c><00:00:49.440><c> anything</c>

00:00:50.150 --> 00:00:50.160 align:start position:0%
but how could he remember anything
 

00:00:50.160 --> 00:00:53.510 align:start position:0%
but how could he remember anything
without<00:00:50.940><c> a</c><00:00:51.180><c> hippocampus</c><00:00:51.899><c> well</c><00:00:52.739><c> Henry</c><00:00:53.160><c> still</c>

00:00:53.510 --> 00:00:53.520 align:start position:0%
without a hippocampus well Henry still
 

00:00:53.520 --> 00:00:56.450 align:start position:0%
without a hippocampus well Henry still
had<00:00:53.760><c> his</c><00:00:54.000><c> prefrontal</c><00:00:54.660><c> cortex</c><00:00:55.260><c> and</c><00:00:56.039><c> this</c><00:00:56.280><c> is</c>

00:00:56.450 --> 00:00:56.460 align:start position:0%
had his prefrontal cortex and this is
 

00:00:56.460 --> 00:00:58.670 align:start position:0%
had his prefrontal cortex and this is
the<00:00:56.760><c> primary</c><00:00:57.180><c> place</c><00:00:57.539><c> where</c><00:00:58.140><c> the</c><00:00:58.379><c> present</c>

00:00:58.670 --> 00:00:58.680 align:start position:0%
the primary place where the present
 

00:00:58.680 --> 00:01:00.709 align:start position:0%
the primary place where the present
moment<00:00:59.160><c> is</c><00:00:59.460><c> remembered</c>

00:01:00.709 --> 00:01:00.719 align:start position:0%
moment is remembered
 

00:01:00.719 --> 00:01:03.650 align:start position:0%
moment is remembered
whatever<00:01:01.559><c> is</c><00:01:01.980><c> held</c><00:01:02.280><c> in</c><00:01:02.399><c> your</c><00:01:02.579><c> awareness</c><00:01:03.059><c> right</c>

00:01:03.650 --> 00:01:03.660 align:start position:0%
whatever is held in your awareness right
 

00:01:03.660 --> 00:01:07.310 align:start position:0%
whatever is held in your awareness right
now<00:01:03.899><c> is</c><00:01:04.559><c> called</c><00:01:04.799><c> your</c><00:01:05.159><c> working</c><00:01:05.339><c> memory</c><00:01:05.960><c> it's</c><00:01:06.960><c> a</c>

00:01:07.310 --> 00:01:07.320 align:start position:0%
now is called your working memory it's a
 

00:01:07.320 --> 00:01:09.649 align:start position:0%
now is called your working memory it's a
small<00:01:07.619><c> and</c><00:01:07.860><c> short-lived</c><00:01:08.460><c> holding</c><00:01:08.820><c> space</c><00:01:09.060><c> for</c>

00:01:09.649 --> 00:01:09.659 align:start position:0%
small and short-lived holding space for
 

00:01:09.659 --> 00:01:12.230 align:start position:0%
small and short-lived holding space for
the<00:01:09.900><c> sights</c><00:01:10.439><c> sound</c><00:01:10.740><c> smells</c><00:01:11.340><c> tastes</c><00:01:11.820><c> emotions</c>

00:01:12.230 --> 00:01:12.240 align:start position:0%
the sights sound smells tastes emotions
 

00:01:12.240 --> 00:01:15.289 align:start position:0%
the sights sound smells tastes emotions
and<00:01:12.540><c> language</c><00:01:12.840><c> of</c><00:01:13.740><c> right</c><00:01:14.040><c> now</c><00:01:14.299><c> keeping</c>

00:01:15.289 --> 00:01:15.299 align:start position:0%
and language of right now keeping
 

00:01:15.299 --> 00:01:17.870 align:start position:0%
and language of right now keeping
whatever<00:01:15.600><c> you</c><00:01:16.080><c> just</c><00:01:16.260><c> experienced</c><00:01:17.040><c> only</c><00:01:17.580><c> long</c>

00:01:17.870 --> 00:01:17.880 align:start position:0%
whatever you just experienced only long
 

00:01:17.880 --> 00:01:20.390 align:start position:0%
whatever you just experienced only long
enough<00:01:18.060><c> to</c><00:01:18.420><c> use</c><00:01:18.659><c> it</c><00:01:18.900><c> or</c><00:01:19.380><c> not</c>

00:01:20.390 --> 00:01:20.400 align:start position:0%
enough to use it or not
 

00:01:20.400 --> 00:01:23.270 align:start position:0%
enough to use it or not
working<00:01:21.119><c> memory</c><00:01:21.600><c> for</c><00:01:21.840><c> what</c><00:01:22.140><c> you</c><00:01:22.320><c> see</c><00:01:22.619><c> is</c>

00:01:23.270 --> 00:01:23.280 align:start position:0%
working memory for what you see is
 

00:01:23.280 --> 00:01:26.149 align:start position:0%
working memory for what you see is
called<00:01:23.520><c> the</c><00:01:23.759><c> visual</c><00:01:24.180><c> spatial</c><00:01:24.780><c> scratch</c><00:01:25.200><c> pad</c>

00:01:26.149 --> 00:01:26.159 align:start position:0%
called the visual spatial scratch pad
 

00:01:26.159 --> 00:01:28.670 align:start position:0%
called the visual spatial scratch pad
imagine<00:01:26.700><c> words</c><00:01:27.119><c> on</c><00:01:27.420><c> a</c><00:01:27.600><c> Post-It</c><00:01:27.900><c> note</c><00:01:28.080><c> written</c>

00:01:28.670 --> 00:01:28.680 align:start position:0%
imagine words on a Post-It note written
 

00:01:28.680 --> 00:01:30.530 align:start position:0%
imagine words on a Post-It note written
in<00:01:28.860><c> disappearing</c><00:01:29.400><c> ink</c>

00:01:30.530 --> 00:01:30.540 align:start position:0%
in disappearing ink
 

00:01:30.540 --> 00:01:32.570 align:start position:0%
in disappearing ink
working<00:01:31.020><c> memory</c><00:01:31.439><c> for</c><00:01:31.619><c> what</c><00:01:31.860><c> you</c><00:01:31.979><c> hear</c><00:01:32.220><c> is</c>

00:01:32.570 --> 00:01:32.580 align:start position:0%
working memory for what you hear is
 

00:01:32.580 --> 00:01:35.390 align:start position:0%
working memory for what you hear is
called<00:01:32.820><c> your</c><00:01:33.060><c> phonological</c><00:01:33.840><c> loop</c><00:01:34.380><c> it's</c><00:01:35.159><c> that</c>

00:01:35.390 --> 00:01:35.400 align:start position:0%
called your phonological loop it's that
 

00:01:35.400 --> 00:01:37.490 align:start position:0%
called your phonological loop it's that
brief<00:01:35.820><c> echo</c><00:01:36.299><c> in</c><00:01:36.420><c> your</c><00:01:36.600><c> head</c><00:01:36.780><c> of</c><00:01:37.020><c> what</c><00:01:37.200><c> you</c><00:01:37.320><c> just</c>

00:01:37.490 --> 00:01:37.500 align:start position:0%
brief echo in your head of what you just
 

00:01:37.500 --> 00:01:40.730 align:start position:0%
brief echo in your head of what you just
heard<00:01:37.799><c> the</c><00:01:38.579><c> world's</c><00:01:38.939><c> shortest</c><00:01:39.360><c> soundtrack</c>

00:01:40.730 --> 00:01:40.740 align:start position:0%
heard the world's shortest soundtrack
 

00:01:40.740 --> 00:01:43.310 align:start position:0%
heard the world's shortest soundtrack
working<00:01:41.280><c> memory</c><00:01:41.759><c> has</c><00:01:42.119><c> a</c><00:01:42.420><c> really</c><00:01:42.600><c> short</c><00:01:42.960><c> life</c>

00:01:43.310 --> 00:01:43.320 align:start position:0%
working memory has a really short life
 

00:01:43.320 --> 00:01:46.249 align:start position:0%
working memory has a really short life
span<00:01:43.619><c> it</c><00:01:44.220><c> doesn't</c><00:01:44.520><c> hold</c><00:01:44.759><c> a</c><00:01:45.000><c> lot</c><00:01:45.119><c> of</c><00:01:45.240><c> stuff</c>

00:01:46.249 --> 00:01:46.259 align:start position:0%
span it doesn't hold a lot of stuff
 

00:01:46.259 --> 00:01:49.249 align:start position:0%
span it doesn't hold a lot of stuff
we<00:01:46.799><c> can</c><00:01:47.040><c> only</c><00:01:47.220><c> remember</c><00:01:47.579><c> at</c><00:01:48.060><c> most</c><00:01:48.299><c> seven</c><00:01:48.960><c> plus</c>

00:01:49.249 --> 00:01:49.259 align:start position:0%
we can only remember at most seven plus
 

00:01:49.259 --> 00:01:52.670 align:start position:0%
we can only remember at most seven plus
or<00:01:49.500><c> minus</c><00:01:49.860><c> two</c><00:01:50.159><c> things</c><00:01:50.460><c> for</c><00:01:51.360><c> 15</c><00:01:51.720><c> to</c><00:01:52.079><c> 30</c><00:01:52.320><c> seconds</c>

00:01:52.670 --> 00:01:52.680 align:start position:0%
or minus two things for 15 to 30 seconds
 

00:01:52.680 --> 00:01:55.010 align:start position:0%
or minus two things for 15 to 30 seconds
inside<00:01:53.220><c> working</c><00:01:53.640><c> memory</c>

00:01:55.010 --> 00:01:55.020 align:start position:0%
inside working memory
 

00:01:55.020 --> 00:01:57.770 align:start position:0%
inside working memory
that's<00:01:55.619><c> it</c><00:01:55.860><c> and</c><00:01:56.700><c> then</c><00:01:56.820><c> the</c><00:01:57.119><c> contents</c><00:01:57.600><c> are</c>

00:01:57.770 --> 00:01:57.780 align:start position:0%
that's it and then the contents are
 

00:01:57.780 --> 00:01:59.810 align:start position:0%
that's it and then the contents are
displaced<00:01:58.259><c> by</c><00:01:58.500><c> the</c><00:01:58.740><c> next</c><00:01:58.860><c> piece</c><00:01:59.280><c> of</c><00:01:59.340><c> incoming</c>

00:01:59.810 --> 00:01:59.820 align:start position:0%
displaced by the next piece of incoming
 

00:01:59.820 --> 00:02:00.609 align:start position:0%
displaced by the next piece of incoming
information

00:02:00.609 --> 00:02:00.619 align:start position:0%
information
 

00:02:00.619 --> 00:02:04.130 align:start position:0%
information
life<00:02:01.619><c> keeps</c><00:02:02.040><c> happening</c><00:02:02.540><c> the</c><00:02:03.540><c> next</c><00:02:03.720><c> piece</c><00:02:04.079><c> of</c>

00:02:04.130 --> 00:02:04.140 align:start position:0%
life keeps happening the next piece of
 

00:02:04.140 --> 00:02:06.289 align:start position:0%
life keeps happening the next piece of
data<00:02:04.500><c> enters</c><00:02:04.920><c> your</c><00:02:05.100><c> working</c><00:02:05.280><c> memory</c><00:02:05.759><c> and</c><00:02:06.180><c> it</c>

00:02:06.289 --> 00:02:06.299 align:start position:0%
data enters your working memory and it
 

00:02:06.299 --> 00:02:09.109 align:start position:0%
data enters your working memory and it
elbows<00:02:06.780><c> out</c><00:02:06.899><c> whatever</c><00:02:07.140><c> was</c><00:02:07.439><c> in</c><00:02:07.619><c> there</c><00:02:07.799><c> before</c>

00:02:09.109 --> 00:02:09.119 align:start position:0%
elbows out whatever was in there before
 

00:02:09.119 --> 00:02:11.690 align:start position:0%
elbows out whatever was in there before
but<00:02:09.420><c> wait</c><00:02:09.780><c> if</c><00:02:10.619><c> everything</c><00:02:10.800><c> vanishes</c><00:02:11.520><c> from</c>

00:02:11.690 --> 00:02:11.700 align:start position:0%
but wait if everything vanishes from
 

00:02:11.700 --> 00:02:14.089 align:start position:0%
but wait if everything vanishes from
working<00:02:11.879><c> memory</c><00:02:12.300><c> within</c><00:02:12.660><c> a</c><00:02:12.780><c> few</c><00:02:12.900><c> seconds</c><00:02:13.140><c> how</c>

00:02:14.089 --> 00:02:14.099 align:start position:0%
working memory within a few seconds how
 

00:02:14.099 --> 00:02:15.530 align:start position:0%
working memory within a few seconds how
can<00:02:14.280><c> I</c><00:02:14.459><c> remember</c><00:02:14.580><c> what</c><00:02:14.879><c> I</c><00:02:15.060><c> ate</c><00:02:15.180><c> for</c><00:02:15.360><c> breakfast</c>

00:02:15.530 --> 00:02:15.540 align:start position:0%
can I remember what I ate for breakfast
 

00:02:15.540 --> 00:02:18.229 align:start position:0%
can I remember what I ate for breakfast
this<00:02:16.020><c> morning</c><00:02:16.200><c> the</c><00:02:16.980><c> movie</c><00:02:17.160><c> I</c><00:02:17.459><c> saw</c><00:02:17.700><c> last</c><00:02:18.000><c> night</c>

00:02:18.229 --> 00:02:18.239 align:start position:0%
this morning the movie I saw last night
 

00:02:18.239 --> 00:02:21.770 align:start position:0%
this morning the movie I saw last night
or<00:02:18.840><c> the</c><00:02:19.080><c> vacation</c><00:02:19.379><c> to</c><00:02:19.620><c> Rome</c><00:02:19.920><c> I</c><00:02:20.160><c> took</c><00:02:20.400><c> last</c><00:02:20.640><c> year</c>

00:02:21.770 --> 00:02:21.780 align:start position:0%
or the vacation to Rome I took last year
 

00:02:21.780 --> 00:02:24.410 align:start position:0%
or the vacation to Rome I took last year
your<00:02:22.500><c> working</c><00:02:22.680><c> memory</c><00:02:23.160><c> is</c><00:02:23.580><c> the</c><00:02:23.819><c> gateway</c><00:02:24.180><c> to</c>

00:02:24.410 --> 00:02:24.420 align:start position:0%
your working memory is the gateway to
 

00:02:24.420 --> 00:02:26.350 align:start position:0%
your working memory is the gateway to
memory<00:02:24.780><c> as</c><00:02:25.080><c> most</c><00:02:25.319><c> of</c><00:02:25.500><c> us</c><00:02:25.560><c> think</c><00:02:25.860><c> of</c><00:02:26.040><c> it</c>

00:02:26.350 --> 00:02:26.360 align:start position:0%
memory as most of us think of it
 

00:02:26.360 --> 00:02:29.030 align:start position:0%
memory as most of us think of it
information<00:02:27.360><c> available</c><00:02:28.080><c> in</c><00:02:28.560><c> your</c><00:02:28.739><c> present</c>

00:02:29.030 --> 00:02:29.040 align:start position:0%
information available in your present
 

00:02:29.040 --> 00:02:31.790 align:start position:0%
information available in your present
moment<00:02:29.400><c> that</c><00:02:30.060><c> captures</c><00:02:30.480><c> your</c><00:02:30.780><c> attention</c><00:02:31.140><c> can</c>

00:02:31.790 --> 00:02:31.800 align:start position:0%
moment that captures your attention can
 

00:02:31.800 --> 00:02:34.190 align:start position:0%
moment that captures your attention can
be<00:02:32.040><c> flagged</c><00:02:32.580><c> and</c><00:02:32.819><c> funneled</c><00:02:33.239><c> from</c><00:02:33.540><c> the</c><00:02:33.780><c> tiny</c>

00:02:34.190 --> 00:02:34.200 align:start position:0%
be flagged and funneled from the tiny
 

00:02:34.200 --> 00:02:36.470 align:start position:0%
be flagged and funneled from the tiny
temporary<00:02:34.560><c> space</c><00:02:34.800><c> of</c><00:02:35.099><c> working</c><00:02:35.280><c> memory</c><00:02:35.819><c> and</c>

00:02:36.470 --> 00:02:36.480 align:start position:0%
temporary space of working memory and
 

00:02:36.480 --> 00:02:38.809 align:start position:0%
temporary space of working memory and
sent<00:02:36.660><c> to</c><00:02:36.900><c> your</c><00:02:37.020><c> hippocampus</c>

00:02:38.809 --> 00:02:38.819 align:start position:0%
sent to your hippocampus
 

00:02:38.819 --> 00:02:41.750 align:start position:0%
sent to your hippocampus
there<00:02:39.780><c> it</c><00:02:40.140><c> can</c><00:02:40.319><c> become</c><00:02:40.739><c> linked</c><00:02:41.220><c> into</c><00:02:41.400><c> a</c>

00:02:41.750 --> 00:02:41.760 align:start position:0%
there it can become linked into a
 

00:02:41.760 --> 00:02:44.210 align:start position:0%
there it can become linked into a
long-term<00:02:42.239><c> memory</c><00:02:42.599><c> which</c><00:02:43.560><c> unlike</c><00:02:43.980><c> your</c>

00:02:44.210 --> 00:02:44.220 align:start position:0%
long-term memory which unlike your
 

00:02:44.220 --> 00:02:46.250 align:start position:0%
long-term memory which unlike your
working<00:02:44.400><c> memory</c><00:02:44.940><c> is</c><00:02:45.540><c> thought</c><00:02:45.720><c> to</c><00:02:45.900><c> have</c>

00:02:46.250 --> 00:02:46.260 align:start position:0%
working memory is thought to have
 

00:02:46.260 --> 00:02:50.900 align:start position:0%
working memory is thought to have
Limitless<00:02:46.920><c> duration</c><00:02:47.519><c> and</c><00:02:48.360><c> capacity</c>


```

# package.json

```json
{
  "name": "merchantai-bot",
  "version": "1.0.0",
  "description": "MerchantAI Telegram bot for marketplace card generation",
  "main": "dist/index.js",
  "scripts": {
    "build": "tsc",
    "start": "node dist/index.js",
    "dev": "tsx watch src/index.ts",
    "typecheck": "tsc --noEmit"
  },
  "dependencies": {
    "@google/genai": "^1.34.0",
    "@grammyjs/runner": "^2.0.3",
    "@supabase/supabase-js": "^2.39.0",
    "axios": "^1.6.2",
    "dotenv": "^16.3.1",
    "express": "^4.18.2",
    "grammy": "^1.19.2",
    "openai": "^4.24.0",
    "uuid": "^9.0.1"
  },
  "devDependencies": {
    "@types/express": "^4.17.21",
    "@types/node": "^20.10.4",
    "@types/uuid": "^9.0.7",
    "tsx": "^4.6.2",
    "typescript": "^5.3.3"
  },
  "engines": {
    "node": ">=18.0.0"
  }
}

```

# README.md

```md
# Merchant AI - Telegram Bot

A Telegram bot that helps sellers and designers create info cards for marketplaces.

## Setup

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Create a `.env` file and add your bot token:
   \`\`\`
   BOT_TOKEN=your_telegram_bot_token_here
   \`\`\`

3. Run in development mode:
   \`\`\`bash
   npm run dev
   \`\`\`

4. Build for production:
   \`\`\`bash
   npm run build
   npm start
   \`\`\`

## Get Bot Token

1. Open Telegram and search for @BotFather
2. Send `/newbot` command
3. Follow instructions to create your bot
4. Copy the token and add it to `.env` file

## Commands

- `/start` - Start the bot
- `/create` - Create a new product card
- `/help` - Show help information

```

# src/config.ts

```ts
import dotenv from 'dotenv';

dotenv.config();

interface Config {
  botToken: string;
  notificationBotToken: string;
  notificationChatIds: number[];
  supabase: {
    url: string;
    anonKey: string;
    serviceRoleKey: string;
  };
  yookassa: {
    shopId: string;
    secretKey: string;
  };
  n8n: {
    webhookUrl: string;
  };
  openai: {
    apiKey: string;
    model: string;
  };
  gemini: {
    apiKey: string;
    model: string;
  };
  media: {
    introVideoFileId: string | null;
  };
  nodeEnv: string;
  port: number;
}

const getEnvVar = (key: string): string => {
  const value = process.env[key];
  if (!value) {
    throw new Error(`Environment variable ${key} is not set`);
  }
  return value;
};

const getOptionalEnvVar = (key: string, defaultValue = ''): string => {
  return process.env[key] || defaultValue;
};

export const config: Config = {
  botToken: getEnvVar('BOT_TOKEN'),
  notificationBotToken: getOptionalEnvVar('NOTIFICATION_BOT_TOKEN'),
  notificationChatIds: process.env.NOTIFICATION_CHAT_IDS?.split(',').map(Number).filter(Boolean) || [],
  supabase: {
    url: getEnvVar('SUPABASE_URL'),
    anonKey: getEnvVar('SUPABASE_ANON_KEY'),
    serviceRoleKey: getEnvVar('SUPABASE_SERVICE_ROLE_KEY'),
  },
  yookassa: {
    shopId: getEnvVar('YOOKASSA_SHOP_ID'),
    secretKey: getEnvVar('YOOKASSA_SECRET_KEY'),
  },
  n8n: {
    webhookUrl: getOptionalEnvVar('N8N_WEBHOOK_URL'),
  },
  openai: {
    apiKey: getEnvVar('OPENAI_API_KEY'),
    model: getOptionalEnvVar('OPENAI_MODEL', 'gpt-4o'),
  },
  gemini: {
    apiKey: getEnvVar('GEMINI_API_KEY'),
    model: getOptionalEnvVar('GEMINI_MODEL', 'gemini-2.0-flash-exp-image-generation'),
  },
  media: {
    introVideoFileId: getOptionalEnvVar('INTRO_VIDEO_FILE_ID') || null,
  },
  nodeEnv: process.env.NODE_ENV || 'development',
  port: parseInt(process.env.PORT || '3000', 10),
};
```

# src/constants/prompts.ts

```ts
// Prompt templates for AI services
// These can be overridden from database via admin panel

export interface PromptTemplate {
  id: string;
  name: string;
  description: string;
  template: string;
  variables: string[];
  category: 'card_generation' | 'image_edit' | 'photo_session' | 'other';
  isSystem: boolean;
}

// ============================================
// CARD GENERATION PROMPTS
// ============================================

export const FIRST_SLIDE_SYSTEM_PROMPT = `You're a professional prompt writer for Gemini image generation.

Your task is to create a prompt for generating a premium e-commerce marketplace card/infographic.

You receive:
1. A user request describing what they want
2. Multiple input images with user's notes explaining how each should be used

OUTPUT RULES:
1. Write ONLY the prompt text for image generation
2. Prompt in ENGLISH, but any text on the card should be in RUSSIAN
3. Reference images by number: "From IMAGE 1...", "Use IMAGE 2 as..."
4. Be extremely detailed about composition, lighting, layout
5. Follow user's instructions for each image precisely

PROMPT STRUCTURE:
Ultra-high quality commercial product card/infographic.

IMAGE USAGE:
[describe how each image should be used based on user notes]

COMPOSITION & LAYOUT:
[detailed description]

BACKGROUND & ENVIRONMENT:
[based on user instructions]

TYPOGRAPHY (RUSSIAN text if needed):
[headlines, badges, callouts]

LIGHTING & ATMOSPHERE:
[detailed description]

QUALITY:
- Ultra-high resolution, photorealistic
- Premium commercial aesthetic

NEGATIVE PROMPT:
[unwanted elements]`;

export const NEXT_SLIDE_SYSTEM_PROMPT = `You're creating a CAROUSEL SLIDE (NOT the first slide).

CRITICAL REQUIREMENTS:
1. Must look like same carousel as slide 1
2. EXACT same visual style, colors, typography, design language
3. Only CONTENT changes based on user request

OUTPUT: Write ONLY the prompt text.
English prompt, Russian text on card if needed.
Emphasize style consistency.

PROMPT STRUCTURE:
Carousel slide - MATCH SLIDE 1 STYLE EXACTLY.

STYLE CONSISTENCY:
- Same colors, typography, badges as slide 1
- Same lighting mood, aesthetic

IMAGE USAGE:
[how each image is used based on user notes]

THIS SLIDE SHOWS:
[user's request]

COMPOSITION:
[layout for this slide]

NEGATIVE PROMPT:
[unwanted, style inconsistencies]`;

export const FIRST_SLIDE_USER_PROMPT = `USER REQUEST:
{{userPrompt}}

INPUT IMAGES ({{imageCount}} total):
{{imageContext}}

Generate a professional e-commerce marketplace card using these images according to user's notes.`;

export const NEXT_SLIDE_USER_PROMPT = `CAROUSEL SLIDE {{slideNumber}} - MUST MATCH SLIDE 1 STYLE

USER REQUEST:
{{userPrompt}}

INPUT IMAGES ({{imageCount}} total):
{{imageContext}}
{{styleReference}}
{{previousSlides}}

Maintain EXACT visual consistency with slide 1.`;

// ============================================
// IMAGE EDIT PROMPTS
// ============================================

export const IMAGE_EDIT_SYSTEM_PROMPT = `You're a professional image editor.

Modify the provided image according to user instructions.

RULES:
1. Preserve the main subject unless asked to change
2. Make changes look natural and seamless
3. Maintain image quality
4. Follow user instructions precisely

OUTPUT: Write a detailed prompt describing exactly what changes to make.`;

export const IMAGE_EDIT_USER_PROMPT = `IMAGE: Attached

USER REQUEST:
{{userPrompt}}

Describe the modifications to make.`;

// ============================================
// CARD EDIT PROMPTS (for editing generated cards)
// ============================================

const CARD_EDIT_SYSTEM_PROMPT = `You're editing an existing e-commerce product card.

You receive:
1. IMAGE 1: Original product photo (DO NOT change the product itself)
2. IMAGE 2: Current generated card that needs editing
3. User's edit request

CRITICAL RULES:
1. Keep the PRODUCT exactly as it appears - never modify the product
2. Apply user's requested changes to the CARD design
3. Maintain overall card quality and style
4. If user asks to change text, colors, layout - do that while keeping product intact

OUTPUT: Write a detailed prompt for image generation that edits the card according to user request.

PROMPT STRUCTURE:
Edit the product card (IMAGE 2) while keeping the product from IMAGE 1 unchanged.

CHANGES TO MAKE:
[user's requested changes]

PRESERVE:
- The product appearance from IMAGE 1
- Overall commercial quality

MODIFY:
[specific elements to change based on user request]`;

export const CARD_EDIT_USER_PROMPT = `EDIT REQUEST:
{{userPrompt}}

INPUT IMAGES:
IMAGE 1: Original product photo - KEEP PRODUCT UNCHANGED
IMAGE 2: Current card to edit - APPLY CHANGES HERE

Edit the card according to user's request while preserving the product.`;

// Also export for use in services
export { CARD_EDIT_SYSTEM_PROMPT, CARD_EDIT_USER_PROMPT as CARD_EDIT_USER };

// ============================================
// DEFAULT TEMPLATES (for database seeding)
// ============================================

export const DEFAULT_PROMPT_TEMPLATES: PromptTemplate[] = [
  {
    id: 'first_slide_system',
    name: 'First Slide - System Prompt',
    description: 'System prompt for generating the first slide',
    template: FIRST_SLIDE_SYSTEM_PROMPT,
    variables: [],
    category: 'card_generation',
    isSystem: true,
  },
  {
    id: 'first_slide_user',
    name: 'First Slide - User Prompt',
    description: 'User prompt template for the first slide',
    template: FIRST_SLIDE_USER_PROMPT,
    variables: ['userPrompt', 'imageCount', 'imageContext'],
    category: 'card_generation',
    isSystem: false,
  },
  {
    id: 'next_slide_system',
    name: 'Next Slide - System Prompt',
    description: 'System prompt for carousel slides 2+',
    template: NEXT_SLIDE_SYSTEM_PROMPT,
    variables: [],
    category: 'card_generation',
    isSystem: true,
  },
  {
    id: 'next_slide_user',
    name: 'Next Slide - User Prompt',
    description: 'User prompt template for slides 2+',
    template: NEXT_SLIDE_USER_PROMPT,
    variables: ['slideNumber', 'userPrompt', 'imageCount', 'imageContext', 'styleReference', 'previousSlides'],
    category: 'card_generation',
    isSystem: false,
  },
  {
    id: 'card_edit_system',
    name: 'Card Edit - System Prompt',
    description: 'System prompt for editing generated cards',
    template: CARD_EDIT_SYSTEM_PROMPT,
    variables: [],
    category: 'image_edit',
    isSystem: true,
  },
  {
    id: 'card_edit_user',
    name: 'Card Edit - User Prompt',
    description: 'User prompt template for card editing',
    template: CARD_EDIT_USER_PROMPT,
    variables: ['userPrompt'],
    category: 'image_edit',
    isSystem: false,
  },
  {
    id: 'image_edit_system',
    name: 'Image Edit - System Prompt',
    description: 'System prompt for general image editing',
    template: IMAGE_EDIT_SYSTEM_PROMPT,
    variables: [],
    category: 'image_edit',
    isSystem: true,
  },
  {
    id: 'image_edit_user',
    name: 'Image Edit - User Prompt',
    description: 'User prompt template for general image editing',
    template: IMAGE_EDIT_USER_PROMPT,
    variables: ['userPrompt'],
    category: 'image_edit',
    isSystem: false,
  },
];

// ============================================
// TEMPLATE RENDERING
// ============================================

/**
 * Render a template with variables
 */
export function renderTemplate(template: string, variables: Record<string, string | number>): string {
  let result = template;
  
  for (const [key, value] of Object.entries(variables)) {
    const regex = new RegExp(`{{${key}}}`, 'g');
    result = result.replace(regex, String(value));
  }
  
  return result;
}

/**
 * Build image context from user descriptions ONLY
 * No fixed role descriptions - just what user provided as captions
 */
export function buildImageContext(images: Array<{ description?: string }>): string {
  let context = '';
  
  images.forEach((img, idx) => {
    context += `IMAGE ${idx + 1}`;
    if (img.description) {
      context += `: ${img.description}`;
    }
    context += '\n';
  });
  
  return context;
}
```

# src/constants/texts.ts

```ts
// Custom Emoji IDs - Get these by sending custom emoji to @RawDataBot in Telegram
// Replace with your own emoji IDs
export const CUSTOM_EMOJI = {
  SUCCESS: '5368324170671202286', // Example: green checkmark
  FIRE: '5368324170671202286',    // Example: fire emoji
  SPARKLES: '5368324170671202286', // Example: sparkles
  GIFT: '5368324170671202286',     // Example: gift box
};

// Helper to create custom emoji tag
export const customEmoji = (id: string, fallback: string) => 
  `<tg-emoji emoji-id="${id}">${fallback}</tg-emoji>`;

export const TEXTS = {
  // Intro for new users (shown only once)
  INTRO: `👋 <b>Добро пожаловать в MerchantAI!</b>

Это ИИ-инструмент для создания продающих карточек товаров для маркетплейсов.

<b>Что умеет бот:</b>
• 🎨 Генерация инфографики с нуля
• ✏️ Редактирование готовых изображений
• 📸 AI-фотосессия товара

<b>Как начать:</b>
1. Загрузите фото товара
2. Опишите желаемый результат
3. Получите готовую карточку за 30-60 сек

🎁 <b>Вам начислено 12 бесплатных токенов</b> — это 3 генерации карточек для теста.

Рекомендуем прочитать гайд, чтобы получить максимум от сервиса 👇`,

  // Main Menu
  WELCOME: `<b>MerchantAI здесь.</b>

Сервис для дизайнеров карточек маркетплейсов, которые работают в конкурентном рынке и хотят выжать максимум из него.

Что внутри:

<blockquote>- ИИ-генерация карточек товара под маркетплейсы
- ИИ-фотосессия для товара без студий и подрядчиков
- ускорение работы над карточкой в разы
- возможность брать больше заказов без выгорания
- формат токенов: покупаешь и используешь, оплата в рублях с любых банков</blockquote>

<b>MerchantAI</b> помогает делать качественные, продающие карточки быстрее и дешевле - без поиска референсов, бесконечных правок, избегая горящих дедлайнов.

🎁 В честь праздников даем бесплатные токены новым пользователям.

Запускай и пробуй прямо сейчас <tg-emoji emoji-id="5386810955453728741">👇</tg-emoji>`,

  // Buttons
  BTN_IMAGE_CARD: '🎨 Создать карточку',
  BTN_IMAGE_EDIT: '✏️ Изменить изображение',
  BTN_PHOTO_SESSION: '📸 Фотосессия товара',
  BTN_MY_PROFILE: '👤 Мой профиль',
  BTN_SUPPORT: '💬 Поддержка',
  BTN_BUY_CREDITS: '💳 Купить кредиты',
  BTN_BACK: '◀️ Назад',
  BTN_MAIN_MENU: '🏠 Главное меню',
  BTN_CANCEL: '❌ Отменить',
  BTN_CONFIRM: '✅ Подтвердить',

  // Image Card - New Flow
  IMAGE_CARD_TITLE: '🎨 Создание карточки товара',
  IMAGE_CARD_SEND_PHOTO: `📤 Отправьте фото товара

Фото будет использовано для создания карточки.
После отправки фото вы сможете добавить описание.`,
  IMAGE_CARD_PHOTO_RECEIVED: `✅ Фото получено!

Теперь отправьте текстовое описание/промпт для карточки.

<b>Обязательно укажите:</b>
• Название продукта (пример: триммер Braun series 7)
• Общий стиль и желаемый результат

<i>Опционально можете указать пожелания:</i>
• Отправьте текста для карточки
• Опишите композицию
• Элементы дизайна
• И т.д.
`,
  IMAGE_CARD_WAIT: '⏳ Генерирую карточку...\n\nЭто займёт 30-60 секунд.',
  IMAGE_CARD_READY: '<tg-emoji emoji-id="5199610880257435665">✅</tg-emoji> Ваша карточка готова!',
  IMAGE_CARD_SESSION_OPTIONS: `Что дальше?

• Чтобы изменить эту карточку, отправьте промпт с изменениями
• Или вернитесь в главное меню`,
  IMAGE_CARD_ERROR: '❌ Произошла ошибка при создании карточки. Попробуйте ещё раз или обратитесь в поддержку.',
  IMAGE_CARD_NO_CREDITS: `⚠️ <b>Недостаточно токенов</b>

Для генерации карточки нужно 4 токена.

Выберите подходящий пакет 👇`,

  // Image Edit - New Feature
  IMAGE_EDIT_TITLE: '✏️ Редактирование изображения',
  IMAGE_EDIT_SEND_PHOTO: `📤 Отправьте изображение для редактирования

После отправки фото вы сможете описать желаемые изменения.`,
  IMAGE_EDIT_PHOTO_RECEIVED: `✅ Изображение получено!

Теперь отправьте описание того, что нужно изменить:
• Изменить фон
• Добавить элементы
• Улучшить качество
• И т.д.`,
  IMAGE_EDIT_WAIT: '⏳ Обрабатываю изменения...\n\nЭто займёт 30-60 секунд.',
  IMAGE_EDIT_READY: '✅ Изображение обработано!',
  IMAGE_EDIT_SESSION_OPTIONS: `Что дальше?

• Отправьте новый промпт для обработки
• Или вернитесь в главное меню`,
  IMAGE_EDIT_ERROR: '❌ Произошла ошибка при обработке изображения.',
  IMAGE_EDIT_NEED_PROMPT: '⚠️ Пожалуйста, опишите, что нужно изменить в изображении.',
  IMAGE_EDIT_NO_CREDITS: `⚠️ <b>Недостаточно токенов</b>

Для редактирования нужно 2 токена.

Выберите подходящий пакет 👇`,

  // Photo Session
  PHOTO_SESSION_TITLE: '📸 Фотосессия товара',
  PHOTO_SESSION_DESC: `Создайте серию профессиональных фотографий вашего товара!

Я создам для вас:
• 5-10 изображений в разных ракурсах
• Разные фоны и стили
• Оптимизацию для маркетплейсов

Загрузите фото товара и опишите желаемый результат.`,
  PHOTO_SESSION_UPLOAD: '📤 Загрузите основное фото товара',
  PHOTO_SESSION_WAIT: '⏳ Создаём фотосессию...\n\nЭто займёт 2-3 минуты.',
  PHOTO_SESSION_READY: '✅ Фотосессия готова! Вот ваши изображения:',
  PHOTO_SESSION_ERROR: '❌ Произошла ошибка при создании фотосессии.',

  // Profile
  PROFILE_TITLE: '👤 Мой профиль',
  PROFILE_INFO: `📊 Информация о вашем аккаунте:

👤 Имя: {name}
📅 Дата регистрации: {date}
💳 Кредитов: {credits}
🎨 Создано карточек: {cardsCreated}

Хотите пополнить кредиты?`,
  PROFILE_NO_PLAN: 'Бесплатный',
  PROFILE_BTN_BUY_CREDITS: '💳 Купить кредиты',
  PROFILE_BTN_HISTORY: '📜 История генераций',

  // Support
  SUPPORT_TITLE: '💬 Поддержка',
  SUPPORT_DESC: `Здравствуйте! Чем мы можем вам помочь?

🔹 Часто задаваемые вопросы:
• Как создать карточку?
• Сколько стоят кредиты?
• Как работает фотосессия?
• Технические проблемы

Вы также можете написать нам напрямую:`,
  SUPPORT_CONTACT: '💬 Telegram: @odissey_wrk',
  SUPPORT_BTN_FAQ: '❓ FAQ',
  SUPPORT_BTN_CONTACT: '📧 Связаться',

  // Buy Credits - One-time purchases
  BUY_CREDITS_TITLE: '💳 Покупка кредитов',
  BUY_CREDITS_DESC: `Выберите пакет кредитов:

💡 1 кредит = 1 генерация карточки`,
  BUY_CREDITS_PAYMENT_WAIT: '⏳ Переходим к оплате...',
  BUY_CREDITS_PAYMENT_SUCCESS: '✅ Оплата прошла успешно! Кредиты зачислены.',
  BUY_CREDITS_PAYMENT_CANCELLED: '❌ Оплата отменена.',

  // Errors
  ERROR_GENERAL: '❌ Произошла ошибка. Пожалуйста, попробуйте ещё раз.',
  ERROR_NO_PHOTO: '⚠️ Пожалуйста, отправьте фотографию.',
  ERROR_INVALID_FORMAT: '⚠️ Неверный формат данных.',
  ERROR_TRY_AGAIN: '\n\nПопробуйте ещё раз или обратитесь в поддержку.',

  // Processing
  PROCESSING: '⏳ Обрабатываю ваш запрос...',
  DELETING: '🗑️ Удаляю...',
  GENERATING: '✨ Генерирую...',
};

// Inline keyboard callback data
export const CALLBACKS = {
  // Main menu
  MAIN_MENU: 'main_menu',
  CONTINUE_TO_MENU: 'continue_to_menu',
  IMAGE_CARD: 'image_card',
  IMAGE_EDIT: 'image_edit',
  PHOTO_SESSION: 'photo_session',
  PROFILE: 'profile',
  SUPPORT: 'support',
  BUY_CREDITS: 'buy_credits',

  // Image generation session
  REGENERATE: 'regenerate',
  BACK_TO_MENU: 'back_to_menu',

  // Image edit session
  EDIT_REGENERATE: 'edit_regenerate',

  // Profile
  PROFILE_BUY_CREDITS: 'profile_buy_credits',
  PROFILE_HISTORY: 'profile_history',

  // Support
  SUPPORT_FAQ: 'support_faq',
  SUPPORT_CONTACT: 'support_contact',

  // Credit packages
  BUY_STARTER: 'buy_starter',
  BUY_PRO: 'buy_pro',
  BUY_BIG: 'buy_big',
  BUY_ENTERPRISE: 'buy_enterprise',
  PRICE_EXPLAIN: 'price_explain_start',

  // Payment
  PAYMENT_CHECK: 'payment_check',
  PAYMENT_CANCEL: 'payment_cancel',

  // Carousel
  CAROUSEL_REGENERATE: 'carousel_regenerate',
  CAROUSEL_NEXT_SLIDE: 'carousel_next_slide',
  CAROUSEL_FINISH: 'carousel_finish',
  CAROUSEL_IMAGES_DONE: 'carousel_images_done',
} as const;
```

# src/handlers/buyCredits.ts

```ts
import { MyContext, CREDIT_PACKAGES } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { yookassa } from '../services/yookassa';
import { notificationBot } from '../services/notificationBot';

export async function handleBuyCredits(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  const starter = CREDIT_PACKAGES.starter;
  const pro = CREDIT_PACKAGES.pro;
  const big = CREDIT_PACKAGES.big;


    const creditsText = `<b>Тарифы</b>

⭐ <b>${starter.name}</b> — <s>${starter.price + 300} ₽</s> <b>${starter.price} ₽</b> 
${starter.cardsCount} генераций · ~${Math.round(starter.price / starter.cardsCount)}₽ / генерация  
Базовый функционал для знакомства с ботом.
• Генерация карточек  
• Редактирование результатов   


✅ <b>${pro.name} — популярный</b> — <s>${pro.price + 400} ₽</s> <b>${pro.price} ₽</b>   
${pro.cardsCount} генераций · ~${Math.round(pro.price / pro.cardsCount)}₽ / генерация  
Для тех, кто хочет получать <b>максимум качества</b>.
• Приоритетная поддержка  
• Лучшее соотношение кол-во/цена


💎 <b>${big.name}</b> — <s>${big.price + 800} ₽</s> <b>${big.price} ₽</b>   
${big.cardsCount} генераций · ~29₽ / генерация  
• Всё то же, что в <b>${pro.name}</b>  
• На <b>17%</b> выгоднее, чем ${pro.name}  
• В <b>4 раза</b> больше генераций — для тех, кому важен объём  


<b>Enterprise</b> — от <b>10 000 ₽</b>  
Индивидуальные условия под большие объёмы.

<blockquote>
<b>Как считаются кредиты</b>  
<i>4 токена = 1 генерация</i>
</blockquote>`;


  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(creditsText, {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.creditPackages(),
      });
    } catch {
      await ctx.reply(creditsText, {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.creditPackages(),
      });
    }
  } else {
    await ctx.reply(creditsText, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
  }
}

export async function handleCreditPackageSelection(
  ctx: MyContext,
  packageId: string
): Promise<void> {
  const creditPackage = CREDIT_PACKAGES[packageId];

  if (!creditPackage) {
    await ctx.answerCallbackQuery({ text: 'Неверный пакет', show_alert: true });
    return;
  }

  await ctx.answerCallbackQuery();

  // Handle Enterprise separately - redirect to support
  if (packageId === 'enterprise') {
    if (ctx.callbackQuery?.message) {
      try {
        await ctx.api.deleteMessage(ctx.chat!.id, ctx.callbackQuery.message.message_id);
      } catch {}
    }

    const enterpriseText = `🚀 <b>ENTERPRISE тариф</b>

Индивидуальные условия для вашего бизнеса:

✅ Персональные лимиты токенов
✅ API доступ и интеграции
✅ Приоритетная поддержка
✅ Персональный менеджер
✅ Лучшие цены

💬 Для оформления напишите нам:
@leomishinbiz`;

    await ctx.reply(enterpriseText, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.backToMenu(),
    });
    return;
  }

  // Get user
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  try {
    // Delete the package selection message
    if (ctx.callbackQuery?.message) {
      await ctx.api.deleteMessage(ctx.chat!.id, ctx.callbackQuery.message.message_id);
    }

    // Send processing message
    await MessageManager.sendProcessing(ctx, TEXTS.BUY_CREDITS_PAYMENT_WAIT);

    // Create payment in database
    const payment = await supabase.createPayment(
      user.id,
      packageId,
      creditPackage.price,
      'RUB'
    );

    // Create payment with YooKassa
    const yooPayment = await yookassa.createPayment({
      amount: creditPackage.price,
      currency: 'RUB',
      description: `${creditPackage.emoji} ${creditPackage.name} — ~${creditPackage.cardsCount} карточек`,
      returnUrl: `https://t.me/${ctx.me.username}`,
      metadata: {
        payment_id: payment.id,
        user_id: user.id,
        package_id: packageId,
        credits: creditPackage.credits,
      },
    });

    // Update payment with YooKassa ID
    await supabase.updatePayment(payment.id, {
      yookassa_payment_id: yooPayment.id,
    });

    // Delete processing message
    await MessageManager.deleteProcessing(ctx);

    // Send payment link - clean design
    const paymentText = `<b>Оплата</b>

${creditPackage.name} — ${creditPackage.price} ₽
${creditPackage.credits} токенов · ${creditPackage.cardsCount} генераций

1. Нажмите «Оплатить»
2. Завершите оплату
3. Нажмите «Проверить оплату»`;

    await ctx.reply(paymentText, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.paymentConfirm(yooPayment.confirmation.confirmation_url),
    });

    // Store payment ID in session for checking
    ctx.session.tempData = {
      paymentId: payment.id,
      yooPaymentId: yooPayment.id,
      packageId: packageId,
      credits: creditPackage.credits,
    };
  } catch (error) {
    console.error('Payment creation error:', error);

    await MessageManager.deleteProcessing(ctx);

    await ctx.reply('❌ Произошла ошибка при создании платежа. Попробуйте ещё раз.', {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
  }
}

export async function handlePaymentCheck(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const paymentData = ctx.session.tempData;

  if (!paymentData?.paymentId || !paymentData?.yooPaymentId) {
    await ctx.reply('❌ Информация о платеже не найдена', {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
    return;
  }

  try {
    // Check payment status with YooKassa
    const yooPayment = await yookassa.getPayment(paymentData.yooPaymentId);

    if (yookassa.isPaymentSucceeded(yooPayment)) {
      // Get user
      const user = await supabase.getUser(ctx.from!.id);
      if (!user) {
        await ctx.reply(TEXTS.ERROR_GENERAL);
        return;
      }

      const creditsToAdd = paymentData.credits || 0;

      // Update payment status
      await supabase.updatePayment(paymentData.paymentId, {
        status: 'succeeded',
      });

      // Add credits to user
      await supabase.updateUserCredits(user.id, creditsToAdd);

      // Send notification about purchase
      const creditPackage = CREDIT_PACKAGES[paymentData.packageId];
      await notificationBot.notifyPurchase(
        user.id,
        ctx.from?.username,
        creditPackage?.name || paymentData.packageId,
        creditsToAdd,
        creditPackage?.price || 0,
        'RUB'
      );

      // Delete payment message
      if (ctx.callbackQuery?.message) {
        await ctx.api.deleteMessage(ctx.chat!.id, ctx.callbackQuery.message.message_id);
      }

      // Send success message
      await ctx.reply(
        `${TEXTS.BUY_CREDITS_PAYMENT_SUCCESS}

🎉 Зачислено кредитов: ${creditsToAdd}
💰 Всего кредитов: ${user.credits + creditsToAdd}`,
        {
          reply_markup: KeyboardBuilder.mainMenu(),
        }
      );

      // Clear temp data
      ctx.session.tempData = {};
    } else if (yookassa.isPaymentPending(yooPayment)) {
      await ctx.answerCallbackQuery({
        text: '⏳ Платёж ещё обрабатывается. Попробуйте через минуту.',
        show_alert: true,
      });
    } else {
      await ctx.answerCallbackQuery({
        text: '❌ Платёж не найден или отменён',
        show_alert: true,
      });
    }
  } catch (error) {
    console.error('Payment check error:', error);
    await ctx.reply('❌ Ошибка проверки платежа. Обратитесь в поддержку.', {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
  }
}

export async function handlePaymentCancel(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const paymentData = ctx.session.tempData;

  if (paymentData?.paymentId) {
    await supabase.updatePayment(paymentData.paymentId, {
      status: 'cancelled',
    });
  }

  // Delete payment message
  if (ctx.callbackQuery?.message) {
    await ctx.api.deleteMessage(ctx.chat!.id, ctx.callbackQuery.message.message_id);
  }

  await ctx.reply(TEXTS.BUY_CREDITS_PAYMENT_CANCELLED, {
    reply_markup: KeyboardBuilder.mainMenu(),
  });

  // Clear temp data
  ctx.session.tempData = {};
}
```

# src/handlers/carousel.ts

```ts
import { MyContext, ROUTES, CarouselSlide, ImageInput } from '../types';
import { TEXTS, CALLBACKS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { cardGenerator } from '../services/cardGenerator';
import { InputFile, InlineKeyboard } from 'grammy';
import { v4 as uuidv4 } from 'uuid';

const CARD_GENERATION_COST = 4; // Credits per card
const MAX_INPUT_IMAGES = 8;

// ============================================
// CAROUSEL KEYBOARDS
// ============================================

function getCarouselSessionKeyboard(slideNumber: number): InlineKeyboard {
  const keyboard = new InlineKeyboard();
  
  if (slideNumber === 1) {
    keyboard
      .text('🔄 Регенерировать', CALLBACKS.CAROUSEL_REGENERATE)
      .row()
      .text('➡️ Следующий слайд', CALLBACKS.CAROUSEL_NEXT_SLIDE)
      .row()
      .text('✅ Завершить (1 слайд)', CALLBACKS.CAROUSEL_FINISH)
      .row()
      .text('🏠 Выход в меню', CALLBACKS.BACK_TO_MENU);
  } else {
    keyboard
      .text('🔄 Регенерировать', CALLBACKS.CAROUSEL_REGENERATE)
      .row()
      .text('➡️ Следующий слайд', CALLBACKS.CAROUSEL_NEXT_SLIDE)
      .row()
      .text(`✅ Завершить (${slideNumber} слайд${getSlideWord(slideNumber)})`, CALLBACKS.CAROUSEL_FINISH)
      .row()
      .text('🏠 Выход в меню', CALLBACKS.BACK_TO_MENU);
  }
  
  return keyboard;
}

function getImageCollectionKeyboard(imageCount: number): InlineKeyboard {
  const keyboard = new InlineKeyboard();
  
  if (imageCount > 0) {
    keyboard
      .text(`✅ Готово (${imageCount} фото)`, CALLBACKS.CAROUSEL_IMAGES_DONE)
      .row();
  }
  
  keyboard.text('🏠 Отмена', CALLBACKS.BACK_TO_MENU);
  
  return keyboard;
}

function getSlideWord(count: number): string {
  if (count === 1) return '';
  if (count >= 2 && count <= 4) return 'а';
  return 'ов';
}

// ============================================
// INITIALIZATION
// ============================================

/**
 * Start carousel generation flow
 * Entry point from main menu -> "Создать карточку"
 */
export async function handleCarouselStart(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  // Initialize new carousel session
  ctx.session.currentRoute = ROUTES.CAROUSEL_WAITING_PHOTO;
  ctx.session.carouselSession = {
    sessionId: uuidv4(),
    inputImages: [],
    originalImageUrl: '',
    currentSlideNumber: 1,
    slides: [],
    generationCount: 0,
    isCollectingImages: true,
    collectedImagesCount: 0,
  };

  const text = `🎨 <b>Создание карточки / карусели</b>

📤 <b>Загрузите изображения</b> (до ${MAX_INPUT_IMAGES} штук):

<b>Обязательно:</b>
• 📦 Фото товара — основа для карточки

<b>Опционально:</b>
• 🎨 Референс стиля — если хотите похожий дизайн
• 🖼 Примеры инфографики — для вдохновения
• 🏷 Логотип бренда
• 🌅 Референс фона

<i>Подсказка: добавьте подпись к фото, чтобы указать его роль:
"товар", "стиль", "фон", "лого", "пример"</i>

Отправьте фото по одному или несколько сразу 👇`;

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(text, {
        parse_mode: 'HTML',
        reply_markup: getImageCollectionKeyboard(0),
      });
    } catch {
      await ctx.reply(text, {
        parse_mode: 'HTML',
        reply_markup: getImageCollectionKeyboard(0),
      });
    }
  } else {
    await ctx.reply(text, {
      parse_mode: 'HTML',
      reply_markup: getImageCollectionKeyboard(0),
    });
  }
}

// ============================================
// PHOTO HANDLING (MULTI-IMAGE)
// ============================================

/**
 * Handle photo upload for carousel (supports multiple images)
 */
export async function handleCarouselPhoto(ctx: MyContext): Promise<void> {
  const photo = ctx.message?.photo;
  if (!photo || photo.length === 0) {
    await ctx.reply('⚠️ Пожалуйста, отправьте фото.');
    return;
  }

  // Initialize session if needed
  if (!ctx.session.carouselSession) {
    ctx.session.carouselSession = {
      sessionId: uuidv4(),
      inputImages: [],
      originalImageUrl: '',
      currentSlideNumber: 1,
      slides: [],
      generationCount: 0,
      isCollectingImages: true,
      collectedImagesCount: 0,
    };
  }

  const session = ctx.session.carouselSession;

  // Check max images limit
  if (session.inputImages.length >= MAX_INPUT_IMAGES) {
    await ctx.reply(`⚠️ Максимум ${MAX_INPUT_IMAGES} изображений. Нажмите "Готово" чтобы продолжить.`, {
      reply_markup: getImageCollectionKeyboard(session.inputImages.length),
    });
    return;
  }

  // Get the largest photo
  const largestPhoto = photo[photo.length - 1];
  const file = await ctx.api.getFile(largestPhoto.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;

  // Get user's caption as description
  const caption = ctx.message.caption;
  const imageIndex = session.inputImages.length;

  // Add to input images
  const imageInput: ImageInput = {
    url: photoUrl,
    fileId: largestPhoto.file_id,
    description: caption || undefined,
    index: imageIndex + 1,
  };
  session.inputImages.push(imageInput);
  session.collectedImagesCount = session.inputImages.length;

  // Set original image URL if this is the first image
  if (!session.originalImageUrl) {
    session.originalImageUrl = photoUrl;
    session.originalImageFileId = largestPhoto.file_id;
  }

  // Show confirmation with caption preview
  let confirmText = `📷 Фото ${session.inputImages.length}/${MAX_INPUT_IMAGES} добавлено`;
  if (caption) {
    confirmText += `\n📝 <i>${caption.substring(0, 50)}${caption.length > 50 ? '...' : ''}</i>`;
  }
  confirmText += `\n\nОтправьте ещё фото или нажмите "Готово"`;

  await ctx.reply(confirmText, {
    parse_mode: 'HTML',
    reply_markup: getImageCollectionKeyboard(session.inputImages.length),
  });
}

/**
 * Handle "Images Done" - proceed to prompt
 */
export async function handleCarouselImagesDone(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.carouselSession;
  
  if (!session || session.inputImages.length === 0) {
    await ctx.reply('⚠️ Сначала отправьте хотя бы одно фото товара.', {
      reply_markup: getImageCollectionKeyboard(0),
    });
    return;
  }

  // Set first image URL as original if not set
  if (!session.originalImageUrl) {
    session.originalImageUrl = session.inputImages[0].url;
    session.originalImageFileId = session.inputImages[0].fileId;
  }

  session.isCollectingImages = false;
  ctx.session.currentRoute = ROUTES.CAROUSEL_WAITING_PROMPT;

  // Build images summary from user descriptions
  const imagesSummary = session.inputImages.map((img, i) => {
    const desc = img.description 
      ? img.description.substring(0, 40) + (img.description.length > 40 ? '...' : '')
      : '(без описания)';
    return `${i + 1}. 📷 ${desc}`;
  }).join('\n');

  await ctx.reply(
    `✅ <b>Загружено ${session.inputImages.length} изображений:</b>\n\n${imagesSummary}\n\n` +
    `Теперь отправьте <b>текстовое описание/промпт</b> для карточки.\n\n` +
    `<i>Опишите что хотите получить, AI учтёт ваши подписи к фото</i>`,
    {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.backToMenu(),
    }
  );
}

// ============================================
// PROMPT HANDLING
// ============================================

/**
 * Handle text prompt for carousel
 */
export async function handleCarouselPrompt(ctx: MyContext): Promise<void> {
  const text = ctx.message?.text;
  const session = ctx.session.carouselSession;

  if (!session || session.inputImages.length === 0) {
    await ctx.reply('⚠️ Сначала отправьте фото товара.');
    return;
  }

  if (!text || !text.trim()) {
    await ctx.reply('⚠️ Пожалуйста, отправьте описание для карточки.');
    return;
  }

  session.currentPrompt = text.trim();

  // Check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < CARD_GENERATION_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  await generateCarouselSlide(ctx, user.id);
}

// ============================================
// GENERATION
// ============================================

/**
 * Generate a carousel slide with multiple input images
 * Uses OpenAI for prompt generation + Gemini for image generation
 * 
 * Two modes:
 * 1. First generation: uses ALL input images + original prompt
 * 2. Edit mode (when currentEditRequest exists): uses product + card + edit request
 */
async function generateCarouselSlide(ctx: MyContext, userId: string): Promise<void> {
  const session = ctx.session.carouselSession;
  if (!session || session.inputImages.length === 0 || !session.currentPrompt) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  // Determine if this is an edit (we have both a generated image AND an edit request)
  const isEdit = !!session.currentImageUrl && !!session.currentEditRequest;
  
  const modeText = isEdit ? '✏️ Редактирую карточку' : '🎨 Создаю карточку';
  await MessageManager.sendProcessing(ctx, `⏳ ${modeText}...\n\n🤖 GPT-4o создаёт промпт...\n🎨 Gemini генерирует изображение...\n\nЭто займёт 30-60 секунд.`);
  ctx.session.currentRoute = ROUTES.CAROUSEL_SESSION;

  try {
    // Create order
    const order = await supabase.createOrder(
      userId,
      'image_card',
      {
        images: session.inputImages.map(img => ({
          url: img.url,
          description: img.description,
        })),
        prompt: session.currentPrompt,
        edit_request: session.currentEditRequest || null,
        slide_number: session.currentSlideNumber,
        is_edit: isEdit,
        current_image_url: session.currentImageUrl || null,
        style_reference: session.styleReference?.imageUrl || null,
        previous_slides: session.slides.map(s => s.imageUrl),
      },
      CARD_GENERATION_COST
    );

    session.orderId = order.id;
    await supabase.updateOrder(order.id, { status: 'processing' });

    // Prepare images and prompt for cardGenerator
    let imagesForGenerator: Array<{ url: string; description?: string }>;
    let promptForGenerator: string;
    
    if (isEdit && session.currentImageUrl && session.currentEditRequest) {
      // EDIT MODE: Only send product photo + current generated card
      // Prompt is the EDIT REQUEST (what to change)
      imagesForGenerator = [
        {
          url: session.originalImageUrl,
          description: 'Оригинальное фото товара - сохрани товар без изменений',
        },
        {
          url: session.currentImageUrl,
          description: 'Текущая карточка - отредактируй её согласно запросу',
        },
      ];
      promptForGenerator = session.currentEditRequest;
    } else {
      // FIRST GENERATION: Use all input images + original prompt
      imagesForGenerator = session.inputImages.map((img) => ({
        url: img.url,
        description: img.description,
      }));
      promptForGenerator = session.currentPrompt;
      
      // Add previous slide as style reference for subsequent slides
      if (session.currentSlideNumber > 1 && session.styleReference) {
        imagesForGenerator.push({
          url: session.styleReference.imageUrl,
          description: `Референс стиля от слайда 1 - сохрани точно такой же стиль`,
        });
      }
    }

    // Generate card using OpenAI + Gemini
    const result = await cardGenerator.generateCard({
      images: imagesForGenerator,
      userPrompt: promptForGenerator,
      slideNumber: session.currentSlideNumber,
      isFirstSlide: session.currentSlideNumber === 1 && !isEdit,
      isEdit, // Pass edit mode flag - uses card_edit prompts
      styleReference: session.styleReference?.styleDescription,
      previousSlides: session.slides.map(s => ({
        prompt: s.prompt,
      })),
    });

    await MessageManager.deleteProcessing(ctx);

    if (result.success && result.imageBuffer) {
      // Upload to storage
      const imageUrl = await supabase.uploadImage(result.imageBuffer, userId, order.id, 'card');

      // Store current generated image
      session.currentImageUrl = imageUrl || undefined;
      session.currentImageBuffer = result.imageBuffer;
      session.generationCount++;
      
      // Clear edit request after successful generation
      session.currentEditRequest = undefined;

      // Build caption - show edit request if it was an edit
      const promptPreview = session.currentPrompt.substring(0, 100) + (session.currentPrompt.length > 100 ? '...' : '');
      
      // Send result
      const sentMessage = await ctx.replyWithPhoto(new InputFile(result.imageBuffer, `slide_${session.currentSlideNumber}.png`), {
        caption: `✅ <b>Слайд ${session.currentSlideNumber} готов!</b>\n\n` +
          `📝 ${promptPreview}\n\n` +
          `💡 <i>Отправьте текст чтобы отредактировать карточку</i>`,
        parse_mode: 'HTML',
        reply_markup: getCarouselSessionKeyboard(session.currentSlideNumber),
      });

      // Store file_id for quick access
      if (sentMessage.photo) {
        session.currentImageFileId = sentMessage.photo[sentMessage.photo.length - 1].file_id;
      }

      // Update order with generated prompt
      await supabase.updateOrder(order.id, {
        status: 'completed',
        output_data: {
          image_url: imageUrl,
          slide_number: session.currentSlideNumber,
          generated_prompt: result.generatedPrompt || null,
        },
      });

      // Deduct credits
      await supabase.updateUserCredits(userId, -CARD_GENERATION_COST);
      await supabase.incrementCardsCreated(userId);

    } else {
      await ctx.reply(
        `❌ Ошибка генерации:\n${result.error || 'Неизвестная ошибка'}\n\nПопробуйте ещё раз.`,
        {
          parse_mode: 'HTML',
          reply_markup: KeyboardBuilder.backToMenu(),
        }
      );

      await supabase.updateOrder(order.id, {
        status: 'failed',
        output_data: { 
          error: result.error || 'Unknown error',
          generated_prompt: result.generatedPrompt || null,
        },
      });
    }
  } catch (error: any) {
    console.error('Carousel generation error:', error);
    await MessageManager.deleteProcessing(ctx);
    await ctx.reply(
      `❌ Ошибка генерации:\n${error.message || 'Неизвестная ошибка'}\n\nПопробуйте ещё раз.`,
      {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.backToMenu(),
      }
    );
  }
}

// ============================================
// ACTIONS
// ============================================

/**
 * Regenerate current slide with same prompt
 */
export async function handleCarouselRegenerate(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.carouselSession;
  if (!session?.originalImageUrl || !session.currentPrompt) {
    await ctx.reply('⚠️ Нет данных для регенерации. Начните сначала.', {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
    return;
  }

  // Check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < CARD_GENERATION_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  await generateCarouselSlide(ctx, user.id);
}

/**
 * Finalize current slide and start next
 */
export async function handleCarouselNextSlide(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.carouselSession;
  if (!session?.currentImageUrl || !session.currentPrompt) {
    await ctx.reply('⚠️ Сначала сгенерируйте слайд.', {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
    return;
  }

  // Finalize current slide
  const finalizedSlide: CarouselSlide = {
    slideNumber: session.currentSlideNumber,
    imageUrl: session.currentImageUrl,
    imageFileId: session.currentImageFileId,
    prompt: session.currentPrompt,
    generatedAt: new Date().toISOString(),
  };
  session.slides.push(finalizedSlide);

  // Set style reference from first slide
  if (session.currentSlideNumber === 1) {
    session.styleReference = {
      imageUrl: session.currentImageUrl,
      styleDescription: `Style from slide 1: ${session.currentPrompt}`,
    };
  }

  // Prepare for next slide
  session.currentSlideNumber++;
  session.currentPrompt = undefined;
  session.currentImageUrl = undefined;
  session.currentImageFileId = undefined;
  session.currentImageBuffer = undefined;

  ctx.session.currentRoute = ROUTES.CAROUSEL_NEXT_SLIDE;

  // Ask for next slide prompt
  await ctx.reply(
    `✅ <b>Слайд ${session.currentSlideNumber - 1} сохранён!</b>\n\n` +
    `📝 Опишите <b>слайд ${session.currentSlideNumber}</b>:\n\n` +
    `<i>Стиль будет сохранён автоматически на основе первого слайда.</i>\n\n` +
    `Подсказка: опишите что показать на этом слайде (детали, ракурс, информация и т.д.)`,
    {
      parse_mode: 'HTML',
      reply_markup: new InlineKeyboard()
        .text(`✅ Завершить (${session.slides.length} слайд${getSlideWord(session.slides.length)})`, CALLBACKS.CAROUSEL_FINISH)
        .row()
        .text('🏠 Выход в меню', CALLBACKS.BACK_TO_MENU),
    }
  );
}

/**
 * Handle prompt for next slide (when in CAROUSEL_NEXT_SLIDE state)
 */
export async function handleCarouselNextSlidePrompt(ctx: MyContext): Promise<void> {
  const text = ctx.message?.text;
  const session = ctx.session.carouselSession;

  if (!session) {
    await ctx.reply('⚠️ Сессия не найдена. Начните сначала.', {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
    return;
  }

  if (!text || !text.trim()) {
    await ctx.reply('⚠️ Пожалуйста, опишите следующий слайд.');
    return;
  }

  session.currentPrompt = text.trim();

  // Check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < CARD_GENERATION_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  await generateCarouselSlide(ctx, user.id);
}

/**
 * Finish carousel and show summary
 */
export async function handleCarouselFinish(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const session = ctx.session.carouselSession;
  if (!session) {
    await ctx.reply('⚠️ Сессия не найдена.', {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
    return;
  }

  // If current slide exists but not saved, save it
  if (session.currentImageUrl && session.currentPrompt) {
    const finalizedSlide: CarouselSlide = {
      slideNumber: session.currentSlideNumber,
      imageUrl: session.currentImageUrl,
      imageFileId: session.currentImageFileId,
      prompt: session.currentPrompt,
      generatedAt: new Date().toISOString(),
    };
    session.slides.push(finalizedSlide);
  }

  const totalSlides = session.slides.length;

  if (totalSlides === 0) {
    await ctx.reply('⚠️ Нет сохранённых слайдов.', {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
    return;
  }

  // Send summary
  let summaryText = `🎉 <b>Карусель готова!</b>\n\n`;
  summaryText += `📊 Всего слайдов: ${totalSlides}\n`;
  summaryText += `🎨 Генераций: ${session.generationCount}\n\n`;
  summaryText += `<b>Слайды:</b>\n`;

  session.slides.forEach((slide, index) => {
    summaryText += `${index + 1}. ${slide.prompt.substring(0, 50)}${slide.prompt.length > 50 ? '...' : ''}\n`;
  });

  await ctx.reply(summaryText, {
    parse_mode: 'HTML',
    reply_markup: KeyboardBuilder.mainMenu(),
  });

  // Clear session
  ctx.session.carouselSession = undefined;
  ctx.session.currentRoute = ROUTES.MAIN_MENU;
}

/**
 * Handle new prompt while in carousel session (edit current slide)
 * When user sends text after a card is already generated, it's an EDIT request
 */
export async function handleCarouselSessionPrompt(ctx: MyContext): Promise<void> {
  const text = ctx.message?.text;
  const session = ctx.session.carouselSession;

  if (!session?.originalImageUrl) {
    await ctx.reply('⚠️ Сессия истекла. Начните сначала.', {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
    return;
  }

  if (!text || !text.trim()) {
    await ctx.reply('⚠️ Пожалуйста, отправьте описание.');
    return;
  }

  // Save edit request (what to change) - original prompt stays intact
  session.currentEditRequest = text.trim();

  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < CARD_GENERATION_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  await generateCarouselSlide(ctx, user.id);
}
```

# src/handlers/imageCard.ts

```ts
import { MyContext, ROUTES } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { n8n } from '../services/n8n';
import { InputFile } from 'grammy';
import { v4 as uuidv4 } from 'uuid';

const IMAGE_CARD_COST = 4; // Credits per card

// Initialize image card flow - show prompt for photo
export async function handleImageCard(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  // Initialize session with unique ID for n8n/ChatGPT memory
  ctx.session.currentRoute = ROUTES.IMAGE_CARD_WAITING_PHOTO;
  ctx.session.imageGenSession = {
    sessionId: uuidv4(),
    generationCount: 0,
  };

  const text = `${TEXTS.IMAGE_CARD_TITLE}\n\n${TEXTS.IMAGE_CARD_SEND_PHOTO}`;

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(text, {
        reply_markup: KeyboardBuilder.imageCardWaitingPhoto(),
      });
    } catch {
      await ctx.reply(text, {
        reply_markup: KeyboardBuilder.imageCardWaitingPhoto(),
      });
    }
  } else {
    await ctx.reply(text, {
      reply_markup: KeyboardBuilder.imageCardWaitingPhoto(),
    });
  }
}

// Handle photo upload
export async function handleImageCardPhoto(ctx: MyContext): Promise<void> {
  const photo = ctx.message?.photo;
  if (!photo || photo.length === 0) {
    await ctx.reply('Пожалуйста, отправьте фото.');
    return;
  }

  // Initialize session if not exists
  if (!ctx.session.imageGenSession) {
    ctx.session.imageGenSession = {
      sessionId: uuidv4(),
      generationCount: 0,
    };
  }

  const session = ctx.session.imageGenSession;

  // Get the largest photo
  const largestPhoto = photo[photo.length - 1];

  // Get file URL from Telegram
  const file = await ctx.api.getFile(largestPhoto.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;

  // Store in session
  session.photoUrl = photoUrl;
  session.photoFileId = largestPhoto.file_id;

  // If there was a caption, treat it as prompt and generate
  if (ctx.message.caption && ctx.message.caption.trim()) {
    session.prompt = ctx.message.caption.trim();

    // Get user and check credits
    const user = await supabase.getUser(ctx.from!.id);
    if (!user) {
      await ctx.reply(TEXTS.ERROR_GENERAL);
      return;
    }

    if (user.credits < IMAGE_CARD_COST) {
      await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.creditPackages(),
      });
      return;
    }

    await generateImageCard(ctx, user.id);
    return;
  }

  // Update route and ask for prompt
  ctx.session.currentRoute = ROUTES.IMAGE_CARD_WAITING_PROMPT;

  await ctx.reply(TEXTS.IMAGE_CARD_PHOTO_RECEIVED, {
    parse_mode: "HTML",
    reply_markup: KeyboardBuilder.imageCardPhotoReceived(),
  });
}

// Handle prompt text
export async function handleImageCardPrompt(ctx: MyContext): Promise<void> {
  const text = ctx.message?.text;

  if (!ctx.session.imageGenSession?.photoUrl) {
    await ctx.reply('Сначала отправьте фото товара.');
    return;
  }

  // Prompt is mandatory
  if (!text || !text.trim()) {
    await ctx.reply('⚠️ Пожалуйста, отправьте описание для карточки. Промпт обязателен.');
    return;
  }

  // Store prompt
  ctx.session.imageGenSession.prompt = text.trim();

  // Get user and check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < IMAGE_CARD_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  // Generate
  await generateImageCard(ctx, user.id);
}

// Handle regenerate callback (same photo, same prompt)
export async function handleRegenerate(ctx: MyContext): Promise<void> {
  if (ctx.callbackQuery) {
    await ctx.answerCallbackQuery();
  }

  const session = ctx.session.imageGenSession;

  if (!session?.photoUrl) {
    await ctx.reply('Нет фото для генерации. Начните сначала.', {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
    return;
  }

  if (!session.prompt) {
    await ctx.reply('Нет промпта для генерации. Отправьте описание.', {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
    return;
  }

  // Get user and check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < IMAGE_CARD_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  // Generate again
  await generateImageCard(ctx, user.id);
}

// Main generation function
async function generateImageCard(ctx: MyContext, userId: string): Promise<void> {
  const session = ctx.session.imageGenSession;
  if (!session?.photoUrl) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  // Send processing message
  await MessageManager.sendProcessing(ctx, TEXTS.IMAGE_CARD_WAIT);
  ctx.session.currentRoute = ROUTES.IMAGE_CARD_SESSION;

  try {
    // Create order
    const order = await supabase.createOrder(
      userId,
      'image_card',
      {
        photo_url: session.photoUrl,
        description: session.prompt || '',
      },
      IMAGE_CARD_COST
    );

    session.orderId = order.id;

    // Update order status
    await supabase.updateOrder(order.id, { status: 'processing' });

    // Call n8n to generate image
    const result = await n8n.generateImageCard({
      photoUrl: session.photoUrl,
      description: session.prompt || '',
      userId: userId,
      orderId: order.id,
      sessionId: session.sessionId,
    });

    // Delete processing message
    await MessageManager.deleteProcessing(ctx);

    if (result.success && result.buffer && result.buffer.length > 0) {
      // Store result in session
      const imageBuffer = Buffer.from(result.buffer);
      session.lastGeneratedImage = imageBuffer;
      session.generationCount++;

      // Upload to Supabase Storage
      const imageUrl = await supabase.uploadImage(imageBuffer, userId, order.id, 'card');

      // Send result with session options (using HTML for custom emoji support)
      await ctx.replyWithPhoto(new InputFile(result.buffer, 'card.jpg'), {
        caption: `${TEXTS.IMAGE_CARD_READY}\n\n${TEXTS.IMAGE_CARD_SESSION_OPTIONS}`,
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.imageCardSession(),
      });

      // Update database with image URL
      await supabase.updateOrder(order.id, {
        status: 'completed',
        output_data: {
          images: result.images,
          generated_image_url: imageUrl,
        },
      });

      // Deduct credits and increment counter
      await supabase.updateUserCredits(userId, -IMAGE_CARD_COST);
      await supabase.incrementCardsCreated(userId);
    } else {
      await ctx.reply(TEXTS.IMAGE_CARD_ERROR, {
        reply_markup: KeyboardBuilder.imageCardSession(),
      });

      await supabase.updateOrder(order.id, {
        status: 'failed',
        output_data: { error: result.error || 'Unknown error' },
      });
    }
  } catch (error) {
    console.error('Image card generation error:', error);
    await MessageManager.deleteProcessing(ctx);
    await ctx.reply(TEXTS.IMAGE_CARD_ERROR, {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
  }
}
```

# src/handlers/imageEdit.ts

```ts
import { MyContext, ROUTES } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { n8n } from '../services/n8n';
import { InputFile } from 'grammy';
import { v4 as uuidv4 } from 'uuid';

const IMAGE_EDIT_COST = 2; // Credits per edit (half of generation)

// Initialize image edit flow
export async function handleImageEdit(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  // Initialize session with unique ID for n8n/ChatGPT memory
  ctx.session.currentRoute = ROUTES.IMAGE_EDIT_WAITING_PHOTO;
  ctx.session.imageEditSession = {
    sessionId: uuidv4(),
    editCount: 0,
  };

  const text = `${TEXTS.IMAGE_EDIT_TITLE}\n\n${TEXTS.IMAGE_EDIT_SEND_PHOTO}`;

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(text, {
        reply_markup: KeyboardBuilder.imageEditWaitingPhoto(),
      });
    } catch {
      await ctx.reply(text, {
        reply_markup: KeyboardBuilder.imageEditWaitingPhoto(),
      });
    }
  } else {
    await ctx.reply(text, {
      reply_markup: KeyboardBuilder.imageEditWaitingPhoto(),
    });
  }
}

// Handle photo upload for editing
export async function handleImageEditPhoto(ctx: MyContext): Promise<void> {
  const photo = ctx.message?.photo;
  if (!photo || photo.length === 0) {
    await ctx.reply('Пожалуйста, отправьте изображение.');
    return;
  }

  // Initialize session if not exists
  if (!ctx.session.imageEditSession) {
    ctx.session.imageEditSession = {
      sessionId: uuidv4(),
      editCount: 0,
    };
  }

  const session = ctx.session.imageEditSession;

  // Get the largest photo
  const largestPhoto = photo[photo.length - 1];

  // Get file URL from Telegram
  const file = await ctx.api.getFile(largestPhoto.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;

  // Store in session
  session.photoUrl = photoUrl;
  session.photoFileId = largestPhoto.file_id;

  // Update route
  ctx.session.currentRoute = ROUTES.IMAGE_EDIT_WAITING_PROMPT;

  await ctx.reply(TEXTS.IMAGE_EDIT_PHOTO_RECEIVED, {
    reply_markup: KeyboardBuilder.imageEditPhotoReceived(),
  });
}

// Handle prompt text for editing
export async function handleImageEditPrompt(ctx: MyContext): Promise<void> {
  const text = ctx.message?.text;

  if (!ctx.session.imageEditSession?.photoUrl) {
    await ctx.reply('Сначала отправьте изображение для редактирования.');
    return;
  }

  if (!text || !text.trim()) {
    await ctx.reply(TEXTS.IMAGE_EDIT_NEED_PROMPT);
    return;
  }

  // Store prompt
  ctx.session.imageEditSession.prompt = text.trim();

  // Get user and check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < IMAGE_EDIT_COST) {
    await ctx.reply(TEXTS.IMAGE_EDIT_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  // Process edit
  await processImageEdit(ctx, user.id);
}

// Handle regenerate callback (same photo, same prompt)
export async function handleEditRegenerate(ctx: MyContext): Promise<void> {
  if (ctx.callbackQuery) {
    await ctx.answerCallbackQuery();
  }

  const session = ctx.session.imageEditSession;

  if (!session?.photoUrl || !session.prompt) {
    await ctx.reply('Нет данных для обработки. Начните сначала.', {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
    return;
  }

  // Get user and check credits
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  if (user.credits < IMAGE_EDIT_COST) {
    await ctx.reply(TEXTS.IMAGE_EDIT_NO_CREDITS, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  // Process again
  await processImageEdit(ctx, user.id);
}

// Main edit processing function
async function processImageEdit(ctx: MyContext, userId: string): Promise<void> {
  const session = ctx.session.imageEditSession;
  if (!session?.photoUrl || !session.prompt) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  // Send processing message
  await MessageManager.sendProcessing(ctx, TEXTS.IMAGE_EDIT_WAIT);
  ctx.session.currentRoute = ROUTES.IMAGE_EDIT_SESSION;

  try {
    // Create order
    const order = await supabase.createOrder(
      userId,
      'image_edit',
      {
        photo_url: session.photoUrl,
        description: session.prompt,
      },
      IMAGE_EDIT_COST
    );

    session.orderId = order.id;

    // Update order status
    await supabase.updateOrder(order.id, { status: 'processing' });

    // Call n8n to edit image
    const result = await n8n.editImage({
      photoUrl: session.photoUrl,
      description: session.prompt,
      userId: userId,
      orderId: order.id,
      sessionId: session.sessionId,
    });

    // Delete processing message
    await MessageManager.deleteProcessing(ctx);

    if (result.success && result.buffer && result.buffer.length > 0) {
      // Store result in session
      const imageBuffer = Buffer.from(result.buffer);
      session.lastEditedImage = imageBuffer;
      session.editCount++;

      // Upload to Supabase Storage
      const imageUrl = await supabase.uploadImage(imageBuffer, userId, order.id, 'edit');

      // Send result with session options
      await ctx.replyWithPhoto(new InputFile(result.buffer, 'edited.jpg'), {
        caption: `${TEXTS.IMAGE_EDIT_READY}\n\n${TEXTS.IMAGE_EDIT_SESSION_OPTIONS}`,
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.imageEditSession(),
      });

      // Update database with image URL
      await supabase.updateOrder(order.id, {
        status: 'completed',
        output_data: {
          images: result.images,
          generated_image_url: imageUrl,
        },
      });

      // Deduct credits
      await supabase.updateUserCredits(userId, -IMAGE_EDIT_COST);
    } else {
      await ctx.reply(TEXTS.IMAGE_EDIT_ERROR, {
        reply_markup: KeyboardBuilder.imageEditSession(),
      });

      await supabase.updateOrder(order.id, {
        status: 'failed',
        output_data: { error: result.error || 'Unknown error' },
      });
    }
  } catch (error) {
    console.error('Image edit error:', error);
    await MessageManager.deleteProcessing(ctx);
    await ctx.reply(TEXTS.IMAGE_EDIT_ERROR, {
      reply_markup: KeyboardBuilder.backToMenu(),
    });
  }
}
```

# src/handlers/mainMenu.ts

```ts
import { MyContext, ROUTES } from '../types';
import { TEXTS, CALLBACKS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { InlineKeyboard } from 'grammy';

// Parse start parameter for referral tracking
// Formats supported:
// - ref_XXXXXXXX (referral code)
// - utm_source=xxx&utm_campaign=xxx
// - Combined: ref_XXXXXXXX__utm_source=xxx
function parseStartParam(startParam: string | undefined): {
  referralCode?: string;
  utmSource?: string;
  utmCampaign?: string;
  utmMedium?: string;
  startParam?: string;
} {
  if (!startParam) return {};

  const result: {
    referralCode?: string;
    utmSource?: string;
    utmCampaign?: string;
    utmMedium?: string;
    startParam: string;
  } = { startParam };

  // Check for referral code (ref_XXXXXXXX)
  const refMatch = startParam.match(/ref_([a-zA-Z0-9]+)/);
  if (refMatch) {
    result.referralCode = refMatch[1];
  }

  // Check for UTM parameters (utm_source=xxx)
  const utmSourceMatch = startParam.match(/utm_source[=_]([a-zA-Z0-9_-]+)/);
  if (utmSourceMatch) {
    result.utmSource = utmSourceMatch[1];
  }

  const utmCampaignMatch = startParam.match(/utm_campaign[=_]([a-zA-Z0-9_-]+)/);
  if (utmCampaignMatch) {
    result.utmCampaign = utmCampaignMatch[1];
  }

  const utmMediumMatch = startParam.match(/utm_medium[=_]([a-zA-Z0-9_-]+)/);
  if (utmMediumMatch) {
    result.utmMedium = utmMediumMatch[1];
  }

  return result;
}

export async function showMainMenu(
  ctx: MyContext, 
  editMessage = false,
  startParam?: string,
  fromStart = false
): Promise<void> {
  // Ensure user exists in database with referral tracking
  if (ctx.from) {
    try {
      const referralParams = parseStartParam(startParam);
      
      await supabase.getOrCreateUser(
        ctx.from.id,
        ctx.from.username,
        ctx.from.first_name,
        ctx.from.last_name,
        referralParams
      );
    } catch (error) {
      console.error('Error creating/getting user:', error);
      // Continue anyway - user might already exist
    }
  }

  // Clean up any old messages
  await MessageManager.cleanup(ctx);

  // Reset session
  ctx.session.currentRoute = ROUTES.MAIN_MENU;
  ctx.session.tempData = {};
  ctx.session.imageGenSession = undefined;
  ctx.session.imageEditSession = undefined;

  // Show intro on /start command
  if (fromStart) {
    await showIntro(ctx);
    return;
  }

  // Send or edit welcome message with inline keyboard
  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(TEXTS.WELCOME, {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.mainMenu(),
      });
    } catch (error) {
      await ctx.reply(TEXTS.WELCOME, {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.mainMenu(),
      });
    }
  } else {
    await ctx.reply(TEXTS.WELCOME, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.mainMenu(),
    });
  }
}

// Show introduction for new users
async function showIntro(ctx: MyContext): Promise<void> {
  const introKeyboard = new InlineKeyboard()
    .url('📖 Читать гайд', 'https://teletype.in/@merchantai/guide')
    .row()
    .text('▶️ Продолжить', CALLBACKS.CONTINUE_TO_MENU);

  // Send video with caption and buttons
  // You can use either:
  // 1. File ID (after first upload, Telegram returns file_id)
  // 2. URL to video file
  // 3. Local file path with InputFile
  
  const videoFileId = 'BAACAgIAAxkBAAINOmliVHHAXApAwFQlOVawBPy7MhJrAAJyjAAC1dHoSpf3WWKDda2yOAQ'; // Replace with actual file_id
  
  await ctx.replyWithVideo(videoFileId, {
    caption: TEXTS.INTRO,
    parse_mode: 'HTML',
    reply_markup: introKeyboard,
  });
}

// Handle continue to menu from intro
export async function handleContinueToMenu(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  
  // Delete intro message
  if (ctx.callbackQuery?.message) {
    try {
      await ctx.api.deleteMessage(ctx.chat!.id, ctx.callbackQuery.message.message_id);
    } catch {}
  }

  // Show main menu
  await ctx.reply(TEXTS.WELCOME, {
    parse_mode: 'HTML',
    reply_markup: KeyboardBuilder.mainMenu(),
  });
}

export async function handleMainMenuCallback(ctx: MyContext): Promise<void> {
  const callbackData = ctx.callbackQuery?.data;

  if (!callbackData) return;

  await ctx.answerCallbackQuery();

  switch (callbackData) {
    case CALLBACKS.BACK_TO_MENU:
      await showMainMenu(ctx, true);
      break;
  }
}
```

# src/handlers/photoSession.ts

```ts
import { MyContext, ROUTES } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';
import { supabase } from '../services/supabase';
import { n8n } from '../services/n8n';
import { InputMediaPhoto } from 'grammy/types';

const PHOTO_SESSION_COST = 2; // Credits per session

export async function handlePhotoSession(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  ctx.session.currentRoute = ROUTES.PHOTO_SESSION;

  const sessionText = `${TEXTS.PHOTO_SESSION_TITLE}

${TEXTS.PHOTO_SESSION_DESC}

${TEXTS.PHOTO_SESSION_UPLOAD}`;

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(sessionText, {
        reply_markup: KeyboardBuilder.photoSessionWaiting(),
      });
    } catch {
      await ctx.reply(sessionText, {
        reply_markup: KeyboardBuilder.photoSessionWaiting(),
      });
    }
  } else {
    await ctx.reply(sessionText, {
      reply_markup: KeyboardBuilder.photoSessionWaiting(),
    });
  }
}

export async function handlePhotoSessionPhoto(ctx: MyContext): Promise<void> {
  // Check for photo
  if (!ctx.message?.photo || ctx.message.photo.length === 0) {
    await ctx.reply(TEXTS.ERROR_NO_PHOTO);
    return;
  }

  // Get user
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  // Check credits
  if (user.credits < PHOTO_SESSION_COST) {
    await ctx.reply(TEXTS.IMAGE_CARD_NO_CREDITS, {
      reply_markup: KeyboardBuilder.creditPackages(),
    });
    return;
  }

  // Get photo URL
  const photo = ctx.message.photo[ctx.message.photo.length - 1];
  const file = await ctx.api.getFile(photo.file_id);
  const photoUrl = `https://api.telegram.org/file/bot${ctx.api.token}/${file.file_path}`;

  // Get description if provided
  const description = ctx.message.caption || '';

  // Send processing message
  await MessageManager.sendProcessing(ctx, TEXTS.PHOTO_SESSION_WAIT);

  try {
    // Create order
    const order = await supabase.createOrder(
      user.id,
      'photo_session',
      {
        photo_url: photoUrl,
        description,
      },
      PHOTO_SESSION_COST
    );

    // Update order status
    await supabase.updateOrder(order.id, { status: 'processing' });

    // Call n8n to generate photo session
    const result = await n8n.generatePhotoSession({
      photoUrl,
      description,
      count: 5,
      userId: user.id,
      orderId: order.id,
    });

    if (result.success && result.images && result.images.length > 0) {
      // Delete processing message
      await MessageManager.deleteProcessing(ctx);

      // Send results as media group
      if (result.images.length === 1) {
        await ctx.replyWithPhoto(result.images[0], {
          caption: TEXTS.PHOTO_SESSION_READY,
          reply_markup: KeyboardBuilder.mainMenu(),
        });
      } else {
        // Send caption separately
        await ctx.reply(TEXTS.PHOTO_SESSION_READY);

        // Create media group
        const mediaGroup: InputMediaPhoto[] = result.images.map((url, index) => ({
          type: 'photo' as const,
          media: url,
          caption: index === 0 ? `Фото ${index + 1} из ${result.images!.length}` : undefined,
        }));

        // Send media group
        await ctx.replyWithMediaGroup(mediaGroup);

        // Send main menu
        await ctx.reply('Готово! 🎉', {
          reply_markup: KeyboardBuilder.mainMenu(),
        });
      }

      // Update database
      await supabase.updateOrder(order.id, {
        status: 'completed',
        output_data: { images: result.images },
      });

      // Deduct credits and increment counter
      await supabase.updateUserCredits(user.id, -PHOTO_SESSION_COST);
      await supabase.incrementCardsCreated(user.id);
    } else {
      // Delete processing message
      await MessageManager.deleteProcessing(ctx);

      await ctx.reply(TEXTS.PHOTO_SESSION_ERROR, {
        reply_markup: KeyboardBuilder.mainMenu(),
      });

      await supabase.updateOrder(order.id, {
        status: 'failed',
        output_data: { error: result.error || 'Unknown error' },
      });
    }
  } catch (error) {
    console.error('Photo session generation error:', error);

    // Delete processing message
    await MessageManager.deleteProcessing(ctx);

    await ctx.reply(TEXTS.PHOTO_SESSION_ERROR, {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
  }
}
```

# src/handlers/priceExplain.ts

```ts
import { MyContext } from '../types';
import { InlineKeyboard } from 'grammy';
import { CALLBACKS } from '../constants/texts';

// Price explain flow states
export const PRICE_EXPLAIN_CALLBACKS = {
  START: 'price_explain_start',
  REASON_1: 'price_reason_1',
  REASON_2: 'price_reason_2',
  REASON_3: 'price_reason_3',
  FINAL: 'price_final',
  BACK_TO_PRICING: 'back_to_pricing',
};

// Flow messages
const PRICE_MESSAGES = {
  START: `Хороший вопрос 👌

Цена — это не «за картинку».
Она формируется из 3 вещей 👇`,

  REASON_1: `1️⃣ <b>Это не одна нейросеть</b>

Мы используем связку моделей:
🔹 генерация
🔹 композиция
🔹 тексты
🔹 шрифты
🔹 пост-обработка

Каждая инфографика —
это несколько AI-проходов,
а не один запрос.`,

  REASON_2: `2️⃣ <b>У каждой инфографики есть себестоимость</b>

Каждая генерация = реальные расходы:
🔹 ChatGPT
🔹 Nano Banana PRO
🔹 инфраструктура (сервера, ИИ агенты)
🔹 хранение изображений
🔹 оплата труда разработчиков

<i>(мы берем 20–30% от стоимости генерации)</i>

Мы не продаём «воздух».
Каждая инфографика что-то стоит.`,

  REASON_3: `3️⃣ <b>Это в десятки раз дешевле и быстрее ручного подхода или дизайнеров</b>

Для сравнения:
♦️ дизайнер: 400–2000₽ за карточку
♦️ сроки: дни
♦️ правки: отдельно (+время)

Здесь:
🔹 от 29₽ за инфографику
🔹 сразу
🔹 без ограничений на варианты
🔹 дизайн на том же уровне`,

  FINAL: `<b>Если коротко:</b>

Ты платишь не за «картинку»,
а за быструю и качественную инфографику.

Мы выдаем всем новым пользователям бесплатные генерации (это стоит нам ~50₽ за пользователя), чтобы вы смогли попробовать инструмент и убедиться в качестве нашего продукта, перед тем как совершать покупку 🙂`,
};

// Keyboards for each state
const KEYBOARDS = {
  START: new InlineKeyboard()
    .text('🔍 Узнать из чего', PRICE_EXPLAIN_CALLBACKS.REASON_1)
    .row()
    .text('⬅️ Назад к тарифам', PRICE_EXPLAIN_CALLBACKS.BACK_TO_PRICING),

  REASON_1: new InlineKeyboard()
    .text('➡️ А что ещё?', PRICE_EXPLAIN_CALLBACKS.REASON_2)
    .row()
    .text('⬅️ Назад', PRICE_EXPLAIN_CALLBACKS.START),

  REASON_2: new InlineKeyboard()
    .text('➡️ Последняя причина', PRICE_EXPLAIN_CALLBACKS.REASON_3)
    .row()
    .text('🏠 Меню', CALLBACKS.BACK_TO_MENU),

  REASON_3: new InlineKeyboard()
    .text('🔥 Понял, а что в итоге?', PRICE_EXPLAIN_CALLBACKS.FINAL)
    .row()
    .text('🏠 Меню', CALLBACKS.BACK_TO_MENU),

  FINAL: new InlineKeyboard()
    .text('⭐ Выбрать пакет', PRICE_EXPLAIN_CALLBACKS.BACK_TO_PRICING)
    .row()
    .text('💬 Задать вопрос', CALLBACKS.SUPPORT),
};

// Handler functions
export async function handlePriceExplainStart(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  
  try {
    await ctx.editMessageText(PRICE_MESSAGES.START, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.START,
    });
  } catch {
    await ctx.reply(PRICE_MESSAGES.START, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.START,
    });
  }
}

export async function handlePriceReason1(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  
  try {
    await ctx.editMessageText(PRICE_MESSAGES.REASON_1, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.REASON_1,
    });
  } catch {
    await ctx.reply(PRICE_MESSAGES.REASON_1, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.REASON_1,
    });
  }
}

export async function handlePriceReason2(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  
  try {
    await ctx.editMessageText(PRICE_MESSAGES.REASON_2, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.REASON_2,
    });
  } catch {
    await ctx.reply(PRICE_MESSAGES.REASON_2, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.REASON_2,
    });
  }
}

export async function handlePriceReason3(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  
  try {
    await ctx.editMessageText(PRICE_MESSAGES.REASON_3, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.REASON_3,
    });
  } catch {
    await ctx.reply(PRICE_MESSAGES.REASON_3, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.REASON_3,
    });
  }
}

export async function handlePriceFinal(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();
  
  try {
    await ctx.editMessageText(PRICE_MESSAGES.FINAL, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.FINAL,
    });
  } catch {
    await ctx.reply(PRICE_MESSAGES.FINAL, {
      parse_mode: 'HTML',
      reply_markup: KEYBOARDS.FINAL,
    });
  }
}
```

# src/handlers/profile.ts

```ts
import { MyContext } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager, formatDate } from '../utils/helpers';
import { supabase } from '../services/supabase';

export async function handleProfile(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  try {
    // Get user from database
    const user = await supabase.getUser(ctx.from!.id);

    if (!user) {
      await ctx.reply(TEXTS.ERROR_GENERAL, {
        reply_markup: KeyboardBuilder.mainMenu(),
      });
      return;
    }

    // Get referral stats (with safe defaults)
    //const referralStats = await supabase.getReferralStats(user.id);
    
    // Build bot username for referral link
    //const botUsername = ctx.me?.username || 'MerchantAIBot';
    //const referralCode = referralStats.referralCode || user.id.substring(0, 8);
    //const referralLink = `https://t.me/${botUsername}?start=ref_${referralCode}`;

    // Format profile information
    const profileText = `<b>Профиль</b>

Имя: ${user.first_name || user.username || 'Пользователь'}
Дата регистрации: ${formatDate(user.created_at)}

<b>Баланс:</b> ${user.credits || 0} токенов
<b>Создано карточек:</b> ${user.cards_created || 0}`;

// <b>Реферальная программа</b>
// Приглашено: ${referralStats.referralsCount} чел.
// Заработано: ${referralStats.earnings} ₽

// Ваша ссылка:
// <code>${referralLink}</code>

// <i>Получайте 10% от покупок приглашённых!</i>`;

    if (editMessage && ctx.callbackQuery?.message) {
      try {
        await ctx.editMessageText(profileText, {
          parse_mode: 'HTML',
          reply_markup: KeyboardBuilder.profileActions(),
        });
      } catch {
        await ctx.reply(profileText, {
          parse_mode: 'HTML',
          reply_markup: KeyboardBuilder.profileActions(),
        });
      }
    } else {
      await ctx.reply(profileText, {
        parse_mode: 'HTML',
        reply_markup: KeyboardBuilder.profileActions(),
      });
    }
  } catch (error) {
    console.error('Profile error:', error);
    await ctx.reply(TEXTS.ERROR_GENERAL, {
      reply_markup: KeyboardBuilder.mainMenu(),
    });
  }
}

export async function handleProfileHistory(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  // Get user
  const user = await supabase.getUser(ctx.from!.id);
  if (!user) {
    await ctx.reply(TEXTS.ERROR_GENERAL);
    return;
  }

  // Get orders
  const orders = await supabase.getUserOrders(user.id, 10);

  if (orders.length === 0) {
    if (ctx.callbackQuery?.message) {
      await ctx.editMessageText(
        '<b>История заказов пуста</b>\n\nВы ещё не создавали карточки.',
        {
          parse_mode: 'HTML',
          reply_markup: KeyboardBuilder.profileActions(),
        }
      );
    }
    return;
  }

  // Format history
  let historyText = '<b>История заказов</b>\n\n';

  orders.forEach((order) => {
    const emoji =
      order.type === 'image_card' ? '🎨' : order.type === 'image_edit' ? '✏️' : '📸';
    const status =
      order.status === 'completed' ? '✅' : order.status === 'failed' ? '❌' : '⏳';
    const date = formatDate(order.created_at);
    const typeName =
      order.type === 'image_card'
        ? 'Карточка'
        : order.type === 'image_edit'
          ? 'Редактирование'
          : 'Фотосессия';

    historyText += `${emoji} ${status} ${date}\n`;
    historyText += `${typeName} · ${order.credits_used} токенов\n\n`;
  });

  if (ctx.callbackQuery?.message) {
    await ctx.editMessageText(historyText, {
      parse_mode: 'HTML',
      reply_markup: KeyboardBuilder.profileActions(),
    });
  }
}
```

# src/handlers/support.ts

```ts
import { MyContext } from '../types';
import { TEXTS } from '../constants/texts';
import { KeyboardBuilder } from '../utils/keyboards';
import { MessageManager } from '../utils/helpers';

export async function handleSupport(ctx: MyContext, editMessage = false): Promise<void> {
  await MessageManager.cleanup(ctx);

  const supportText = `${TEXTS.SUPPORT_TITLE}

${TEXTS.SUPPORT_DESC}

${TEXTS.SUPPORT_CONTACT}`;

  if (editMessage && ctx.callbackQuery?.message) {
    try {
      await ctx.editMessageText(supportText, {
        reply_markup: KeyboardBuilder.supportActions(),
      });
    } catch {
      await ctx.reply(supportText, {
        reply_markup: KeyboardBuilder.supportActions(),
      });
    }
  } else {
    await ctx.reply(supportText, {
      reply_markup: KeyboardBuilder.supportActions(),
    });
  }
}

export async function handleSupportFAQ(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const faqText = `❓ *Часто задаваемые вопросы*

*1. Как создать карточку товара?*
Нажмите "🎨 Создать карточку", загрузите фото товара и опционально добавьте описание. Наш ИИ создаст профессиональную карточку за 30-60 секунд.

*2. Что такое кредиты?*
Кредиты - это внутренняя валюта бота. Один кредит = одна операция с ИИ. Карточка стоит 4 кредита, фотосессия - 2 кредита, редактирование - 2 кредита.

*3. Как работает редактирование изображений?*
Нажмите "✏️ Изменить изображение", загрузите фото и опишите желаемые изменения. ИИ обработает изображение согласно вашему описанию.

*4. Можно ли вернуть деньги?*
Да, в течение 14 дней с момента покупки при условии, что вы не использовали более 10% кредитов.

*5. Какие форматы поддерживаются?*
Мы принимаем JPG, PNG, WEBP. Рекомендуемое разрешение - от 1024x1024 пикселей.

*6. Как долго хранятся результаты?*
Все созданные карточки доступны в истории заказов в течение 30 дней.

*7. Можно ли использовать коммерчески?*
Да! Все созданные изображения полностью принадлежат вам и могут использоваться для коммерческих целей.`;

  if (ctx.callbackQuery?.message) {
    await ctx.editMessageText(faqText, {
      parse_mode: 'Markdown',
      reply_markup: KeyboardBuilder.supportActions(),
    });
  }
}

export async function handleSupportContact(ctx: MyContext): Promise<void> {
  await ctx.answerCallbackQuery();

  const contactText = `📧 *Связаться с нами*

Если вы не нашли ответ на свой вопрос в FAQ, свяжитесь с нами:

*Telegram:* @odissey_wrk
*Время ответа:* 1-24 часа

При обращении укажите:
• Ваш Telegram ID: \`${ctx.from!.id}\`
• Описание проблемы
• Скриншоты (если есть)

Мы обязательно вам поможем! 🙂`;

  if (ctx.callbackQuery?.message) {
    await ctx.editMessageText(contactText, {
      parse_mode: 'Markdown',
      reply_markup: KeyboardBuilder.supportActions(),
    });
  }
}
```

# src/index.ts

```ts
import { Bot, session } from 'grammy';
import { run } from '@grammyjs/runner';
import { config } from './config';
import { MyContext, SessionData, ROUTES } from './types';
import { CALLBACKS } from './constants/texts';
import { KeyboardBuilder } from './utils/keyboards';

// Handlers
import { showMainMenu, handleContinueToMenu } from './handlers/mainMenu';
import {
  handleImageCardPhoto,
  handleImageCardPrompt,
  handleRegenerate,
} from './handlers/imageCard';
import {
  handleImageEdit,
  handleImageEditPhoto,
  handleImageEditPrompt,
  handleEditRegenerate,
} from './handlers/imageEdit';
import { handlePhotoSession, handlePhotoSessionPhoto } from './handlers/photoSession';
import { handleProfile, handleProfileHistory } from './handlers/profile';
import { handleSupport, handleSupportFAQ, handleSupportContact } from './handlers/support';
import {
  handleBuyCredits,
  handleCreditPackageSelection,
  handlePaymentCheck,
  handlePaymentCancel,
} from './handlers/buyCredits';
import {
  handlePriceExplainStart,
  handlePriceReason1,
  handlePriceReason2,
  handlePriceReason3,
  handlePriceFinal,
  PRICE_EXPLAIN_CALLBACKS,
} from './handlers/priceExplain';
import {
  handleCarouselStart,
  handleCarouselPhoto,
  handleCarouselPrompt,
  handleCarouselRegenerate,
  handleCarouselNextSlide,
  handleCarouselNextSlidePrompt,
  handleCarouselFinish,
  handleCarouselSessionPrompt,
  handleCarouselImagesDone,
} from './handlers/carousel';

// Create bot instance
const bot = new Bot<MyContext>(config.botToken);

// Session middleware
bot.use(
  session({
    initial: (): SessionData => ({
      currentRoute: ROUTES.MAIN_MENU,
      tempData: {},
    }),
  })
);

// Error handling
bot.catch((err) => {
  console.error('Bot error:', err);
});

// Command handlers
bot.command('start', async (ctx) => {
  // Extract start parameter for referral tracking
  // Format: /start ref_XXXXXXXX or /start utm_source=xxx
  const startParam = ctx.match;
  await showMainMenu(ctx, false, startParam || undefined, true);
});

bot.command('menu', async (ctx) => {
  await showMainMenu(ctx);
});

bot.command('help', async (ctx) => {
  const helpText = `🤖 *MerchantAI - Помощь*

*Основные команды:*
/start - Начать работу с ботом
/menu - Вернуться в главное меню
/help - Показать это сообщение

*Как пользоваться ботом:*

1️⃣ *Создание карточки товара*
   • Нажмите "🎨 Создать карточку"
   • Загрузите фото товара
   • Добавьте описание (опционально)
   • Получите готовую карточку!
   • Можете изменить промпт и сгенерировать снова

2️⃣ *Редактирование изображения*
   • Нажмите "✏️ Изменить изображение"
   • Загрузите изображение
   • Опишите желаемые изменения
   • Получите обработанное изображение!

3️⃣ *Фотосессия товара*
   • Нажмите "📸 Фотосессия товара"
   • Загрузите фото товара
   • Получите 5-10 профессиональных фото!

4️⃣ *Управление аккаунтом*
   • "👤 Мой профиль" - информация об аккаунте
   • "💳 Купить кредиты" - приобрести кредиты
   • "💬 Поддержка" - связаться с нами

*Вопросы?*
Напишите в поддержку или посмотрите FAQ в разделе "💬 Поддержка"`;

  await ctx.reply(helpText, { parse_mode: 'Markdown' });
});

// ============================================
// CALLBACK QUERY HANDLERS
// ============================================

// Main menu callbacks
bot.callbackQuery(CALLBACKS.BACK_TO_MENU, async (ctx) => {
  await ctx.answerCallbackQuery();
  await showMainMenu(ctx, true);
});

bot.callbackQuery(CALLBACKS.CONTINUE_TO_MENU, handleContinueToMenu);

// IMAGE_CARD now uses carousel flow
bot.callbackQuery(CALLBACKS.IMAGE_CARD, async (ctx) => {
  await ctx.answerCallbackQuery();
  await handleCarouselStart(ctx, true);
});

bot.callbackQuery(CALLBACKS.IMAGE_EDIT, async (ctx) => {
  await ctx.answerCallbackQuery();
  await handleImageEdit(ctx, true);
});

bot.callbackQuery(CALLBACKS.PHOTO_SESSION, async (ctx) => {
  await ctx.answerCallbackQuery();
  await handlePhotoSession(ctx, true);
});

bot.callbackQuery(CALLBACKS.PROFILE, async (ctx) => {
  await ctx.answerCallbackQuery();
  await handleProfile(ctx, true);
});

bot.callbackQuery(CALLBACKS.SUPPORT, async (ctx) => {
  await ctx.answerCallbackQuery();
  await handleSupport(ctx, true);
});

bot.callbackQuery(CALLBACKS.BUY_CREDITS, async (ctx) => {
  await ctx.answerCallbackQuery();
  await handleBuyCredits(ctx, true);
});

// Image card session callbacks
bot.callbackQuery(CALLBACKS.REGENERATE, handleRegenerate);

// Image edit session callbacks
bot.callbackQuery(CALLBACKS.EDIT_REGENERATE, handleEditRegenerate);

// Profile callbacks
bot.callbackQuery(CALLBACKS.PROFILE_BUY_CREDITS, async (ctx) => {
  await ctx.answerCallbackQuery();
  await handleBuyCredits(ctx, true);
});
bot.callbackQuery(CALLBACKS.PROFILE_HISTORY, handleProfileHistory);

// Support callbacks
bot.callbackQuery(CALLBACKS.SUPPORT_FAQ, handleSupportFAQ);
bot.callbackQuery(CALLBACKS.SUPPORT_CONTACT, handleSupportContact);

// Credit package purchase callbacks
bot.callbackQuery(CALLBACKS.BUY_STARTER, async (ctx) => {
  await handleCreditPackageSelection(ctx, 'starter');
});
bot.callbackQuery(CALLBACKS.BUY_PRO, async (ctx) => {
  await handleCreditPackageSelection(ctx, 'pro');
});
bot.callbackQuery(CALLBACKS.BUY_BIG, async (ctx) => {
  await handleCreditPackageSelection(ctx, 'big');
});
bot.callbackQuery(CALLBACKS.BUY_ENTERPRISE, async (ctx) => {
  await handleCreditPackageSelection(ctx, 'enterprise');
});

// Payment callbacks
bot.callbackQuery(CALLBACKS.PAYMENT_CHECK, handlePaymentCheck);
bot.callbackQuery(CALLBACKS.PAYMENT_CANCEL, handlePaymentCancel);

// Price explain flow callbacks
bot.callbackQuery(PRICE_EXPLAIN_CALLBACKS.START, handlePriceExplainStart);
bot.callbackQuery(PRICE_EXPLAIN_CALLBACKS.REASON_1, handlePriceReason1);
bot.callbackQuery(PRICE_EXPLAIN_CALLBACKS.REASON_2, handlePriceReason2);
bot.callbackQuery(PRICE_EXPLAIN_CALLBACKS.REASON_3, handlePriceReason3);
bot.callbackQuery(PRICE_EXPLAIN_CALLBACKS.FINAL, handlePriceFinal);
bot.callbackQuery(PRICE_EXPLAIN_CALLBACKS.BACK_TO_PRICING, async (ctx) => {
  await ctx.answerCallbackQuery();
  await handleBuyCredits(ctx, true);
});

// Carousel callbacks
bot.callbackQuery(CALLBACKS.CAROUSEL_REGENERATE, handleCarouselRegenerate);
bot.callbackQuery(CALLBACKS.CAROUSEL_NEXT_SLIDE, handleCarouselNextSlide);
bot.callbackQuery(CALLBACKS.CAROUSEL_FINISH, handleCarouselFinish);
bot.callbackQuery(CALLBACKS.CAROUSEL_IMAGES_DONE, handleCarouselImagesDone);

// ============================================
// MESSAGE HANDLERS
// ============================================

// Text message handler
bot.on('message:text', async (ctx) => {
  const route = ctx.session.currentRoute;

  // Handle prompt input based on current route
  switch (route) {
    // Carousel routes
    case ROUTES.CAROUSEL_WAITING_PROMPT:
      await handleCarouselPrompt(ctx);
      break;

    case ROUTES.CAROUSEL_SESSION:
      await handleCarouselSessionPrompt(ctx);
      break;

    case ROUTES.CAROUSEL_NEXT_SLIDE:
      await handleCarouselNextSlidePrompt(ctx);
      break;

    // Legacy image card routes (keep for backward compatibility)
    case ROUTES.IMAGE_CARD_WAITING_PROMPT:
      await handleImageCardPrompt(ctx);
      break;

    case ROUTES.IMAGE_EDIT_WAITING_PROMPT:
      await handleImageEditPrompt(ctx);
      break;

    case ROUTES.IMAGE_CARD_SESSION:
      // User sent text while in session - treat as new prompt and regenerate
      console.log('IMAGE_CARD_SESSION: received text, session:', JSON.stringify(ctx.session.imageGenSession));
      
      if (!ctx.message.text || !ctx.message.text.trim()) {
        await ctx.reply('⚠️ Пожалуйста, отправьте описание для карточки. Промпт обязателен.');
        return;
      }
      
      // Check if session exists
      if (!ctx.session.imageGenSession?.photoUrl) {
        await ctx.reply('⚠️ Сессия истекла. Пожалуйста, начните заново.', {
          reply_markup: KeyboardBuilder.mainMenu(),
        });
        return;
      }
      
      ctx.session.imageGenSession.prompt = ctx.message.text.trim();
      // handleRegenerate will check credits
      await handleRegenerate(ctx);
      break;

    case ROUTES.IMAGE_EDIT_SESSION:
      // User sent text while in edit session - treat as new prompt and regenerate
      if (!ctx.message.text || !ctx.message.text.trim()) {
        await ctx.reply('⚠️ Пожалуйста, отправьте описание изменений. Промпт обязателен.');
        return;
      }
      if (ctx.session.imageEditSession) {
        ctx.session.imageEditSession.prompt = ctx.message.text.trim();
      }
      // handleEditRegenerate will check credits
      await handleEditRegenerate(ctx);
      break;

    default:
      // Unknown state - show hint
      console.log('Text handler default case. Current route:', route, 'Session:', JSON.stringify(ctx.session));
      await ctx.reply(
        'Используйте кнопки меню для навигации или отправьте /menu для возврата в главное меню.'
      );
  }
});

// TEMPORARY: Get video file_id - remove after getting the ID
bot.on('message:video', async (ctx) => {
  const fileId = ctx.message.video.file_id;
  console.log('VIDEO FILE_ID:', fileId);
  await ctx.reply(`✅ Video file_id:\n\n<code>${fileId}</code>\n\nСкопируй и вставь в mainMenu.ts`, {
    parse_mode: 'HTML',
  });
});

// Photo handler - context-aware
bot.on('message:photo', async (ctx) => {
  const route = ctx.session.currentRoute;

  switch (route) {
    // Carousel routes
    case ROUTES.CAROUSEL_WAITING_PHOTO:
    case ROUTES.CAROUSEL_SESSION:
      await handleCarouselPhoto(ctx);
      break;

    // Legacy image card routes
    case ROUTES.IMAGE_CARD_WAITING_PHOTO:
    case ROUTES.IMAGE_CARD_SESSION:
      await handleImageCardPhoto(ctx);
      break;

    case ROUTES.IMAGE_EDIT_WAITING_PHOTO:
    case ROUTES.IMAGE_EDIT_SESSION:
      await handleImageEditPhoto(ctx);
      break;

    case ROUTES.PHOTO_SESSION:
      await handlePhotoSessionPhoto(ctx);
      break;

    default:
      await ctx.reply(
        'Для загрузки фото выберите соответствующий раздел:\n• 🎨 Создать карточку\n• ✏️ Изменить изображение\n• 📸 Фотосессия товара',
        { reply_markup: { inline_keyboard: [[{ text: '🏠 Главное меню', callback_data: CALLBACKS.BACK_TO_MENU }]] } }
      );
  }
});

// Handle other message types
bot.on('message', async (ctx) => {
  await ctx.reply('Пожалуйста, отправьте фото или используйте кнопки меню для навигации.', {
    reply_markup: { inline_keyboard: [[{ text: '🏠 Главное меню', callback_data: CALLBACKS.BACK_TO_MENU }]] },
  });
});

// Start bot
async function startBot() {
  console.log('🤖 Starting MerchantAI Bot...');

  // Enable graceful stop
  process.once('SIGINT', () => bot.stop());
  process.once('SIGTERM', () => bot.stop());

  // Start bot with runner for better performance
  await bot.init();
  console.log(`✅ Bot started as @${bot.botInfo.username}`);

  const runner = run(bot);

  // Handle runner errors
  // @ts-ignore
  runner.task().catch((error) => {
    console.error('Runner error:', error);
  });
}

// Handle unhandled rejections
process.on('unhandledRejection', (error) => {
  console.error('Unhandled rejection:', error);
});

// Start the bot
startBot().catch((error) => {
  console.error('Failed to start bot:', error);
  process.exit(1);
});

export { bot };
```

# src/services/cardGenerator.ts

```ts
import { openai } from './openai';
import { gemini } from './gemini';

export interface ImageInput {
  url: string;
  description?: string; // User's caption for the image
}

export interface CardGenerationParams {
  images: ImageInput[];
  userPrompt: string;
  slideNumber?: number;
  isFirstSlide?: boolean;
  isEdit?: boolean; // True when editing existing card (uses only product + current card)
  styleReference?: string;
  previousSlides?: Array<{ prompt: string }>;
}

export interface CardGenerationResult {
  success: boolean;
  imageBuffer?: Buffer;
  mimeType?: string;
  generatedPrompt?: string;
  error?: string;
}

// Aspect ratio instruction to append to all prompts
const ASPECT_RATIO = 'Output image aspect ratio: 3:4 (portrait, width:height = 3:4)';

class CardGeneratorService {
  /**
   * Generate a marketplace card/infographic
   * 
   * Modes:
   * - isEdit=true: DIRECT to Gemini (no OpenAI) - user's edit request sent as-is
   * - isFirstSlide=true: OpenAI generates prompt → Gemini generates image
   * - else: OpenAI generates prompt for next slide → Gemini generates image
   */
  async generateCard(params: CardGenerationParams): Promise<CardGenerationResult> {
    const {
      images,
      userPrompt,
      slideNumber = 1,
      isFirstSlide = true,
      isEdit = false,
      styleReference,
      previousSlides,
    } = params;

    if (images.length === 0) {
      return { success: false, error: 'At least one image is required' };
    }

    if (images.length > 8) {
      return { success: false, error: 'Maximum 8 images allowed' };
    }

    try {
      const mode = isEdit ? 'EDIT' : (isFirstSlide ? 'CREATE' : 'SLIDE');
      console.log(`\n[CardGenerator] ========== ${mode} MODE ==========`);
      console.log(`[CardGenerator] User prompt: ${userPrompt.substring(0, 100)}${userPrompt.length > 100 ? '...' : ''}`);
      console.log(`[CardGenerator] Images: ${images.length}`);
      images.forEach((img, i) => {
        console.log(`[CardGenerator]   Image ${i + 1}: ${img.description || '(no description)'}`);
      });

      let finalPrompt: string;

      if (isEdit) {
        // EDIT MODE: Skip OpenAI, send user's edit request directly to Gemini
        finalPrompt = `Edit this product card image.

IMAGE 1: Original product photo - keep the product exactly as shown, do not modify it
IMAGE 2: Current card design - apply the requested changes to this card

EDIT REQUEST: ${userPrompt}

Important: Preserve the product from IMAGE 1 unchanged. Only modify the card design according to the edit request.

${ASPECT_RATIO}`;
        
        console.log(`[CardGenerator] EDIT MODE - Skipping OpenAI, sending directly to Gemini`);
      } else {
        // CREATE/SLIDE MODE: Use OpenAI to generate optimized prompt
        console.log(`[CardGenerator] Using OpenAI to generate prompt...`);
        
        finalPrompt = await openai.generateImagePrompt({
          userPrompt,
          images: images.map(img => ({ description: img.description })),
          slideNumber,
          isFirstSlide,
          isEdit: false,
          styleReference,
          previousSlides,
        });

        // Append aspect ratio to OpenAI-generated prompt
        finalPrompt = `${finalPrompt}\n\n${ASPECT_RATIO}\n\n
        - If texts on the card aren't clear – regenerate
        - If you've repeated the same element twice – regenerate
        - If there's any problems that make card not ready to post on marketplace right now – regenerate
      `;

        console.log(`[CardGenerator] OpenAI generated prompt (${finalPrompt.length} chars)`);
      }

      // Generate image using Gemini
      console.log(`[CardGenerator] Sending to Gemini with ${images.length} input images...`);
      
      const imageUrls = images.map(img => img.url);
      const result = await gemini.generateImageFromUrls(finalPrompt, imageUrls);

      if (!result.success) {
        console.error(`[CardGenerator] Gemini failed: ${result.error}`);
        return {
          success: false,
          error: result.error,
          generatedPrompt: finalPrompt,
        };
      }

      console.log(`[CardGenerator] Image generated successfully`);

      return {
        success: true,
        imageBuffer: result.imageBuffer,
        mimeType: result.mimeType,
        generatedPrompt: finalPrompt,
      };
    } catch (error: any) {
      console.error('[CardGenerator] Error:', error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Generate carousel slide with style consistency
   */
  async generateCarouselSlide(params: CardGenerationParams): Promise<CardGenerationResult> {
    return this.generateCard(params);
  }

  /**
   * Edit existing card - DIRECT to Gemini (no OpenAI)
   * Sends: product photo + current card + user's edit request
   */
  async editCard(
    productImageUrl: string,
    currentCardUrl: string,
    editRequest: string
  ): Promise<CardGenerationResult> {
    console.log(`\n[CardGenerator] ========== EDIT CARD ==========`);
    console.log(`[CardGenerator] Edit request: ${editRequest}`);
    
    const finalPrompt = `Edit this product card image.

IMAGE 1: Original product photo - keep the product exactly as shown, do not modify it
IMAGE 2: Current card design - apply the requested changes to this card

EDIT REQUEST: ${editRequest}

Important: Preserve the product from IMAGE 1 unchanged. Only modify the card design according to the edit request.

${ASPECT_RATIO}`;

    const result = await gemini.generateImageFromUrls(finalPrompt, [productImageUrl, currentCardUrl]);
    
    return {
      success: result.success,
      imageBuffer: result.imageBuffer,
      mimeType: result.mimeType,
      generatedPrompt: finalPrompt,
      error: result.error,
    };
  }

  /**
   * Simple image edit (single image + prompt) - direct Gemini call
   */
  async editImage(imageUrl: string, editPrompt: string): Promise<CardGenerationResult> {
    try {
      console.log(`[CardGenerator] Editing image...`);

      // Add aspect ratio to simple edit
      const promptWithRatio = `${editPrompt}\n\n${ASPECT_RATIO}`;
      const result = await gemini.editImage(promptWithRatio, imageUrl);

      if (!result.success) {
        return {
          success: false,
          error: result.error,
        };
      }

      return {
        success: true,
        imageBuffer: result.imageBuffer,
        mimeType: result.mimeType,
        generatedPrompt: promptWithRatio,
      };
    } catch (error: any) {
      console.error('[CardGenerator] Edit error:', error.message);
      return {
        success: false,
        error: error.message,
      };
    }
  }

  /**
   * Generate with enhanced prompt (uses OpenAI for prompt, then Gemini)
   */
  async generateWithEnhancedPrompt(
    imageUrl: string,
    userPrompt: string,
    imageDescription?: string
  ): Promise<CardGenerationResult> {
    return this.generateCard({
      images: [{ url: imageUrl, description: imageDescription }],
      userPrompt,
    });
  }
}

export const cardGenerator = new CardGeneratorService();
```

# src/services/gemini.ts

```ts
import axios from 'axios';
import { config } from '../config';


export interface GeminiImageInput {
  base64: string;
  mimeType: string;
}

export interface GeminiGenerationResult {
  success: boolean;
  imageBuffer?: Buffer;
  mimeType?: string;
  error?: string;
  textResponse?: string;
}

class GeminiService {
  private apiKey: string;
  private model: string;
  private baseUrl: string;

  constructor() {
    this.apiKey = config.gemini.apiKey;
    this.model = config.gemini.model;
    this.baseUrl = 'https://generativelanguage.googleapis.com/v1beta';
  }

  /**
   * Download image from URL and convert to base64
   */
  async downloadImageAsBase64(url: string): Promise<GeminiImageInput> {
    try {
      const response = await axios.get(url, {
        responseType: 'arraybuffer',
        timeout: 30000,
      });

      const buffer = Buffer.from(response.data);
      const base64 = buffer.toString('base64');
      
      // Detect mime type from response header, URL extension, or magic bytes
      let mimeType = this.detectMimeType(
        response.headers['content-type'],
        url,
        buffer
      );

      return { base64, mimeType };
    } catch (error: any) {
      console.error(`Failed to download image from ${url}:`, error.message);
      throw new Error(`Failed to download image: ${error.message}`);
    }
  }

  /**
   * Detect MIME type from various sources
   */
  private detectMimeType(
    contentType: string | undefined,
    url: string,
    buffer: Buffer
  ): string {
    // 1. Try content-type header (if not octet-stream)
    if (contentType && !contentType.includes('octet-stream')) {
      const mime = contentType.split(';')[0].trim();
      if (mime.startsWith('image/')) {
        return mime;
      }
    }

    // 2. Try URL extension
    const urlLower = url.toLowerCase();
    if (urlLower.includes('.jpg') || urlLower.includes('.jpeg')) {
      return 'image/jpeg';
    }
    if (urlLower.includes('.png')) {
      return 'image/png';
    }
    if (urlLower.includes('.gif')) {
      return 'image/gif';
    }
    if (urlLower.includes('.webp')) {
      return 'image/webp';
    }

    // 3. Try magic bytes
    if (buffer.length >= 4) {
      // JPEG: FF D8 FF
      if (buffer[0] === 0xFF && buffer[1] === 0xD8 && buffer[2] === 0xFF) {
        return 'image/jpeg';
      }
      // PNG: 89 50 4E 47
      if (buffer[0] === 0x89 && buffer[1] === 0x50 && buffer[2] === 0x4E && buffer[3] === 0x47) {
        return 'image/png';
      }
      // GIF: 47 49 46 38
      if (buffer[0] === 0x47 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x38) {
        return 'image/gif';
      }
      // WebP: 52 49 46 46 ... 57 45 42 50
      if (buffer[0] === 0x52 && buffer[1] === 0x49 && buffer[2] === 0x46 && buffer[3] === 0x46) {
        if (buffer.length >= 12 && buffer[8] === 0x57 && buffer[9] === 0x45 && buffer[10] === 0x42 && buffer[11] === 0x50) {
          return 'image/webp';
        }
      }
    }

    // 4. Default to JPEG (most common for photos)
    console.log(`[Gemini] Could not detect MIME type, defaulting to image/jpeg`);
    return 'image/jpeg';
  }

  /**
   * Generate image using Gemini with multiple input images
   * Supports up to 8 input images
   */
  async generateImage(
    prompt: string,
    images: GeminiImageInput[]
  ): Promise<GeminiGenerationResult> {
    if (images.length === 0) {
      return { success: false, error: 'At least one image is required' };
    }

    if (images.length > 8) {
      return { success: false, error: 'Maximum 8 images allowed' };
    }

    // Build parts array: images first, then text prompt
    const parts: any[] = [];

    // Add all images
    for (const img of images) {
      parts.push({
        inlineData: {
          mimeType: img.mimeType,
          data: img.base64,
        },
      });
    }

    // Add text prompt
    parts.push({
      text: prompt,
    });

    const requestBody = {
      contents: [
        {
          parts,
        },
      ],
      generationConfig: {
        responseModalities: ['TEXT', 'IMAGE'],
      },
    };

    try {
      const response = await axios.post(
        `${this.baseUrl}/models/${this.model}:generateContent?key=${this.apiKey}`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
          },
          timeout: 120000, // 2 minutes timeout
        }
      );

      // Extract image from response
      const candidates = response.data?.candidates;
      if (!candidates || candidates.length === 0) {
        return { success: false, error: 'No candidates in response' };
      }

      const content = candidates[0]?.content;
      if (!content?.parts) {
        return { success: false, error: 'No content parts in response' };
      }

      // Find image part
      let imageData: string | null = null;
      let imageMimeType = 'image/png';
      let textResponse = '';

      for (const part of content.parts) {
        if (part.inlineData) {
          imageData = part.inlineData.data;
          imageMimeType = part.inlineData.mimeType || 'image/png';
        }
        if (part.text) {
          textResponse += part.text;
        }
      }

      if (!imageData) {
        return { 
          success: false, 
          error: 'No image in response',
          textResponse: textResponse || undefined,
        };
      }

      const imageBuffer = Buffer.from(imageData, 'base64');

      return {
        success: true,
        imageBuffer,
        mimeType: imageMimeType,
        textResponse: textResponse || undefined,
      };
    } catch (error: any) {
      console.error('Gemini API error:', error.response?.data || error.message);
      
      // Extract error message from API response
      const apiError = error.response?.data?.error?.message || error.message;
      
      return {
        success: false,
        error: `Gemini generation failed: ${apiError}`,
      };
    }
  }

  /**
   * Generate image from URLs (convenience method)
   * Downloads all images and calls generateImage
   */
  async generateImageFromUrls(
    prompt: string,
    imageUrls: string[]
  ): Promise<GeminiGenerationResult> {
    try {
      console.log(`\n[Gemini] ========== GENERATION REQUEST ==========`);
      console.log(`[Gemini] Images: ${imageUrls.length}`);
      console.log(`[Gemini] Prompt length: ${prompt.length} chars`);
      console.log(`[Gemini] FINAL PROMPT:\n${prompt}`);
      console.log(`[Gemini] ==========================================\n`);
      
      // Download all images in parallel
      const downloadPromises = imageUrls.map(url => this.downloadImageAsBase64(url));
      const images = await Promise.all(downloadPromises);

      return this.generateImage(prompt, images);
    } catch (error: any) {
      return {
        success: false,
        error: `Failed to prepare images: ${error.message}`,
      };
    }
  }

  /**
   * Edit/transform an image with a prompt
   */
  async editImage(
    prompt: string,
    imageUrl: string
  ): Promise<GeminiGenerationResult> {
    return this.generateImageFromUrls(prompt, [imageUrl]);
  }
}

export const gemini = new GeminiService();
```

# src/services/n8n.ts

```ts
import axios from 'axios';
import { config } from '../config';

interface ImageGenerationParams {
  photoUrl: string;
  description?: string;
  style?: string;
  userId: string;
  orderId: string;
  sessionId: string;
}

interface ImageEditParams {
  photoUrl: string;
  description: string;
  userId: string;
  orderId: string;
  sessionId: string;
}

interface PhotoSessionParams {
  photoUrl: string;
  description?: string;
  count?: number;
  userId: string;
  orderId: string;
}

interface CarouselImageInput {
  url: string;
  role: 'product' | 'style_reference' | 'previous_slide' | 'inspiration' | 'background' | 'element' | 'logo' | 'other';
  description?: string;
  index: number;
}

interface CarouselSlideParams {
  // Multiple input images (up to 8)
  images: CarouselImageInput[];
  
  // Legacy: primary product image URL (for backward compatibility)
  originalImageUrl: string;
  
  // Prompt and slide info
  prompt: string;
  slideNumber: number;
  isFirstSlide: boolean;
  
  // Style reference (for slides 2+)
  styleReference?: {
    imageUrl: string;
    styleDescription: string;
  } | null;
  
  // Previous slides context
  previousSlides: Array<{
    imageUrl: string;
    prompt: string;
    style?: string;
  }>;
  
  // IDs
  userId: string;
  orderId: string;
  sessionId: string;
}

interface N8NResponse {
  success: boolean;
  images?: string[];
  buffer?: Uint8Array;
  contentType?: string;
  filename?: string;
  error?: string;
  message?: string;
  extractedStyle?: string;
}

class N8NService {
  private webhookUrl: string;

  constructor() {
    this.webhookUrl = config.n8n.webhookUrl;
  }

  async generateImageCard(params: ImageGenerationParams): Promise<N8NResponse> {
    try {
      const response = await axios.post(
        `${this.webhookUrl}/carousel-slide`,
        {
          photo_url: params.photoUrl,
          description: params.description || '',
          style: params.style || 'modern',
          user_id: params.userId,
          order_id: params.orderId,
          session_id: params.sessionId,
          action: 'generate_card',
        },
        {
          timeout: 120000,
          responseType: 'arraybuffer',
          transformResponse: (data) => data,
          headers: {
            Accept: 'image/jpeg,image/png',
          },
        }
      );

      const uint8 = new Uint8Array(response.data);

      return {
        success: true,
        buffer: uint8,
        contentType: response.headers['content-type'],
      };
    } catch (error: any) {
      console.error('n8n image card generation error:', error.message);
      return {
        success: false,
        error: 'Ошибка генерации карточки',
      };
    }
  }

  async editImage(params: ImageEditParams): Promise<N8NResponse> {
    try {
      const response = await axios.post(
        `${this.webhookUrl}/image-edit`,
        {
          photo_url: params.photoUrl,
          description: params.description,
          user_id: params.userId,
          order_id: params.orderId,
          session_id: params.sessionId,
          action: 'edit_image',
        },
        {
          timeout: 120000,
          responseType: 'arraybuffer',
          transformResponse: (data) => data,
          headers: {
            Accept: 'image/jpeg,image/png',
          },
        }
      );

      const uint8 = new Uint8Array(response.data);

      return {
        success: true,
        buffer: uint8,
        contentType: response.headers['content-type'],
      };
    } catch (error: any) {
      console.error('n8n image edit error:', error.message);
      return {
        success: false,
        error: 'Ошибка редактирования изображения',
      };
    }
  }

  async generatePhotoSession(params: PhotoSessionParams): Promise<N8NResponse> {
    try {
      const response = await axios.post(
        `${this.webhookUrl}/photo-session`,
        {
          photo_url: params.photoUrl,
          description: params.description || '',
          count: params.count || 5,
          user_id: params.userId,
          order_id: params.orderId,
          action: 'generate_session',
        },
        {
          timeout: 180000,
          responseType: 'arraybuffer',
          transformResponse: (data) => data,
          headers: {
            Accept: 'image/jpeg,image/png',
          },
        }
      );

      const uint8 = new Uint8Array(response.data);

      return {
        success: true,
        buffer: uint8,
        contentType: response.headers['content-type'],
      };
    } catch (error: any) {
      console.error('n8n photo session generation error:', error.message);
      return {
        success: false,
        error: 'Ошибка генерации фотосессии',
      };
    }
  }

  async checkStatus(orderId: string): Promise<N8NResponse> {
    try {
      const response = await axios.get(`${this.webhookUrl}/status/${orderId}`, {
        timeout: 10000,
      });

      return response.data;
    } catch (error: any) {
      console.error('n8n status check error:', error.message);
      return {
        success: false,
        error: 'Ошибка проверки статуса',
      };
    }
  }

  /**
   * Generate a carousel slide with style consistency
   * Supports up to 8 input images with role attribution
   * Falls back to /carousel-slide endpoint if /carousel-slide is not available
   */
  async generateCarouselSlide(params: CarouselSlideParams): Promise<N8NResponse> {
    try {
      // Prepare images array with attribution
      const imagesPayload = params.images.map((img, idx) => ({
        url: img.url,
        role: img.role,
        description: img.description || this.getDefaultDescription(img.role),
        index: img.index || idx + 1,
      }));

      // Try carousel-specific endpoint first
      const response = await axios.post(
        `${this.webhookUrl}/carousel-slide`,
        {
          // Multiple images with attribution (up to 8)
          images: imagesPayload,
          
          // Legacy field for backward compatibility
          original_image_url: params.originalImageUrl,
          
          // Current slide info
          prompt: params.prompt,
          slide_number: params.slideNumber,
          is_first_slide: params.isFirstSlide,
          
          // Style reference (for slides 2+)
          style_reference: params.styleReference ? {
            image_url: params.styleReference.imageUrl,
            style_description: params.styleReference.styleDescription,
          } : null,
          
          // Previous slides for context
          previous_slides: params.previousSlides.map(s => ({
            image_url: s.imageUrl,
            prompt: s.prompt,
            style: s.style || null,
          })),
          
          // IDs for tracking
          user_id: params.userId,
          order_id: params.orderId,
          session_id: params.sessionId,
          
          action: 'generate_carousel_slide',
        },
        {
          timeout: 120000,
          responseType: 'arraybuffer',
          transformResponse: (data) => data,
          headers: {
            Accept: 'image/jpeg,image/png',
          },
        }
      );

      const uint8 = new Uint8Array(response.data);
      const extractedStyle = response.headers['x-extracted-style'] || undefined;

      return {
        success: true,
        buffer: uint8,
        contentType: response.headers['content-type'],
        extractedStyle,
      };
    } catch (error: any) {
      // If carousel endpoint fails, fallback to image-card endpoint
      console.log('Carousel endpoint failed, falling back to image-card:', error.message);
      
      try {
        // Build enhanced prompt with image context
        let enhancedPrompt = params.prompt;
        
        // Add image context to prompt
        if (params.images.length > 1) {
          const imageContext = params.images
            .filter(img => img.role !== 'product')
            .map(img => `[${img.role.toUpperCase()}]: ${img.description || 'reference image'}`)
            .join('\n');
          
          if (imageContext) {
            enhancedPrompt = `${params.prompt}\n\nADDITIONAL REFERENCES:\n${imageContext}`;
          }
        }
        
        if (!params.isFirstSlide && params.styleReference) {
          enhancedPrompt = `CAROUSEL SLIDE ${params.slideNumber} - MUST MATCH STYLE OF SLIDE 1\n\n` +
            `Style Reference: ${params.styleReference.styleDescription}\n\n` +
            `This slide should show: ${enhancedPrompt}\n\n` +
            `IMPORTANT: Maintain exact same visual style, colors, typography, and mood as the first slide.`;
        }
        
        const fallbackResponse = await axios.post(
          `${this.webhookUrl}/carousel-slide`,
          {
            photo_url: params.originalImageUrl,
            description: enhancedPrompt,
            style: 'carousel',
            user_id: params.userId,
            order_id: params.orderId,
            session_id: params.sessionId,
            action: 'generate_card',
          },
          {
            timeout: 120000,
            responseType: 'arraybuffer',
            transformResponse: (data) => data,
            headers: {
              Accept: 'image/jpeg,image/png',
            },
          }
        );

        const uint8 = new Uint8Array(fallbackResponse.data);

        return {
          success: true,
          buffer: uint8,
          contentType: fallbackResponse.headers['content-type'],
        };
      } catch (fallbackError: any) {
        console.error('Fallback to image-card also failed:', fallbackError.message);
        return {
          success: false,
          error: 'Ошибка генерации слайда карусели',
        };
      }
    }
  }

  /**
   * Get default description for image role
   */
  private getDefaultDescription(role: string): string {
    const descriptions: Record<string, string> = {
      product: 'Main product photo - DO NOT modify the product itself',
      style_reference: 'Style reference - match this visual style exactly',
      previous_slide: 'Previous carousel slide - maintain consistency',
      inspiration: 'Design inspiration - use as creative reference',
      background: 'Background reference - use similar background style',
      element: 'Design element - incorporate this element',
      logo: 'Brand logo - place appropriately on the card',
      other: 'Additional reference image',
    };
    return descriptions[role] || 'Reference image';
  }
}

export const n8n = new N8NService();
```

# src/services/notificationBot.ts

```ts
import { Bot } from 'grammy';
import { config } from '../config';

class NotificationBotService {
  private bot: Bot | null = null;
  private chatIds: Set<number> = new Set();

  constructor() {
    if (config.notificationBotToken) {
      this.bot = new Bot(config.notificationBotToken);
      this.setupHandlers();
      this.start();
    } else {
      console.warn('Notification bot token not set, notifications disabled');
    }
  }

  private setupHandlers() {
    if (!this.bot) return;

    // When bot is added to a group, save the chat ID
    this.bot.on('my_chat_member', async (ctx) => {
      const chat = ctx.chat;
      const newStatus = ctx.myChatMember.new_chat_member.status;

      if (newStatus === 'member' || newStatus === 'administrator') {
        this.chatIds.add(chat.id);
        console.log(`Notification bot added to chat: ${chat.id} (${chat.type})`);
        
        await ctx.reply('✅ Бот уведомлений активирован!\n\nЯ буду присылать уведомления о покупках в этот чат.');
      } else if (newStatus === 'left' || newStatus === 'kicked') {
        this.chatIds.delete(chat.id);
        console.log(`Notification bot removed from chat: ${chat.id}`);
      }
    });

    // Command to check bot status
    this.bot.command('status', async (ctx) => {
      await ctx.reply('🤖 Бот уведомлений работает!');
    });
  }

  private async start() {
    if (!this.bot) return;

    try {
      await this.bot.start({
        onStart: (botInfo) => {
          console.log(`🔔 Notification bot started: @${botInfo.username}`);
        },
      });
    } catch (error) {
      console.error('Failed to start notification bot:', error);
    }
  }

  // Send notification to all registered chats
  async notify(message: string, parseMode: 'HTML' | 'Markdown' = 'HTML'): Promise<void> {
    if (!this.bot || this.chatIds.size === 0) {
      console.log('No chats to notify or bot not initialized');
      return;
    }

    for (const chatId of this.chatIds) {
      try {
        await this.bot.api.sendMessage(chatId, message, { parse_mode: parseMode });
      } catch (error) {
        console.error(`Failed to send notification to chat ${chatId}:`, error);
        // Remove chat if we can't send to it
        this.chatIds.delete(chatId);
      }
    }
  }

  // Notify about token purchase
  async notifyPurchase(
    userId: string,
    username: string | undefined,
    packageName: string,
    credits: number,
    amount: number,
    currency: string
  ): Promise<void> {
    const message = `💰 <b>Новая покупка!</b>

👤 Пользователь: ${username ? `@${username}` : `ID: ${userId}`}
📦 Пакет: <b>${packageName}</b>
🎯 Кредиты: <b>${credits}</b>
💵 Сумма: <b>${amount} ${currency}</b>

🕐 ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

    await this.notify(message);
  }

  // Notify about new user registration
  async notifyNewUser(
    userId: string,
    username: string | undefined,
    firstName: string | undefined
  ): Promise<void> {
    const message = `🆕 <b>Новый пользователь!</b>

👤 ${firstName || 'Без имени'} ${username ? `(@${username})` : ''}
🆔 ID: <code>${userId}</code>

🕐 ${new Date().toLocaleString('ru-RU', { timeZone: 'Europe/Moscow' })}`;

    await this.notify(message);
  }

  // Add chat ID manually (e.g., from env or database)
  addChatId(chatId: number): void {
    this.chatIds.add(chatId);
  }

  // Get current chat IDs
  getChatIds(): number[] {
    return Array.from(this.chatIds);
  }
}

export const notificationBot = new NotificationBotService();
```

# src/services/openai.ts

```ts
import OpenAI from 'openai';
import { config } from '../config';
import { promptsService } from './prompts';

export interface ImageInput {
  description?: string; // User's caption for the image
}

export interface PromptGenerationParams {
  userPrompt: string;
  images: ImageInput[];
  slideNumber: number;
  isFirstSlide: boolean;
  isEdit?: boolean; // True when editing an existing card
  styleReference?: string;
  previousSlides?: Array<{ prompt: string }>;
}

class OpenAIService {
  private client: OpenAI;
  private model: string;

  constructor() {
    this.client = new OpenAI({
      apiKey: config.openai.apiKey,
    });
    this.model = config.openai.model;
  }

  /**
   * Generate optimized prompt for Gemini image generation
   * Uses only user-provided descriptions for images
   * 
   * Modes:
   * - isEdit=true: Uses card_edit prompts (for editing existing cards)
   * - isFirstSlide=true: Uses first_slide prompts
   * - else: Uses next_slide prompts
   */
  async generateImagePrompt(params: PromptGenerationParams): Promise<string> {
    // Build image context from user descriptions ONLY
    const imageContext = promptsService.buildImageContext(params.images);

    // Determine which prompts to use
    let systemPromptKey: string;
    let userPromptKey: string;

    if (params.isEdit) {
      // Edit mode: use card edit prompts
      systemPromptKey = 'card_edit_system';
      userPromptKey = 'card_edit_user';
    } else if (params.isFirstSlide) {
      // First generation
      systemPromptKey = 'first_slide_system';
      userPromptKey = 'first_slide_user';
    } else {
      // Subsequent slides
      systemPromptKey = 'next_slide_system';
      userPromptKey = 'next_slide_user';
    }

    // Build style reference section (for non-edit mode)
    let styleReferenceText = '';
    if (!params.isEdit && !params.isFirstSlide && params.styleReference) {
      styleReferenceText = `\nSTYLE REFERENCE FROM SLIDE 1:\n${params.styleReference}`;
    }

    // Build previous slides section (for non-edit mode)
    let previousSlidesText = '';
    if (!params.isEdit && params.previousSlides && params.previousSlides.length > 0) {
      previousSlidesText = '\nPREVIOUS SLIDES:';
      params.previousSlides.forEach((slide, idx) => {
        previousSlidesText += `\nSlide ${idx + 1}: ${slide.prompt}`;
      });
    }

    const systemPrompt = await promptsService.getTemplate(systemPromptKey);
    let userMessage = await promptsService.getTemplate(userPromptKey);
    
    // Replace variables in user template
    userMessage = userMessage
      .replace(/\{\{userPrompt\}\}/g, params.userPrompt)
      .replace(/\{\{imageCount\}\}/g, String(params.images.length))
      .replace(/\{\{imageContext\}\}/g, imageContext)
      .replace(/\{\{slideNumber\}\}/g, String(params.slideNumber))
      .replace(/\{\{styleReference\}\}/g, styleReferenceText)
      .replace(/\{\{previousSlides\}\}/g, previousSlidesText);

    try {
      const response = await this.client.chat.completions.create({
        model: this.model,
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userMessage },
        ],
        temperature: 0.7,
        max_completion_tokens: 4000,
      });

      const generatedPrompt = response.choices[0]?.message?.content || '';
      
      // Clean up the prompt (remove markdown code blocks if present)
      return generatedPrompt
        .replace(/\`\`\`[\s\S]*?\`\`\`/g, (match) => match.replace(/\`\`\`\w*\n?/g, '').trim())
        .trim();
    } catch (error: any) {
      console.error('OpenAI prompt generation error:', error.message);
      throw new Error(`Failed to generate prompt: ${error.message}`);
    }
  }

  /**
   * Simple completion for other use cases
   */
  async complete(prompt: string, systemPrompt?: string): Promise<string> {
    try {
      const messages: OpenAI.Chat.ChatCompletionMessageParam[] = [];
      
      if (systemPrompt) {
        messages.push({ role: 'system', content: systemPrompt });
      }
      messages.push({ role: 'user', content: prompt });

      const response = await this.client.chat.completions.create({
        model: this.model,
        messages,
        temperature: 0.7,
        max_completion_tokens: 4000,
      });

      return response.choices[0]?.message?.content || '';
    } catch (error: any) {
      console.error('OpenAI completion error:', error.message);
      throw new Error(`Failed to complete: ${error.message}`);
    }
  }
}

export const openai = new OpenAIService();
```

# src/services/prompts.ts

```ts
import { supabase } from './supabase';
import {
  FIRST_SLIDE_SYSTEM_PROMPT,
  FIRST_SLIDE_USER_PROMPT,
  NEXT_SLIDE_SYSTEM_PROMPT,
  NEXT_SLIDE_USER_PROMPT,
  IMAGE_EDIT_SYSTEM_PROMPT,
  IMAGE_EDIT_USER_PROMPT,
  CARD_EDIT_SYSTEM_PROMPT,
  CARD_EDIT_USER_PROMPT,
  buildImageContext,
  type PromptTemplate,
} from '../constants/prompts';

interface CachedPrompt {
  template: string;
  cachedAt: number;
}

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

class PromptsService {
  private cache: Map<string, CachedPrompt> = new Map();

  /**
   * Get prompt template from database or fallback to default
   */
  async getTemplate(id: string): Promise<string> {
    // Check cache first
    const cached = this.cache.get(id);
    if (cached && Date.now() - cached.cachedAt < CACHE_TTL) {
      return cached.template;
    }

    try {
      const data = await supabase.getPromptTemplate(id);

      if (data) {
        this.cache.set(id, {
          template: data.template,
          cachedAt: Date.now(),
        });
        return data.template;
      }
    } catch (e) {
      // Silently fallback to defaults
    }

    return this.getDefaultTemplate(id);
  }

  /**
   * Get default template (hardcoded fallback)
   */
  private getDefaultTemplate(id: string): string {
    const defaults: Record<string, string> = {
      first_slide_system: FIRST_SLIDE_SYSTEM_PROMPT,
      first_slide_user: FIRST_SLIDE_USER_PROMPT,
      next_slide_system: NEXT_SLIDE_SYSTEM_PROMPT,
      next_slide_user: NEXT_SLIDE_USER_PROMPT,
      image_edit_system: IMAGE_EDIT_SYSTEM_PROMPT,
      image_edit_user: IMAGE_EDIT_USER_PROMPT,
      card_edit_system: CARD_EDIT_SYSTEM_PROMPT,
      card_edit_user: CARD_EDIT_USER_PROMPT,
    };

    return defaults[id] || '';
  }

  /**
   * Get all templates (for admin panel)
   */
  async getAllTemplates(): Promise<PromptTemplate[]> {
    const data = await supabase.getAllPromptTemplates();
    return data.map(d => ({
      id: d.id,
      name: d.name,
      description: d.description,
      template: d.template,
      variables: d.variables,
      category: d.category as PromptTemplate['category'],
      isSystem: d.is_system,
    }));
  }

  /**
   * Update template (from admin panel)
   */
  async updateTemplate(id: string, template: string): Promise<boolean> {
    const success = await supabase.updatePromptTemplate(id, template);
    if (success) {
      this.cache.delete(id);
    }
    return success;
  }

  /**
   * Create new template
   */
  async createTemplate(data: {
    id: string;
    name: string;
    description?: string;
    template: string;
    variables?: string[];
    category: PromptTemplate['category'];
    isSystem?: boolean;
  }): Promise<boolean> {
    return supabase.createPromptTemplate({
      id: data.id,
      name: data.name,
      description: data.description,
      template: data.template,
      variables: data.variables,
      category: data.category,
      is_system: data.isSystem,
    });
  }

  /**
   * Delete template
   */
  async deleteTemplate(id: string): Promise<boolean> {
    const success = await supabase.deletePromptTemplate(id);
    if (success) {
      this.cache.delete(id);
    }
    return success;
  }

  /**
   * Clear cache
   */
  clearCache(): void {
    this.cache.clear();
  }

  /**
   * Build image context from user descriptions
   */
  buildImageContext(images: Array<{ description?: string }>): string {
    return buildImageContext(images);
  }
}

export const promptsService = new PromptsService();
```

# src/services/supabase.ts

```ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { config } from '../config';
import { User, Order, Payment } from '../types';

interface ReferralParams {
  referralCode?: string;
  utmSource?: string;
  utmCampaign?: string;
  utmMedium?: string;
  startParam?: string;
}

class SupabaseService {
  private _client: SupabaseClient;
  private bucketName = 'generated-images';

  constructor() {
    this._client = createClient(config.supabase.url, config.supabase.serviceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    });
  }

  // Public getter for direct database access
  get client(): SupabaseClient {
    return this._client;
  }

  // Upload image to Supabase Storage
  async uploadImage(
    buffer: Buffer,
    userId: string,
    orderId: string,
    type: 'card' | 'edit' | 'session' = 'card'
  ): Promise<string | null> {
    try {
      const timestamp = Date.now();
      const fileName = `${type}/${userId}/${orderId}_${timestamp}.jpg`;

      const { error } = await this._client.storage
        .from(this.bucketName)
        .upload(fileName, buffer, {
          contentType: 'image/jpeg',
          upsert: false,
        });

      if (error) {
        console.error('Supabase storage upload error:', error);
        return null;
      }

      const { data: urlData } = this._client.storage
        .from(this.bucketName)
        .getPublicUrl(fileName);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Upload image error:', error);
      return null;
    }
  }

  // User operations
  async getUser(telegramId: number): Promise<User | null> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('telegram_id', telegramId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  }

  // Find user by referral code
  async getUserByReferralCode(code: string): Promise<User | null> {
    const { data, error } = await this.client
      .from('users')
      .select('*')
      .eq('referral_code', code.toLowerCase())
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  }

  async createUser(
    telegramId: number,
    username?: string,
    firstName?: string,
    lastName?: string,
    referralParams?: ReferralParams
  ): Promise<User> {
    // Find referrer if referral code provided
    let referrerId: string | null = null;
    
    if (referralParams?.referralCode) {
      try {
        const referrer = await this.getUserByReferralCode(referralParams.referralCode);
        if (referrer) {
          referrerId = referrer.id;
          // Increment referrer's count
          await this.client
            .from('users')
            .update({ 
              referrals_count: (referrer.referrals_count || 0) + 1,
              updated_at: new Date().toISOString()
            })
            .eq('id', referrer.id);
        }
      } catch (err) {
        console.error('Error finding referrer:', err);
        // Continue without referrer
      }
    }

    const { data, error } = await this.client
      .from('users')
      .insert({
        telegram_id: telegramId,
        username: username || null,
        first_name: firstName || null,
        last_name: lastName || null,
        plan: 'free',
        credits: 12,
        cards_created: 0,
        referred_by: referrerId,
        utm_source: referralParams?.utmSource || null,
        utm_campaign: referralParams?.utmCampaign || null,
        utm_medium: referralParams?.utmMedium || null,
        start_param: referralParams?.startParam || null,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateUser(userId: string, updates: Partial<User>): Promise<User> {
    const { data, error } = await this.client
      .from('users')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', userId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateUserCredits(userId: string, creditsChange: number): Promise<User> {
    const { data: user } = await this.client
      .from('users')
      .select('credits')
      .eq('id', userId)
      .single();

    if (!user) throw new Error('User not found');

    const newCredits = user.credits + creditsChange;
    return this.updateUser(userId, { credits: newCredits });
  }

  async incrementCardsCreated(userId: string): Promise<void> {
    try {
      // Try using the RPC function first
      const { error: rpcError } = await this._client.rpc('increment_cards_created', { p_user_id: userId });
      
      if (rpcError) {
        console.error('RPC increment_cards_created error:', rpcError);
        // Fallback: direct update
        const { data: user } = await this.client
          .from('users')
          .select('cards_created')
          .eq('id', userId)
          .single();
        
        if (user) {
          await this.client
            .from('users')
            .update({ 
              cards_created: (user.cards_created || 0) + 1,
              updated_at: new Date().toISOString()
            })
            .eq('id', userId);
        }
      }
    } catch (err) {
      console.error('incrementCardsCreated error:', err);
      // Silent fail - not critical
    }
  }

  // Get user's referral stats
  async getReferralStats(userId: string): Promise<{
    referralCode: string;
    referralsCount: number;
    earnings: number;
  }> {
    try {
      const { data, error } = await this.client
        .from('users')
        .select('referral_code, referrals_count, referral_earnings')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('getReferralStats error:', error);
        return { referralCode: '', referralsCount: 0, earnings: 0 };
      }

      return {
        referralCode: data?.referral_code || '',
        referralsCount: data?.referrals_count || 0,
        earnings: Number(data?.referral_earnings) || 0,
      };
    } catch (err) {
      console.error('getReferralStats error:', err);
      return { referralCode: '', referralsCount: 0, earnings: 0 };
    }
  }

  // Process referral commission after payment
  async processReferralCommission(paymentId: string, commissionPercent = 10): Promise<void> {
    await this._client.rpc('process_referral_commission', {
      p_payment_id: paymentId,
      p_commission_percent: commissionPercent,
    });
  }

  // Order operations
  async createOrder(
    userId: string,
    type: 'image_card' | 'photo_session' | 'image_edit',
    inputData: any,
    creditsUsed: number
  ): Promise<Order> {
    const { data, error } = await this.client
      .from('orders')
      .insert({
        user_id: userId,
        type,
        status: 'pending',
        input_data: inputData,
        credits_used: creditsUsed,
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updateOrder(orderId: string, updates: Partial<Order>): Promise<Order> {
    const { data, error } = await this.client
      .from('orders')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', orderId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getUserOrders(userId: string, limit = 10): Promise<Order[]> {
    const { data, error } = await this.client
      .from('orders')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);

    if (error) throw error;
    return data || [];
  }

  // Payment operations
  async createPayment(
    userId: string,
    plan: string,
    amount: number,
    currency = 'RUB'
  ): Promise<Payment> {
    const { data, error } = await this.client
      .from('payments')
      .insert({
        user_id: userId,
        plan,
        amount,
        currency,
        status: 'pending',
      })
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async updatePayment(paymentId: string, updates: Partial<Payment>): Promise<Payment> {
    const { data, error } = await this.client
      .from('payments')
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq('id', paymentId)
      .select()
      .single();

    if (error) throw error;
    return data;
  }

  async getPayment(paymentId: string): Promise<Payment | null> {
    const { data, error } = await this.client
      .from('payments')
      .select('*')
      .eq('id', paymentId)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      throw error;
    }

    return data;
  }

  // Get or create user with referral tracking
  async getOrCreateUser(
    telegramId: number,
    username?: string,
    firstName?: string,
    lastName?: string,
    referralParams?: ReferralParams
  ): Promise<User> {
    let user = await this.getUser(telegramId);
    if (!user) {
      user = await this.createUser(telegramId, username, firstName, lastName, referralParams);
    }
    return user;
  }

  // ============================================
  // PROMPT TEMPLATES
  // ============================================

  /**
   * Get a prompt template by ID
   */
  async getPromptTemplate(id: string): Promise<{ id: string; template: string } | null> {
    const { data, error } = await this._client
      .from('prompt_templates')
      .select('id, template')
      .eq('id', id)
      .eq('is_active', true)
      .single();

    if (error) {
      if (error.code === 'PGRST116') return null;
      console.error('getPromptTemplate error:', error);
      return null;
    }

    return data;
  }

  /**
   * Get all prompt templates
   */
  async getAllPromptTemplates(): Promise<Array<{
    id: string;
    name: string;
    description: string;
    template: string;
    variables: string[];
    category: string;
    is_system: boolean;
    is_active: boolean;
    updated_at: string;
  }>> {
    const { data, error } = await this._client
      .from('prompt_templates')
      .select('*')
      .order('category')
      .order('is_system', { ascending: false });

    if (error) {
      console.error('getAllPromptTemplates error:', error);
      return [];
    }

    return data || [];
  }

  /**
   * Update a prompt template
   */
  async updatePromptTemplate(id: string, template: string): Promise<boolean> {
    const { error } = await this._client
      .from('prompt_templates')
      .update({ 
        template, 
        updated_at: new Date().toISOString() 
      })
      .eq('id', id);

    if (error) {
      console.error('updatePromptTemplate error:', error);
      return false;
    }

    return true;
  }

  /**
   * Create a new prompt template
   */
  async createPromptTemplate(data: {
    id: string;
    name: string;
    description?: string;
    template: string;
    variables?: string[];
    category: 'card_generation' | 'image_edit' | 'photo_session' | 'other';
    is_system?: boolean;
  }): Promise<boolean> {
    const { error } = await this._client
      .from('prompt_templates')
      .insert({
        id: data.id,
        name: data.name,
        description: data.description || '',
        template: data.template,
        variables: data.variables || [],
        category: data.category,
        is_system: data.is_system || false,
        is_active: true,
      });

    if (error) {
      console.error('createPromptTemplate error:', error);
      return false;
    }

    return true;
  }

  /**
   * Delete (deactivate) a prompt template
   */
  async deletePromptTemplate(id: string): Promise<boolean> {
    const { error } = await this._client
      .from('prompt_templates')
      .update({ 
        is_active: false,
        updated_at: new Date().toISOString() 
      })
      .eq('id', id);

    if (error) {
      console.error('deletePromptTemplate error:', error);
      return false;
    }

    return true;
  }
}

export const supabase = new SupabaseService();
```

# src/services/yookassa.ts

```ts
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';
import { config } from '../config';

interface CreatePaymentParams {
  amount: number;
  currency: string;
  description: string;
  returnUrl: string;
  metadata?: Record<string, any>;
}

interface PaymentResponse {
  id: string;
  status: string;
  paid: boolean;
  amount: {
    value: string;
    currency: string;
  };
  confirmation: {
    type: string;
    confirmation_url: string;
  };
  metadata?: Record<string, any>;
}

class YooKassaService {
  private baseUrl = 'https://api.yookassa.ru/v3';
  private auth: string;

  constructor() {
    this.auth = Buffer.from(`${config.yookassa.shopId}:${config.yookassa.secretKey}`).toString(
      'base64'
    );
  }

  async createPayment(params: CreatePaymentParams): Promise<PaymentResponse> {
    const idempotenceKey = uuidv4();

    try {
      const response = await axios.post(
        `${this.baseUrl}/payments`,
        {
          amount: {
            value: params.amount.toFixed(2),
            currency: params.currency,
          },
          confirmation: {
            type: 'redirect',
            return_url: params.returnUrl,
          },
          capture: true,
          description: params.description,
          metadata: params.metadata,
        },
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${this.auth}`,
            'Idempotence-Key': idempotenceKey,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('YooKassa payment creation error:', error.response?.data || error.message);
      throw new Error('Ошибка создания платежа');
    }
  }

  async getPayment(paymentId: string): Promise<PaymentResponse> {
    try {
      const response = await axios.get(`${this.baseUrl}/payments/${paymentId}`, {
        headers: {
          Authorization: `Basic ${this.auth}`,
        },
      });

      return response.data;
    } catch (error: any) {
      console.error('YooKassa get payment error:', error.response?.data || error.message);
      throw new Error('Ошибка получения информации о платеже');
    }
  }

  async cancelPayment(paymentId: string): Promise<PaymentResponse> {
    const idempotenceKey = uuidv4();

    try {
      const response = await axios.post(
        `${this.baseUrl}/payments/${paymentId}/cancel`,
        {},
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${this.auth}`,
            'Idempotence-Key': idempotenceKey,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error('YooKassa cancel payment error:', error.response?.data || error.message);
      throw new Error('Ошибка отмены платежа');
    }
  }

  isPaymentSucceeded(payment: PaymentResponse): boolean {
    return payment.status === 'succeeded' && payment.paid;
  }

  isPaymentPending(payment: PaymentResponse): boolean {
    return payment.status === 'pending';
  }

  isPaymentCanceled(payment: PaymentResponse): boolean {
    return payment.status === 'canceled';
  }
}

export const yookassa = new YooKassaService();
```

# src/types.ts

```ts
import { Context, SessionFlavor } from 'grammy';

export interface User {
  id: string;
  telegram_id: number;
  username?: string;
  first_name?: string;
  last_name?: string;
  plan: 'free' | 'starter' | 'pro' | 'business';
  credits: number;
  cards_created: number;
  // Referral fields
  referral_code?: string;
  referred_by?: string;
  referrals_count?: number;
  referral_earnings?: number;
  // UTM tracking
  utm_source?: string;
  utm_campaign?: string;
  utm_medium?: string;
  start_param?: string;
  // Admin fields
  total_spent?: number;
  is_blocked?: boolean;
  is_admin?: boolean;
  notes?: string;
  tags?: string[];
  // Timestamps
  created_at: string;
  updated_at: string;
}

export interface Order {
  id: string;
  user_id: string;
  type: 'image_card' | 'photo_session' | 'image_edit';
  status: 'pending' | 'processing' | 'completed' | 'failed';
  input_data: any;
  output_data?: any;
  credits_used: number;
  created_at: string;
  updated_at: string;
}

export interface Payment {
  id: string;
  user_id: string;
  plan: string;
  amount: number;
  currency: string;
  status: 'pending' | 'succeeded' | 'cancelled';
  yookassa_payment_id?: string;
  created_at: string;
  updated_at: string;
}

// Image generation session for tracking state
export interface ImageGenSession {
  sessionId: string; // Unique ID for n8n/ChatGPT memory
  photoUrl?: string;
  photoFileId?: string;
  prompt?: string;
  lastGeneratedImage?: Buffer;
  lastGeneratedImageUrl?: string;
  orderId?: string;
  generationCount: number;
}

// Image edit session
export interface ImageEditSession {
  sessionId: string; // Unique ID for n8n/ChatGPT memory
  photoUrl?: string;
  photoFileId?: string;
  prompt?: string;
  lastEditedImage?: Buffer;
  lastEditedImageUrl?: string;
  orderId?: string;
  editCount: number;
}

// Image input for AI generation
export interface ImageInput {
  url: string;
  fileId?: string;           // Telegram file_id
  description?: string;      // User's caption/note for this image
  index: number;             // Order in the array (1-8)
}

// Carousel slide data
export interface CarouselSlide {
  slideNumber: number;
  imageUrl: string;           // URL in storage (Banana/Supabase)
  imageFileId?: string;       // Telegram file_id for quick resend
  prompt: string;
  style?: string;             // Extracted/detected style description
  generatedAt: string;
}

// Carousel session for multi-slide generation
export interface CarouselSession {
  sessionId: string;
  
  // Input images (up to 8)
  inputImages: ImageInput[];
  
  // Primary product image (shortcut to first product image)
  originalImageUrl: string;
  originalImageFileId?: string;
  
  // Current working state
  currentSlideNumber: number;
  currentPrompt?: string;         // Original prompt for the card
  currentEditRequest?: string;    // Edit request (what to change)
  currentImageUrl?: string;       // Latest generated image URL
  currentImageFileId?: string;    // Latest generated image Telegram file_id
  currentImageBuffer?: Buffer;    // Latest generated image buffer
  
  // Finalized slides (confirmed by user)
  slides: CarouselSlide[];
  
  // Style reference (extracted from first finalized slide)
  styleReference?: {
    imageUrl: string;
    styleDescription: string;
  };
  
  // Generation tracking
  generationCount: number;       // Total generations in this session
  orderId?: string;              // Current order ID
  
  // Multi-image collection state
  isCollectingImages?: boolean;  // True when waiting for more images
  collectedImagesCount?: number;
}

export interface SessionData {
  currentRoute?: string;
  tempData?: any;
  lastMessageId?: number;
  processingMessageId?: number;
  // Legacy image generation session (keep for backward compatibility)
  imageGenSession?: ImageGenSession;
  // Image edit session
  imageEditSession?: ImageEditSession;
  // New carousel session
  carouselSession?: CarouselSession;
}

export type MyContext = Context & SessionFlavor<SessionData>;

export interface CreditPackage {
  id: string;
  name: string;
  emoji: string;
  credits: number;
  price: number;
  pricePerCard: number;
  cardsCount: number;
  description: string;
  badge?: string; // Optional badge like "ХИТ", "ВЫГОДНО"
  isPopular?: boolean;
}

// New pricing structure optimized for conversions
// 4 credits = 1 card generation, 2 credits = 1 edit
export const CREDIT_PACKAGES: Record<string, CreditPackage> = {
  starter: {
    id: 'starter',
    name: 'Starter',
    emoji: '',
    credits: 60,
    price: 590,
    pricePerCard: 39,
    cardsCount: 15,
    description: '',
  },
  pro: {
    id: 'pro',
    name: 'Pro',
    emoji: '',
    credits: 184,
    price: 1490,
    pricePerCard: 32,
    cardsCount: 46,
    description: 'Рекомендуем',
    isPopular: true,
  },
  big: {
    id: 'big',
    name: 'Big',
    emoji: '',
    credits: 664,
    price: 4990,
    pricePerCard: 30,
    cardsCount: 166,
    description: 'Выгодно',
  },
  enterprise: {
    id: 'enterprise',
    name: 'Enterprise',
    emoji: '',
    credits: 0,
    price: 10000,
    pricePerCard: 0,
    cardsCount: 0,
    description: 'Индивидуально',
  },
};

// Keep old PLANS for backward compatibility
export interface PlanDetails {
  name: string;
  credits: number;
  price: number;
  features: string[];
}

export const PLANS: Record<string, PlanDetails> = {
  starter: {
    name: 'Стартовый',
    credits: 50,
    price: 490,
    features: ['50 кредитов', 'Базовая поддержка'],
  },
  pro: {
    name: 'Профессиональный',
    credits: 200,
    price: 1490,
    features: ['200 кредитов', 'Приоритетная поддержка', 'Расширенные стили'],
  },
  business: {
    name: 'Бизнес',
    credits: 500,
    price: 2890,
    features: ['500 кредитов', 'Приоритетная поддержка', 'API доступ', 'Белый лейбл'],
  },
};

export const ROUTES = {
  MAIN_MENU: 'main_menu',
  IMAGE_CARD: 'image_card',
  IMAGE_CARD_WAITING_PHOTO: 'image_card_waiting_photo',
  IMAGE_CARD_WAITING_PROMPT: 'image_card_waiting_prompt',
  IMAGE_CARD_SESSION: 'image_card_session',
  // Carousel routes
  CAROUSEL_WAITING_PHOTO: 'carousel_waiting_photo',
  CAROUSEL_WAITING_PROMPT: 'carousel_waiting_prompt',
  CAROUSEL_SESSION: 'carousel_session',
  CAROUSEL_NEXT_SLIDE: 'carousel_next_slide',
  // Image edit
  IMAGE_EDIT: 'image_edit',
  IMAGE_EDIT_WAITING_PHOTO: 'image_edit_waiting_photo',
  IMAGE_EDIT_WAITING_PROMPT: 'image_edit_waiting_prompt',
  IMAGE_EDIT_SESSION: 'image_edit_session',
  PHOTO_SESSION: 'photo_session',
  PROFILE: 'profile',
  SUPPORT: 'support',
  BUY_CREDITS: 'buy_credits',
} as const;

export type RouteType = (typeof ROUTES)[keyof typeof ROUTES];
```

# src/utils/helpers.ts

```ts
import { MyContext } from '../types';

export class MessageManager {
  /**
   * Delete a message safely (catches errors if message doesn't exist)
   */
  static async deleteMessage(ctx: MyContext, messageId: number): Promise<void> {
    try {
      await ctx.api.deleteMessage(ctx.chat!.id, messageId);
    } catch (error) {
      // Ignore errors (message might be already deleted)
    }
  }

  /**
   * Delete multiple messages
   */
  static async deleteMessages(ctx: MyContext, messageIds: number[]): Promise<void> {
    for (const messageId of messageIds) {
      await this.deleteMessage(ctx, messageId);
    }
  }

  /**
   * Send a message and store its ID in session
   */
  static async sendAndStore(
    ctx: MyContext,
    text: string,
    extra?: any,
    storeKey = 'lastMessageId'
  ): Promise<number> {
    const message = await ctx.reply(text, extra);
    if (storeKey) {
      (ctx.session as any)[storeKey] = message.message_id;
    }
    return message.message_id;
  }

  /**
   * Update a message and store the new ID
   */
  static async editOrSend(
    ctx: MyContext,
    text: string,
    messageId?: number,
    extra?: any
  ): Promise<number> {
    // Try to delete old message
    if (messageId) {
      await this.deleteMessage(ctx, messageId);
    }

    // Send new message
    const message = await ctx.reply(text, extra);
    return message.message_id;
  }

  /**
   * Send a processing message that will be updated/deleted later
   */
  static async sendProcessing(ctx: MyContext, text: string): Promise<number> {
    const message = await ctx.reply(text);
    ctx.session.processingMessageId = message.message_id;
    return message.message_id;
  }

  /**
   * Delete the processing message
   */
  static async deleteProcessing(ctx: MyContext): Promise<void> {
    if (ctx.session.processingMessageId) {
      await this.deleteMessage(ctx, ctx.session.processingMessageId);
      ctx.session.processingMessageId = undefined;
    }
  }

  /**
   * Clean up old messages from session
   */
  static async cleanup(ctx: MyContext): Promise<void> {
    await this.deleteProcessing(ctx);
    if (ctx.session.lastMessageId) {
      await this.deleteMessage(ctx, ctx.session.lastMessageId);
      ctx.session.lastMessageId = undefined;
    }
  }
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const formatNumber = (num: number): string => {
  return num.toLocaleString('ru-RU');
};

export const escapeMarkdown = (text: string): string => {
  return text.replace(/[_*[\]()~`>#+=|{}.!-]/g, '\\$&');
};
```

# src/utils/keyboards.ts

```ts
import { InlineKeyboard } from 'grammy';
import { TEXTS, CALLBACKS } from '../constants/texts';
import { CREDIT_PACKAGES } from '../types';

export class KeyboardBuilder {
  // Main menu - now inline
  static mainMenu(): InlineKeyboard {
    return new InlineKeyboard()
      .text(TEXTS.BTN_IMAGE_CARD, CALLBACKS.IMAGE_CARD)
      //.text(TEXTS.BTN_IMAGE_EDIT, CALLBACKS.IMAGE_EDIT)
      .row()
      //.text(TEXTS.BTN_PHOTO_SESSION, CALLBACKS.PHOTO_SESSION)
      //.row()
      .text(TEXTS.BTN_MY_PROFILE, CALLBACKS.PROFILE)
      .text(TEXTS.BTN_SUPPORT, CALLBACKS.SUPPORT)
      .row()
      .text(TEXTS.BTN_BUY_CREDITS, CALLBACKS.BUY_CREDITS);
  }

  // Back to menu button
  static backToMenu(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image card - waiting for photo
  static imageCardWaitingPhoto(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image card - photo received, waiting for prompt
  static imageCardPhotoReceived(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image card session - after generation
  static imageCardSession(): InlineKeyboard {
    return new InlineKeyboard()
      .text('🔁 Повторить с тем же промптом', CALLBACKS.REGENERATE)
      .row()
      .text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image edit - waiting for photo
  static imageEditWaitingPhoto(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image edit - photo received, waiting for prompt
  static imageEditPhotoReceived(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Image edit session - after editing
  static imageEditSession(): InlineKeyboard {
    return new InlineKeyboard()
      .text('🔁 Повторить с тем же промптом', CALLBACKS.EDIT_REGENERATE)
      .row()
      .text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Photo session - waiting for photo
  static photoSessionWaiting(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Profile actions - inline
  static profileActions(): InlineKeyboard {
    return new InlineKeyboard()
      .text(TEXTS.PROFILE_BTN_BUY_CREDITS, CALLBACKS.PROFILE_BUY_CREDITS)
      .text(TEXTS.PROFILE_BTN_HISTORY, CALLBACKS.PROFILE_HISTORY)
      .row()
      .text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Support actions - inline
  static supportActions(): InlineKeyboard {
    return new InlineKeyboard()
      .text(TEXTS.SUPPORT_BTN_FAQ, CALLBACKS.SUPPORT_FAQ)
      .text(TEXTS.SUPPORT_BTN_CONTACT, CALLBACKS.SUPPORT_CONTACT)
      .row()
      .text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Credit packages selection - clean design
  static creditPackages(): InlineKeyboard {
    const starter = CREDIT_PACKAGES.starter;
    const pro = CREDIT_PACKAGES.pro;
    const big = CREDIT_PACKAGES.big;

    return new InlineKeyboard()
      .text(`⭐ ${starter.name} · ${starter.price}₽`, CALLBACKS.BUY_STARTER)
      .row()
      .text(`✅ ${pro.name} · ${pro.price}₽`, CALLBACKS.BUY_PRO)
      .row()
      .text(`💎 ${big.name} · ${big.price}₽`, CALLBACKS.BUY_BIG)
      .row()
      .text(`Enterprise · от 10 000 ₽`, CALLBACKS.BUY_ENTERPRISE)
      .row()
      .text('❓ Почему такая цена?', CALLBACKS.PRICE_EXPLAIN)
      .row()
      .text(TEXTS.BTN_MAIN_MENU, CALLBACKS.BACK_TO_MENU);
  }

  // Payment confirmation
  static paymentConfirm(paymentUrl: string): InlineKeyboard {
    return new InlineKeyboard()
      .url('💳 Оплатить', paymentUrl)
      .row()
      .text('✅ Проверить оплату', CALLBACKS.PAYMENT_CHECK)
      .row()
      .text('❌ Отмена', CALLBACKS.PAYMENT_CANCEL);
  }

  // Simple back button
  static back(): InlineKeyboard {
    return new InlineKeyboard().text(TEXTS.BTN_BACK, CALLBACKS.BACK_TO_MENU);
  }
}
```

# tsconfig.json

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "lib": ["ES2022"],
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "moduleResolution": "node",
    "declaration": true,
    "declarationMap": true,
    "sourceMap": true,
    "removeComments": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noImplicitReturns": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src/**/*", "src/types.ts"],
  "exclude": ["node_modules", "dist"]
}
```

