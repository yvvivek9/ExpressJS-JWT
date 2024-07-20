import 'package:get/get.dart';
import 'package:http/http.dart' as http;
import 'package:shared_preferences/shared_preferences.dart';
import 'dart:convert';

import 'package:client/Views/login.dart';

const String domain = "http://localhost:3000";

Future<Map> httpPostRequest({
  required String route,
  required Map<String, String> body,
  required int successCode,
}) async {
  try {
    final prefs = await SharedPreferences.getInstance();
    final token = prefs.getString("token");

    final response = await http.post(
      Uri.parse(domain + route),
      headers: <String, String>{
        'Content-Type': 'application/json; charset=UTF-8',
        'Authorization': token ?? '',
      },
      body: jsonEncode(body),
    );
    final decodedResponse = jsonDecode(response.body) as Map;
    if (response.statusCode == successCode) {
      return decodedResponse;
    } else if (response.statusCode == 401) { // Handling invalid JWT token
      print("JWT token invalid");
      Get.offAll(() => LoginScreen());
      return {};
    } else {
      throw Exception(decodedResponse["message"]);
    }
  } catch (e) {
    rethrow;
  }
}