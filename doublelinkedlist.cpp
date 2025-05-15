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

        // Step 2 : Assign value to the data field
        newMode -> noMhs = nim;

        // Step 3 : Insert at beginning if list  empty or nim is
        if ( START == NULL || nim <= START -> noMhs )
        (
            if ( START != NULL && nim == START -> noMhs )
            {
                cout << "\nDuplicate number of allowed" <<endl;
                return;
            }
            // Step 4 : newMode.next = START
            newMode -> next = START;

            // Step 5 : START.prev = newMode (if START exist)

            if (START !=NULL)
            START -> prev = newMode;

            // Step 6 : newMode.prev = NULL
            newMode -> prev = NULL;


        )
    }
};
