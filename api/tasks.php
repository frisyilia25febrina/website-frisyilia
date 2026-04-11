<?php
require_once 'config.php';

// Get request method
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'), true);

// Route based on method
switch ($method) {
    case 'GET':
        getTasks($conn);
        break;
    case 'POST':
        addTask($conn, $input);
        break;
    case 'PUT':
        updateTask($conn, $input);
        break;
    case 'DELETE':
        deleteTask($conn, $input);
        break;
    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'message' => 'Method not allowed']);
}

// GET all tasks
function getTasks($conn) {
    $sql = "SELECT * FROM tasks ORDER BY created_at DESC";
    $result = $conn->query($sql);
    
    if ($result === FALSE) {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Query failed: ' . $conn->error]);
        return;
    }
    
    $tasks = [];
    while ($row = $result->fetch_assoc()) {
        $tasks[] = $row;
    }
    
    echo json_encode(['success' => true, 'data' => $tasks]);
}

// ADD new task
function addTask($conn, $input) {
    if (!isset($input['title']) || !isset($input['description']) || !isset($input['status'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Missing required fields']);
        return;
    }
    
    $title = $conn->real_escape_string($input['title']);
    $description = $conn->real_escape_string($input['description']);
    $status = $conn->real_escape_string($input['status']);
    
    $sql = "INSERT INTO tasks (title, description, status) VALUES ('$title', '$description', '$status')";
    
    if ($conn->query($sql) === TRUE) {
        $newId = $conn->insert_id;
        echo json_encode(['success' => true, 'message' => 'Task added', 'id' => $newId]);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
    }
}

// UPDATE task
function updateTask($conn, $input) {
    if (!isset($input['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Missing task ID']);
        return;
    }
    
    $id = intval($input['id']);
    $updates = [];
    
    if (isset($input['title'])) {
        $title = $conn->real_escape_string($input['title']);
        $updates[] = "title = '$title'";
    }
    if (isset($input['description'])) {
        $description = $conn->real_escape_string($input['description']);
        $updates[] = "description = '$description'";
    }
    if (isset($input['status'])) {
        $status = $conn->real_escape_string($input['status']);
        $updates[] = "status = '$status'";
    }
    
    if (empty($updates)) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'No fields to update']);
        return;
    }
    
    $updateString = implode(', ', $updates);
    $sql = "UPDATE tasks SET $updateString WHERE id = $id";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Task updated']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
    }
}

// DELETE task
function deleteTask($conn, $input) {
    if (!isset($input['id'])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => 'Missing task ID']);
        return;
    }
    
    $id = intval($input['id']);
    $sql = "DELETE FROM tasks WHERE id = $id";
    
    if ($conn->query($sql) === TRUE) {
        echo json_encode(['success' => true, 'message' => 'Task deleted']);
    } else {
        http_response_code(500);
        echo json_encode(['success' => false, 'message' => 'Error: ' . $conn->error]);
    }
}

?>
