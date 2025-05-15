#include <iostream>
#include <string>
using namespace std;

class Node
{
    public:
    int noMhs;
    Node*next;
    Node*prev;

};


class DoubleLinkedList
{
    private :
    Node*START;

    public:
    DoubleLinkedList()
    {
        START = NULL;
    }
    
    void addNode()
    {
        int nim;
        cout << "\nEnter the roll number of student :";
        cin >> nim;
       
        // Step 1 : Allocate memory for new mode
        Node*newMode = new Node();

        // Step 2 : Insert a beginning if list an empty
        newMode -> noMhs = nim;
    }
};
