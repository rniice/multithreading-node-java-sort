import java.util.Arrays;                        //import output formatting for arrays
import com.sortingmodules.mergesort.MergeSort;  //import the mergesort library

public class RunSorting {

   /* This is my first java program.
    * This will print 'Hello World' as the output
    */
    public static void main(String []args) {
       System.out.println("Beginning Sorting"); // prints Hello World

       int[] test_array = new int[]{3,1,6,15,2};
       System.out.println(Arrays.toString(test_array));  // prints unsorted array

       MergeSort mergesortinstance = new MergeSort();
       mergesortinstance.sort(test_array);

       System.out.println(Arrays.toString(test_array)); // prints sorted array

    }

    /*
    private static void printArray(int[] anArray) {
       for (int i = 0; i < anArray.length; i++) {
          if (i > 0) {
             System.out.print(", ");
          }
          System.out.print(anArray[i]);
       }
    } */
}
