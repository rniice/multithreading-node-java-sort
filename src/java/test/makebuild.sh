rm -r build
mkdir build
javac -d ./build *.java
cd build
jar cvf HelloWorld.jar *
cp HelloWorld.jar ../../../../bin/HelloWorld.jar
